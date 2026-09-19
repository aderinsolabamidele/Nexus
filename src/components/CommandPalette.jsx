import React, { useEffect, useState } from "react";
import { Search, X, CornerDownLeft } from "lucide-react";

const COMMANDS = [
  { label: "Show music trends", action: { kind: "nav", to: "/trends", category: "MUSIC" } },
  { label: "Show gaming activity", action: { kind: "nav", to: "/trends", category: "GAMING" } },
  { label: "Open global signals", action: { kind: "nav", to: "/signals" } },
  { label: "Explore Nigeria", action: { kind: "country", code: "NG" } },
  { label: "Explore Japan", action: { kind: "country", code: "JP" } },
  { label: "Explore South Korea", action: { kind: "country", code: "KR" } },
  { label: "What's trending in Lagos", action: { kind: "country", code: "NG", city: "Lagos" } },
  { label: "Search AI", action: { kind: "search", q: "AI" } },
  { label: "Open country explorer", action: { kind: "nav", to: "/countries" } },
  { label: "About NEXUS", action: { kind: "nav", to: "/about" } },
];

export default function CommandPalette({ open, onClose, onRun }) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(q.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIdx((i) => Math.min(filtered.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filtered[idx];
        if (cmd) onRun?.(cmd);
      } else if (e.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, idx, onRun, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center pt-24 px-4 animate-[fadeIn_0.2s_ease]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#070b12]/90 backdrop-blur-xl overflow-hidden shadow-2xl animate-[slideUp_0.25s_cubic-bezier(0.16,1,0.3,1)]">
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06]">
          <span className="text-cyan-300/70 text-[11px] tracking-[0.2em]">CMD</span>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command…"
            className="flex-1 bg-transparent outline-none text-[14px] text-white placeholder:text-white/30"
          />
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-md border border-white/10 hover:bg-white/10 flex items-center justify-center"
          >
            <X className="w-3.5 h-3.5 text-white/50" />
          </button>
        </div>
        <div className="max-h-[50vh] overflow-y-auto no-scrollbar p-2">
          {filtered.length === 0 && (
            <div className="px-3 py-8 text-center text-[12px] text-white/30">
              No matching commands
            </div>
          )}
          {filtered.map((c, i) => (
            <button
              key={c.label}
              onMouseEnter={() => setIdx(i)}
              onClick={() => onRun?.(c)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                i === idx ? "bg-cyan-400/10 border border-cyan-400/20" : "border border-transparent"
              }`}
            >
              <Search className="w-3.5 h-3.5 text-cyan-300/60" />
              <span className="text-[13px] text-white/85 flex-1">{c.label}</span>
              {i === idx && <CornerDownLeft className="w-3 h-3 text-white/30" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}