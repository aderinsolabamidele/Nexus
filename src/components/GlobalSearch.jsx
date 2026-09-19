import React, { useEffect, useState } from "react";
import { SearchService } from "@/services/nexus";
import { Search, X, ArrowRight } from "lucide-react";

export default function GlobalSearch({ open, onClose, onResult }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!open) {
      setQ("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    let active = true;
    if (!q.trim()) {
      setResults([]);
      return;
    }
    SearchService.query(q).then((r) => {
      if (active) setResults(r);
    });
    return () => {
      active = false;
    };
  }, [q]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-20 sm:pt-28 px-4 animate-[fadeIn_0.25s_ease]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#070b12]/90 backdrop-blur-xl overflow-hidden shadow-2xl animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)]">
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06]">
          <Search className="w-4 h-4 text-cyan-300/70" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search countries, cities, artists, topics, hashtags…"
            className="flex-1 bg-transparent outline-none text-[14px] text-white placeholder:text-white/30"
          />
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-md border border-white/10 hover:bg-white/10 flex items-center justify-center"
          >
            <X className="w-3.5 h-3.5 text-white/50" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto no-scrollbar p-2">
          {!q.trim() && (
            <div className="px-3 py-8 text-center text-[12px] text-white/30">
              Type to search the global activity index
            </div>
          )}
          {q.trim() && results.length === 0 && (
            <div className="px-3 py-8 text-center text-[12px] text-white/30">
              No matches found
            </div>
          )}
          {results.map((r, i) => (
            <button
              key={i}
              onClick={() => onResult?.(r)}
              className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.05] transition-all text-left"
            >
              <span className="text-[9px] tracking-[0.15em] text-cyan-300/60 w-16 shrink-0">
                {r.type.toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] text-white/90 truncate">{r.label}</div>
                <div className="text-[11px] text-white/40 truncate">{r.sub}</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-cyan-300/70 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}