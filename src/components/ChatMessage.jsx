const ChatMessage = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed whitespace-pre-wrap
          ${
            isUser
              ? "bg-teal-soft border border-teal/30 text-porcelain rounded-br-sm"
              : "bg-panel2 border border-border text-porcelain rounded-bl-sm"
          }`}
      >
        {!isUser && (
          <div className="mb-1 font-mono text-[11px] uppercase tracking-wider text-violet">
            Assistant
          </div>
        )}
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;
