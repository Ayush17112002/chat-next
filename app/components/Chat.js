import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  query,
  collection,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import UploadOptions from "./UploadOptions";
import ChatBox from "./ChatBox";
import Meeting from "./Meeting";
import getSender from "../utils/getSender";
import getReceiver from "../utils/getReceiver";

export default function Chat({ receiverId, me }) {
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);
  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    let unsubscribe = () => {};
    const fetchMessages = async () => {
      try {
        if (!receiverId) {
          throw new Error("receiver not vaild");
        }
        const receiver = await getReceiver(receiverId);
        setReceiver(() => receiver);
        const sender = await getSender(me);
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

  return (
    <div className=" bg-white relative col-span-3 h-[calc(100vh_-_8rem)]">
      <div className="title flex flex-col items-center border-b-black border-b-2 h-14 w-[calc(((100vw_-_6rem)/5)*3)]">
        <div className="company-name">
          {receiver ? receiver.data().name : ""}
        </div>
      </div>
      <ChatBox messages={messages} me={me} />
      <UploadOptions
        me={me}
        setShowSchedule={setShowSchedule}
        receiverId={receiverId}
        chatId={chatId}
        setChatId={setChatId}
      />
      {showSchedule && (
        <Meeting
          me={me}
          receiverId={receiverId}
          chatId={chatId}
          setChatId={setChatId}
          setShowSchedule={setShowSchedule}
        ></Meeting>
      )}
    </div>
  );
}
