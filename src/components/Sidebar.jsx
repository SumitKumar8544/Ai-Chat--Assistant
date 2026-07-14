import { useAuth } from "../context/AuthContext.jsx";

const Sidebar = ({ chats, activeId, onSelect, onNewChat, onDelete }) => {
  const { user, logout } = useAuth();

  return (
    <aside className="flex h-screen w-72 flex-shrink-0 flex-col border-r border-border bg-panel">
      <div className="px-5 pt-6 pb-4">
        <h1 className="font-display text-lg font-semibold text-porcelain">
          Nightline
        </h1>
        <p className="mt-0.5 font-mono text-[11px] text-muted">AI chat assistant</p>
      </div>

      <div className="px-4">
        <button
          onClick={onNewChat}
          className="w-full rounded-xl border border-violet/40 bg-violet-soft px-4 py-2.5 text-sm font-medium text-porcelain transition hover:border-violet hover:bg-violet/20"
        >
          + New conversation
        </button>
      </div>

      <nav className="mt-4 flex-1 space-y-1 overflow-y-auto px-3">
        {chats.length === 0 && (
          <p className="px-2 py-4 text-center font-mono text-xs text-muted">
            No conversations yet.
          </p>
        )}
        {chats.map((chat) => {
          const isActive = chat._id === activeId;
          return (
            <div
              key={chat._id}
              onClick={() => onSelect(chat._id)}
              className={`group flex cursor-pointer items-center justify-between rounded-lg border-l-2 px-3 py-2.5 text-sm transition
                ${
                  isActive
                    ? "border-l-violet bg-panel2 text-porcelain"
                    : "border-l-transparent text-muted hover:bg-panel2/60 hover:text-porcelain"
                }`}
            >
              <span className="truncate">{chat.title || "New conversation"}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(chat._id);
                }}
                className="ml-2 hidden text-xs text-muted hover:text-amber group-hover:block"
                title="Delete conversation"
              >
                ✕
              </button>
            </div>
          );
        })}
      </nav>

      <div className="border-t border-border px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-porcelain">{user?.name}</p>
            <p className="truncate font-mono text-[11px] text-muted">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="ml-2 flex-shrink-0 font-mono text-[11px] text-muted hover:text-amber"
          >
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
