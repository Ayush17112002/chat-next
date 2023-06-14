import { useState, useRef } from "react";
import sendMessage from "../utils/sendMessage";
export default function UploadOptions({
  me,
  setShowSchedule,
  receiverId,
  chatId,
  setChatId,
}) {
  const text = useRef("");
  const [file, setFile] = useState(null);

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
    await sendMessage(me, message, receiverId, chatId, setChatId);
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
    await sendMessage(me, message, receiverId, chatId, setChatId);
    text.current.value = null;
  };
  return (
    <div className="input-box flex flex-row absolute h-14 border-2 p-0 m-0 bottom-0 right-0.5 left-0.5 bg-slate-200 w-[calc(((100vw_-_6rem)/5)*3)]">
      <input type="text" ref={text} className="h-full"></input>
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
  );
}
