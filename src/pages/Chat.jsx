import { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import Sidebar from "../components/Sidebar.jsx";
import ChatMessage from "../components/ChatMessage.jsx";
import ThinkingDots from "../components/ThinkingDots.jsx";
import MessageInput from "../components/MessageInput.jsx";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  const loadChats = async () => {
    const res = await api.get("/chats");
    setChats(res.data);
    return res.data;
  };

  const openChat = async (id) => {
    const res = await api.get(`/chats/${id}`);
    setActiveChat(res.data);
  };

  useEffect(() => {
    loadChats().then((list) => {
      if (list.length > 0) openChat(list[0]._id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages?.length, sending]);

  const handleNewChat = async () => {
    const res = await api.post("/chats");
    setChats((prev) => [res.data, ...prev]);
    setActiveChat(res.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/chats/${id}`);
    const remaining = chats.filter((c) => c._id !== id);
    setChats(remaining);
    if (activeChat?._id === id) {
      if (remaining.length > 0) openChat(remaining[0]._id);
      else setActiveChat(null);
    }
  };

  const handleSend = async (content) => {
    setError("");
    let chat = activeChat;

    // Create a conversation on the fly if none is selected yet
    if (!chat) {
      const res = await api.post("/chats");
      chat = res.data;
      setChats((prev) => [chat, ...prev]);
      setActiveChat(chat);
    }

    // Optimistically show the user's message
    setActiveChat((prev) => ({
      ...prev,
      messages: [...prev.messages, { role: "user", content, _id: `tmp-${Date.now()}` }],
    }));
    setSending(true);

    try {
      const res = await api.post(`/chats/${chat._id}/messages`, { content });
      setActiveChat(res.data);
      setChats((prev) => {
        const others = prev.filter((c) => c._id !== res.data._id);
        return [{ ...res.data, messages: undefined }, ...others];
      });
    } catch (err) {
      setError(err.response?.data?.message || "The assistant couldn't respond. Try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-screen bg-ink">
      <Sidebar
        chats={chats}
        activeId={activeChat?._id}
        onSelect={openChat}
        onNewChat={handleNewChat}
        onDelete={handleDelete}
      />

      <main className="flex flex-1 flex-col">
        <header className="border-b border-border px-6 py-4">
          <h2 className="truncate font-display text-base font-medium text-porcelain">
            {activeChat?.title || "New conversation"}
          </h2>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mx-auto flex max-w-2xl flex-col gap-4">
            {(!activeChat || activeChat.messages.length === 0) && (
              <div className="mt-16 text-center">
                <p className="font-display text-lg text-porcelain">
                  What's on your mind?
                </p>
                <p className="mt-1 font-mono text-xs text-muted">
                  Start typing below to begin the conversation.
                </p>
              </div>
            )}

            {activeChat?.messages?.map((msg) => (
              <ChatMessage key={msg._id} role={msg.role} content={msg.content} />
            ))}

            {sending && <ThinkingDots />}

            {error && (
              <p className="rounded-lg border border-amber/40 bg-amber/10 px-3 py-2 text-sm text-amber">
                {error}
              </p>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        <div className="mx-auto w-full max-w-2xl">
          <MessageInput onSend={handleSend} disabled={sending} />
        </div>
      </main>
    </div>
  );
};

export default Chat;
