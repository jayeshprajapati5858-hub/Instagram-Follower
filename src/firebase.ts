import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

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
export const db = getFirestore(app);

export const saveOrder = async (username: string, plan: any) => {
  try {
    const ordersRef = collection(db, "orders");
    const docRef = await addDoc(ordersRef, {
      username: username,
      planFollowers: plan.followers,
      planPrice: plan.price,
      status: "pending",
      createdAt: serverTimestamp()
    });
    console.log("Order saved successfully with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving order: ", error);
    return null;
  }
};

import { doc, updateDoc } from "firebase/firestore";

export const updateOrderWithRRN = async (orderId: string, rrn: string) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, {
      rrn: rrn,
      status: "verification_pending"
    });
    console.log("RRN updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating RRN: ", error);
    return false;
  }
};
