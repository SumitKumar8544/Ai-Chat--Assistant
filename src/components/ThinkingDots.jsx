const ThinkingDots = () => (
  <div className="flex items-center gap-1.5 py-2 pl-1">
    <span className="h-1.5 w-1.5 rounded-full bg-violet animate-pulseDot" style={{ animationDelay: "0ms" }} />
    <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulseDot" style={{ animationDelay: "150ms" }} />
    <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulseDot" style={{ animationDelay: "300ms" }} />
  </div>
);

export default ThinkingDots;
