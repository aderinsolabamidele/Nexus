import React from "react";

export default function LiveIndicator({ label = "LIVE" }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="relative flex w-1.5 h-1.5">
        <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping" />
        <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
      </span>

      <span className="text-[9px] tracking-[0.18em] text-white/45 uppercase">
        {label}
      </span>
    </div>
  );
}