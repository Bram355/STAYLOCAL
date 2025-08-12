// src/services/firestore.js
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from "firebase/firestore";

const ordersCollection = collection(db, "orders");

// ✅ Add a new order
export async function addOrder(orderData) {
  return await addDoc(ordersCollection, {
    ...orderData,
    createdAt: new Date()
  });
}

// ✅ Get all orders (sorted by newest)
export async function getOrders() {
  const q = query(ordersCollection, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// ✅ Get a single order by ID
export async function getOrder(id) {
  const orderRef = doc(db, "orders", id);
  const snapshot = await getDoc(orderRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

// ✅ Update an order
export async function updateOrder(id, updatedData) {
  const orderRef = doc(db, "orders", id);
  return await updateDoc(orderRef, updatedData);
}

// ✅ Delete an order
export async function deleteOrder(id) {
  const orderRef = doc(db, "orders", id);
  return await deleteDoc(orderRef);
}
