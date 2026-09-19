import React, { useEffect, useState } from "react";
import { TrendsService } from "@/services/nexus";
import TrendCard from "@/components/TrendCard";
import ActivityChart from "@/components/ActivityChart";
import { CATEGORIES } from "@/services/mockData";

const REGIONS = ["Global", "Africa", "North America", "South America", "Europe", "Asia", "Oceania", "Middle East"];

export default function Trends() {
  const [region, setRegion] = useState("Global");
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    TrendsService.list(region).then(setTrends);
  }, [region]);

  const timeline = trends.slice(0, 5).map((t, i) => ({
    hour: `#${t.rank}`,
    value: t.activity,
  }));

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        {/* header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <div className="text-[10px] tracking-[0.25em] text-cyan-300/60">NEXUS · INTELLIGENCE</div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-1">Global Trends</h1>
            <p className="text-[13px] text-white/40 mt-1.5">
              What the world is paying attention to right now.
            </p>
          </div>
          {/* region filter */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`px-3 py-1.5 rounded-full text-[11px] tracking-wide whitespace-nowrap border transition-all ${
                  region === r
                    ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200"
                    : "border-white/10 bg-white/[0.02] text-white/45 hover:text-white/70"
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* overview chart */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-[0.2em] text-white/40">TOP 5 ACTIVITY TIMELINE</span>
            <span className="text-[11px] text-cyan-300/70">last 24h</span>
          </div>
          <ActivityChart data={timeline} height={200} />
        </div>

        {/* trends grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {trends.map((t) => (
            <TrendCard key={t.rank} trend={t} />
          ))}
        </div>
      </div>
    </div>
  );
}