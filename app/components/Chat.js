import { db } from "../firebase";
import {
  query,
  collection,
  addDoc,
  where,
  or,
  and,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
  getDoc,
  doc,
  QuerySnapshot,
  serverTimestamp,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { useRef, useState, useEffect } from "react";
export default function Chat({ receiverId }) {
  const text = useRef("");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      let messages;
      try {
        if (!receiverId) {
          throw new Error("receiver not vaild");
        }
        const sender = await getSender();
        console.log(sender);
        if (!sender) {
          throw new Error("sender not found");
        }
        console.log(sender.data());
        const chatId = sender.data().chatsWith[receiverId];
        console.log(chatId);
        if (chatId === undefined) {
          throw new Error("chat id not found");
        }
        setChatId(() => chatId);
        messages = onSnapshot(
          query(
            collection(db, "chats/" + chatId + "/messages"),
            orderBy("createdAt"),
            limit(50)
          ),
          (querySnapshot) => {
            let list = [];
            querySnapshot.forEach((message) => {
              console.log(message);
              list.push(message);
            });
            setMessages(list);
          }
        );
      } catch (err) {
        setMessages(() => []);
        setChatId(() => null);
        console.log(err);
      }
      return () => messages;
    };
    fetchMessages();
  }, [receiverId]);

  const getSender = async () => {
    try {
      let sender = null;
      const getSender = await getDocs(
        query(collection(db, "users"), where("name", "==", "Ayush"))
      );
      getSender.forEach((user) => {
        sender = user;
      });
      console.log(sender, sender.id);
      return sender;
    } catch (err) {
      return null;
    }
  };

  const getReceiver = async () => {
    try {
      let receiver = null;
      const receiverDocRef = doc(db, "users", receiverId);
      receiver = await getDoc(receiverDocRef);
      return receiver;
    } catch (err) {
      return null;
    }
  };

  const sendMessage = async (message) => {
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

      const sender = await getSender();
      console.log(sender, newChatId);
      let chatsWith = sender.data().chatsWith;
      chatsWith[receiverId] = newChatId;
      console.log(chatsWith);
      await updateDoc(doc(db, "users", sender.id), { chatsWith: chatsWith });

      const receiver = await getReceiver();
      chatsWith = receiver.data().chatsWith;
      chatsWith[sender.id] = newChatId;
      console.log(chatsWith);
      await updateDoc(doc(db, "users", receiverId), { chatsWith: chatsWith });

      await addDoc(collection(db, "chats/" + newChatId + "/messages"), {
        message: message,
        from: sender.id,
        to: receiverId,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
  };
  const onFileChange = (e) => {
    setFile(() => e.target.files[0]);
  };
  const onSendFile = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("File is not uploaded");
      return;
    }
    const message = { type: "file", url: file.name };
    await sendMessage(message);
  };
  const onSendText = async (e) => {
    e.preventDefault();
    if (text.current.value === "") {
      alert("Enter valid message");
      return;
    }
    const message = { type: "text", text: text.current.value };
    await sendMessage(message);
  };
  const onScheduleMeeting = async (e) => {
    e.preventDefault();
    const message = {
      type: "meeting",
      topic: "FSWD interview",
      agenda: "none",
      date: serverTimestamp(),
      "start time": "",
      "end time": "",
    };
    await sendMessage(message);
  };
  return (
    <div className=" bg-white relative col-span-3 h-[calc(100vh_-_8rem)]">
      <div className="title flex flex-col items-center border-b-black border-b-2 h-14 w-[calc(((100vw_-_6rem)/5)*3)]">
        <div className="company-name">Devtown</div>
        <div className="job-name">Java Developer Job</div>
      </div>
      {messages.map((message) => {
        const data = message.data().message;
        const display =
          data.type === "text"
            ? data.text
            : data.type === "file"
            ? data.url
            : data.topic;
        return (
          <div key={message.id} className="w-full h-11 mb-2">
            {display}
          </div>
        );
      })}
      <div className="input-box absolute h-14 border-2 p-0 m-0 bottom-0 right-0.5 left-0.5 bg-slate-200 w-[calc(((100vw_-_6rem)/5)*3)]">
        <input type="text" ref={text} className="w-1/4 h-full"></input>
        <button
          type="submit"
          onClick={onSendText}
          className="h-full w-1/4 text-center"
        >
          Send
        </button>
        <input type="file" onChange={onFileChange} />
        <button type="submit" onClick={onSendFile}>
          File Upload
        </button>
        <button type="submit" onClick={onScheduleMeeting}>
          Schedule Meeting
        </button>
      </div>
    </div>
  );
}
