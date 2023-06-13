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
import { users } from "../dummy/users";
import { useRef, useState, useEffect } from "react";
import Meeting from "./Meeting";
const me = users[5];

export default function Chat({ receiverId }) {
  const text = useRef("");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [file, setFile] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);
  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    let unsubscribe = () => {};
    const fetchMessages = async () => {
      try {
        if (!receiverId) {
          throw new Error("receiver not vaild");
        }
        const receiver = await getReceiver();
        setReceiver(() => receiver);
        const sender = await getSender();
        if (!sender) {
          throw new Error("sender not found");
        }
        let chatId = sender.data().chatsWith[receiverId];
        if (chatId === undefined) {
          setChatId(() => null);
          throw new Error("chat id not found");
        }
        setChatId(() => chatId);
        unsubscribe = onSnapshot(
          query(
            collection(db, "chats/" + chatId + "/messages"),
            orderBy("createdAt", "desc"),
            limit(20)
          ),
          async (querySnapshot) => {
            let list = [];
            querySnapshot.forEach((message) => {
              list.push(message);
            });
            list.reverse();
            if (
              list.length > 0 &&
              (receiverId === list[0].data().from ||
                list[0].data().from === sender.id)
            ) {
              setMessages(list);
            }
          }
        );
      } catch (err) {
        setMessages(() => []);
        setChatId(() => null);
        console.log(err.message);
      }
    };
    fetchMessages();

    return () => unsubscribe();
  }, [receiverId, chatId]);

  const getSender = async () => {
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
      let chatsWith = sender.data().chatsWith;
      chatsWith[receiverId] = newChatId;
      await updateDoc(doc(db, "users", sender.id), { chatsWith: chatsWith });

      const receiver = await getReceiver();
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
    setFile(() => null);
    document.getElementById("file-upload").value = "";
  };
  const onSendText = async (e) => {
    e.preventDefault();
    if (text.current.value === "") {
      alert("Enter valid message");
      return;
    }
    const message = { type: "text", text: text.current.value };
    await sendMessage(message);
    text.current.value = null;
  };
  const onScheduleMeeting = async (meet) => {
    setShowSchedule(() => false);
    const { topic, agenda, date, startTime, endTime, link } = meet;
    const message = {
      type: "meeting",
      topic,
      agenda,
      date,
      startTime,
      endTime,
      link,
    };
    await sendMessage(message);
  };
  const onCancelMeeting = () => {
    setShowSchedule(() => false);
  };
  return (
    <div className=" bg-white relative col-span-3 h-[calc(100vh_-_8rem)]">
      <div className="title flex flex-col items-center border-b-black border-b-2 h-14 w-[calc(((100vw_-_6rem)/5)*3)]">
        <div className="company-name">
          {receiver ? receiver.data().name : ""}
        </div>
      </div>
      <div className="chat-box h-[calc(100vh_-_15rem)] overflow-auto">
        {messages.map((message) => {
          const data = message.data().message;
          const display =
            data.type === "text"
              ? data.text
              : data.type === "file"
              ? data.url
              : data.topic;
          return (
            <div
              key={message.id}
              className={`w-auto mb-2 ${
                message.data().from === me.id ? "text-right" : "text-left"
              }`}
            >
              {data.type === "meeting" ? (
                <div className="meeting flex flex-col justify-between bg-slate-400 rounded-lg mb-3">
                  <div>{data.topic}</div>
                  <div>{data.agenda}</div>
                  <div>{data.date}</div>
                  <div>{data.startTime + "-" + data.endTime}</div>
                  <a href={data.link}>{data.link}</a>
                </div>
              ) : (
                display
              )}
            </div>
          );
        })}
      </div>
      <div className="input-box absolute h-14 border-2 p-0 m-0 bottom-0 right-0.5 left-0.5 bg-slate-200 w-[calc(((100vw_-_6rem)/5)*3)]">
        <input type="text" ref={text} className="w-1/4 h-full"></input>
        <button
          type="submit"
          onClick={onSendText}
          className="h-full w-1/4 text-center"
        >
          Send
        </button>
        <input type="file" id="file-upload" onChange={onFileChange} />
        <button type="submit" onClick={onSendFile}>
          File Upload
        </button>
        {me.type === "recruiter" && (
          <div type="submit" onClick={() => setShowSchedule((prev) => !prev)}>
            Schedule Meeting
          </div>
        )}
      </div>
      {showSchedule && (
        <Meeting
          onScheduleMeeting={onScheduleMeeting}
          onCancelMeeting={onCancelMeeting}
        ></Meeting>
      )}
    </div>
  );
}
