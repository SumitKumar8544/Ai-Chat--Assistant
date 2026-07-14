import { useState } from "react";

const MessageInput = ({ onSend, disabled }) => {
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <form
      onSubmit={submit}
      className="flex items-end gap-2 border-t border-border bg-panel px-4 py-4"
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            submit(e);
          }
        }}
        rows={1}
        placeholder="Message the assistant…"
        className="max-h-40 flex-1 resize-none rounded-xl border border-border bg-panel2 px-4 py-3 text-sm text-porcelain placeholder:text-muted focus:border-violet focus:outline-none"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="rounded-xl bg-violet px-4 py-3 text-sm font-medium text-ink transition enabled:hover:bg-violet/80 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
