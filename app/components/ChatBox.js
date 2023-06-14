export default function ChatBox({ messages, me }) {
  return (
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
  );
}
