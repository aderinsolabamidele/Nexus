import React, { useEffect, useRef, useState } from "react";
import { SignalsService } from "@/services/nexus";
import { CATEGORY_MAP } from "@/services/mockData";
import { ArrowUpRight } from "lucide-react";

function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;

  return `${Math.floor(seconds / 3600)}h`;
}

export default function SignalFeed({
  category = "ALL",
  onSelect,
  limit = 8,
}) {
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
      setSignals((previous) => {
        const next = SignalsService.generate(
          category === "ALL" ? null : category
        );

        return [next, ...previous].slice(0, limit);
      });
    }, 4200);

    return () => clearInterval(timer.current);
  }, [category, limit]);

  return (
    <div className="divide-y divide-white/[0.06]">
      {signals.map((signal, index) => {
        const cat =
          CATEGORY_MAP[signal.category] || CATEGORY_MAP.ALL;

        return (
          <button
            key={signal.id}
            onClick={() => onSelect?.(signal)}
            className={`group w-full text-left py-3 transition-colors hover:bg-white/[0.025] ${
              index === 0 ? "animate-[fadeIn_0.5s_ease]" : ""
            }`}
          >
            <div className="flex items-start gap-3">

              {/* Index */}
              <span className="pt-0.5 w-4 shrink-0 text-[9px] tabular-nums text-white/20">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0 flex-1">

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] text-white/75 truncate">
                    {signal.location}
                  </span>

                  <span
                    className="shrink-0 text-[10px] tabular-nums"
                    style={{ color: cat.color }}
                  >
                    +{signal.change}%
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] uppercase tracking-[0.12em] text-white/25">
                    {cat.label}
                  </span>

                  <span className="text-white/10">·</span>

                  <span className="text-[9px] text-white/25 tabular-nums">
                    {timeAgo(signal.timestamp)}
                  </span>
                </div>
              </div>

              <ArrowUpRight
                className="w-3 h-3 mt-0.5 text-white/10 group-hover:text-white/50 transition-colors"
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}