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
    await addDoc(ordersRef, {
      username: username,
      planFollowers: plan.followers,
      planPrice: plan.price,
      status: "pending",
      createdAt: serverTimestamp()
    });
    console.log("Order saved successfully");
  } catch (error) {
    console.error("Error saving order: ", error);
  }
};
