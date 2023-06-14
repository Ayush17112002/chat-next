import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
export default async function getReceiver(receiverId) {
  try {
    let receiver = null;
    const receiverDocRef = doc(db, "users", receiverId);
    receiver = await getDoc(receiverDocRef);
    return receiver;
  } catch (err) {
    return null;
  }
}
