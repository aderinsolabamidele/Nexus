import React from "react";
import { CATEGORIES } from "@/services/mockData";

export default function CategorySelector({ active, onChange, className = "" }) {
  return (
    <div className={`${className} overflow-x-auto no-scrollbar`}>
      <div className="flex items-center gap-1.5 min-w-max px-1 py-1">
        {CATEGORIES.map((c) => {
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onChange(c.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] tracking-wide whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? "border-white/20 bg-white/[0.07] text-white"
                  : "border-white/10 bg-white/[0.02] text-white/45 hover:text-white/70 hover:border-white/20"
              }`}
              style={isActive ? { boxShadow: `0 0 18px -6px ${c.color}80`, borderColor: `${c.color}66` } : {}}
            >
              <span className="text-[13px] leading-none">{c.icon}</span>
              <span className="tracking-[0.08em]">{c.label.toUpperCase()}</span>
              {isActive && (
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: c.color, boxShadow: `0 0 8px ${c.color}` }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}