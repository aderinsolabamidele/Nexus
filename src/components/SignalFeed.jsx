import React, { useEffect, useRef, useState } from "react";
import { SignalsService } from "@/services/nexus";
import { CATEGORY_MAP } from "@/services/mockData";
import { ArrowUpRight, Radio } from "lucide-react";

function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  return `${Math.floor(s / 3600)}h`;
}

export default function SignalFeed({ category = "ALL", onSelect, limit = 8 }) {
  const [signals, setSignals] = useState([]);
  const timer = useRef();

  useEffect(() => {
    let mounted = true;
    SignalsService.recent(category, limit).then((data) => {
      if (mounted) setSignals(data);
    });
    return () => {
      mounted = false;
    };
  }, [category, limit]);

  useEffect(() => {
    timer.current = setInterval(() => {
      setSignals((prev) => {
        const next = SignalsService.generate(category === "ALL" ? null : category);
        return [next, ...prev].slice(0, limit);
      });
    }, 4200);
    return () => clearInterval(timer.current);
  }, [category, limit]);

  return (
    <div className="space-y-1.5">
      {signals.map((s, i) => {
        const cat = CATEGORY_MAP[s.category] || CATEGORY_MAP.ALL;
        return (
          <button
            key={s.id}
            onClick={() => onSelect?.(s)}
            className={`group w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 transition-all ${
              i === 0 ? "animate-[fadeIn_0.5s_ease]" : ""
            }`}
          >
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 border"
              style={{ borderColor: `${cat.color}40`, background: `${cat.color}12` }}
            >
              <Radio className="w-3 h-3" style={{ color: cat.color }} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-white/90 truncate">{s.location}</span>
                <span className="text-[9px] tracking-wider text-white/30 uppercase">{cat.label}</span>
              </div>
              <div className="text-[10px] text-white/40 truncate">
                {cat.label} activity · {timeAgo(s.timestamp)} ago
              </div>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 text-[12px] font-medium shrink-0">
              <ArrowUpRight className="w-3 h-3" />
              {s.change}%
            </div>
          </button>
        );
      })}
    </div>
  );
}