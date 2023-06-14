import { db } from "../firebase";
import {
  query,
  collection,
  addDoc,
  where,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
  getDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export default async function getSender(me) {
  try {
    let sender = null;
    const getSender = await getDocs(
      query(collection(db, "users"), where("email", "==", me.email))
    );
    getSender.forEach((user) => {
      sender = user;
    });
    return sender;
  } catch (err) {
    return null;
  }
}
