import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import crypto from "crypto";

// We import the initialized Firebase app and db
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEZek8PQRZ4syGgwMlBVandVeW1gvn3Vw",
  authDomain: "insta-73e54.firebaseapp.com",
  databaseURL: "https://insta-73e54-default-rtdb.firebaseio.com",
  projectId: "insta-73e54",
  storageBucket: "insta-73e54.firebasestorage.app",
  messagingSenderId: "152435900232",
  appId: "1:152435900232:web:f383db38df2f215042fd7d",
  measurementId: "G-E79X38M7JY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function startServer() {
  const server = express();
  const PORT = 3000;

  // Middleware to parse raw body for webhook verification
  server.use(
    express.json({
      verify: (req: any, res, buf) => {
        req.rawBody = buf.toString();
      },
    })
  );

  // Razorpay Webhook Endpoint
  server.post("/api/webhook/razorpay", async (req: any, res) => {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    if (webhookSecret) {
      const signature = req.headers["x-razorpay-signature"];
      if (!signature) {
        return res.status(400).send("No signature found");
      }

      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(req.rawBody)
        .digest("hex");

      if (expectedSignature !== signature) {
        return res.status(400).send("Invalid signature");
      }
    } else {
      console.warn("RAZORPAY_WEBHOOK_SECRET is not set. Skipping signature verification (ONLY FOR DEV).");
    }

    try {
      const event = req.body.event;
      
      // We listen for payment.captured or payment.authorized
      if (event === "payment.captured" || event === "payment.authorized") {
        const payment = req.body.payload.payment.entity;
        
        // Extract UTR/RRN from payment acquirer data or notes
        let utr = payment.acquirer_data?.rrn || payment.acquirer_data?.arn || payment.acquirer_data?.upi_transaction_id;
        
        if (!utr && payment.vpa) {
            // Some UPI payments might not have acquirer_data.rrn readily, but the reference might be passed differently.
            utr = payment.description; // fallback if user puts it in desc
        }

        if (utr) {
          console.log(`Webhook received for payment with UTR: ${utr}`);
          // Search for order with this RRN in Firestore
          const ordersRef = collection(db, "orders");
          const q = query(ordersRef, where("rrn", "==", utr));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            // Update all matching orders (usually just one) to success
            for (const document of querySnapshot.docs) {
              await updateDoc(doc(db, "orders", document.id), {
                 status: "success",
                 paymentId: payment.id,
                 webhookReceivedAt: new Date().toISOString()
              });
              console.log(`Order ${document.id} updated to success based on webhook!`);
            }
          } else {
            console.log(`No order found with RRN: ${utr}. Will retry later or manual check needed.`);
          }
        } else {
          console.log("No UTR/RRN found in the webhook payment data:", payment.id);
        }
      }

      res.status(200).json({ status: "ok" });
    } catch (error) {
      console.error("Webhook Error:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    server.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    server.use(express.static(distPath));
    server.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
