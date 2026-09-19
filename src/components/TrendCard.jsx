import React from "react";
import { CATEGORY_MAP } from "@/services/mockData";
import { TrendingUp } from "lucide-react";

export default function TrendCard({ trend, onClick }) {
  const cat = CATEGORY_MAP[trend.category] || CATEGORY_MAP.ALL;
  return (
    <button
      onClick={onClick}
      className="group w-full text-left p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-semibold text-white/15 group-hover:text-white/25 transition-colors tabular-nums">
            #{trend.rank}
          </span>
          <div>
            <div className="text-[14px] text-white/90 font-medium">{trend.topic}</div>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="text-[9px] tracking-[0.15em] px-1.5 py-0.5 rounded border"
                style={{ color: cat.color, borderColor: `${cat.color}40`, background: `${cat.color}12` }}
              >
                {cat.label.toUpperCase()}
              </span>
              <span className="text-[10px] text-white/35">{trend.region}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-emerald-400 text-[13px] font-medium">
            <TrendingUp className="w-3 h-3" />
            +{trend.growth}%
          </div>
          <div className="text-[10px] text-white/30 mt-1">activity {trend.activity}</div>
        </div>
      </div>
      {/* mini activity bar */}
      <div className="mt-3 h-1 w-full rounded-full bg-white/[0.05] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${trend.activity}%`,
            background: `linear-gradient(90deg, ${cat.color}40, ${cat.color})`,
            boxShadow: `0 0 8px -2px ${cat.color}`,
          }}
        />
      </div>
    </button>
  );
}