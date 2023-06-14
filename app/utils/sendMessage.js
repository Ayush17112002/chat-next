import getReceiver from "./getReceiver";
import getSender from "./getSender";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
export default async function sendMessage(
  me,
  message,
  receiverId,
  chatId,
  setChatId
) {
  try {
    if (!receiverId) {
      alert("Choose receiver");
      return;
    }

    //create new chat
    let newChatId = chatId;
    if (!chatId) {
      newChatId = await addDoc(collection(db, "chats"), {});
      newChatId = newChatId.id;
      setChatId(() => newChatId);
    }

    const sender = await getSender(me);
    let chatsWith = sender.data().chatsWith;
    chatsWith[receiverId] = newChatId;
    await updateDoc(doc(db, "users", sender.id), { chatsWith: chatsWith });

    const receiver = await getReceiver(receiverId);
    chatsWith = receiver.data().chatsWith;
    chatsWith[sender.id] = newChatId;
    await updateDoc(doc(db, "users", receiverId), { chatsWith: chatsWith });

    await addDoc(collection(db, "chats/" + newChatId + "/messages"), {
      message: message,
      from: sender.id,
      to: receiverId,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.log(err.message);
  }
}
