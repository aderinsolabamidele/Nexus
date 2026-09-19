import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignalFeed from "@/components/SignalFeed";
import LiveIndicator from "@/components/LiveIndicator";
import CategorySelector from "@/components/CategorySelector";
import { CATEGORIES } from "@/services/mockData";

export default function Signals() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("ALL");

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-[10px] tracking-[0.25em] text-cyan-300/60">NEXUS · STREAM</div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-1">Live Signals</h1>
            <p className="text-[13px] text-white/40 mt-1.5">
              Real-time internet activity events from around the world.
            </p>
          </div>
          <LiveIndicator label="MONITORING" />
        </div>

        <div className="mb-5 rounded-full border border-white/10 bg-[#070b12]/70 backdrop-blur-xl px-1.5 py-1 inline-block max-w-full">
          <CategorySelector active={category} onChange={setCategory} />
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3">
          <SignalFeed
            category={category}
            limit={16}
            onSelect={(sig) => navigate(`/country/${sig.countryCode}`)}
          />
        </div>
      </div>
    </div>
  );
}