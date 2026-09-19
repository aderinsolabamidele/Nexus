import React from "react";

export default function LiveIndicator({ label = "LIVE" }) {
  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/5">
      <span className="relative flex w-1.5 h-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
      </span>
      <span className="text-[10px] tracking-[0.2em] text-emerald-300/90">{label}</span>
    </div>
  );
}