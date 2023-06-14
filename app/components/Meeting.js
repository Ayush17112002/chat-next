import { useRef } from "react";
import sendMessage from "../utils/sendMessage";
export default function Meeting({
  me,
  receiverId,
  chatId,
  setChatId,
  setShowSchedule,
}) {
  const topic = useRef("");
  const agenda = useRef("");
  const date = useRef(null);
  const startTime = useRef(null);
  const endTime = useRef(null);

  const scheduleMeet = async (e) => {
    e.preventDefault();
    const message = {
      type: "meeting",
      topic: topic.current.value,
      agenda: agenda.current.value,
      date: date.current.value,
      startTime: startTime.current.value,
      endTime: endTime.current.value,
      link: "",
    };
    setShowSchedule(() => false);
    await sendMessage(me, message, receiverId, chatId, setChatId);
  };
  const cancelMeet = (e) => {
    setShowSchedule(() => false);
  };
  return (
    <div className="meeting fixed border-2 top-1/2 left-1/2 z-10 rounded-md">
      <form className="">
        <h4>Schedule Meeting</h4>
        <label htmlFor="topic">Topic</label>
        <input
          type="text"
          ref={topic}
          className="border-2 m-2"
          id="topic"
        ></input>
        <br />
        <label htmlFor="agenda">Agenda</label>
        <input
          type="text"
          ref={agenda}
          className="border-2 m-2"
          id="agenda"
        ></input>
        <br />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          ref={date}
          className="border-2 m-2"
          id="date"
        ></input>
        <br />
        <label htmlFor="startTime">Start Time</label>
        <input
          type="time"
          ref={startTime}
          className="border-2 m-2"
          id="startTime"
          required
        ></input>
        <br />
        <label htmlFor="endTime">End Time</label>
        <input
          type="time"
          ref={endTime}
          className="border-2 m-2"
          id="endTime"
        ></input>
        <br />
        <button type="submit" className="mr-2 " onClick={cancelMeet}>
          Cancel
        </button>
        <button type="submit" className="mr-2" onClick={scheduleMeet}>
          Schedule
        </button>
      </form>
    </div>
  );
}
