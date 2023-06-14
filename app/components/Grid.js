import React, { useState } from "react";
import Chat from "./Chat";
import SideBar from "./SideBar";
import { users } from "../dummy/users";
const me = users[5];
export default function Grid() {
  const [receiverId, setReceiverId] = useState(null);
  const handleReceiver = React.useCallback((e) => {
    setReceiverId(() => e.target.id);
  });
  return (
    <div className="content grid grid-cols-5 gap-4 h-[calc(100vh_-_5.5rem)] pl-10 pr-10 bg-[#EFE6FA]">
      <SideBar setReceiver={handleReceiver} me={me} />
      <Chat receiverId={receiverId} me={me} />
    </div>
  );
}
