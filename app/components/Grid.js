import React, { useState } from "react";
import Chat from "./Chat";
import SideBar from "./SideBar";

export default function Grid() {
  const [receiverId, setReceiverId] = useState(null);
  const handleReceiver = React.useCallback((e) => {
    console.log(e.target.id);
    setReceiverId(() => e.target.id);
  });
  return (
    <div className="content grid grid-cols-5 gap-4 h-[calc(100vh_-_5.5rem)] pl-10 pr-10 bg-[#EFE6FA]">
      <SideBar setReceiver={handleReceiver} />
      <Chat receiverId={receiverId} />
    </div>
  );
}
