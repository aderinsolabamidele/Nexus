import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CountriesService } from "@/services/nexus";
import { CATEGORY_MAP } from "@/services/mockData";
import { Search } from "lucide-react";

export default function Countries() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("All");

  useEffect(() => {
    CountriesService.list().then(setCountries);
  }, []);

  const regions = useMemo(
    () => ["All", ...Array.from(new Set(countries.map((c) => c.region)))],
    [countries]
  );

  const filtered = countries.filter((c) => {
    const matchQ = !q || c.name.toLowerCase().includes(q.toLowerCase()) || c.topCity?.toLowerCase().includes(q.toLowerCase());
    const matchR = region === "All" || c.region === region;
    return matchQ && matchR;
  });

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="mb-6">
          <div className="text-[10px] tracking-[0.25em] text-cyan-300/60">NEXUS · EXPLORER</div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-1">Country Explorer</h1>
          <p className="text-[13px] text-white/40 mt-1.5">
            Internet activity intelligence across the globe.
          </p>
        </div>

        {/* controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.02] flex-1 max-w-sm">
            <Search className="w-4 h-4 text-white/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search country or city…"
              className="flex-1 bg-transparent outline-none text-[13px] text-white placeholder:text-white/30"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {regions.map((r) => (
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

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((c) => {
            const cat = CATEGORY_MAP[c.trendingCategory] || CATEGORY_MAP.ALL;
            return (
              <button
                key={c.code}
                onClick={() => navigate(`/country/${c.code}`)}
                className="group text-left p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[15px] text-white/90 font-medium">{c.name}</div>
                    <div className="text-[10px] text-white/30 mt-0.5">{c.region}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-white tabular-nums">{c.activity}</div>
                    <div className="text-[9px] tracking-wider text-white/30">SCORE</div>
                  </div>
                </div>
                <div className="mt-3 h-1 rounded-full bg-white/[0.05] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${c.activity}%`, background: cat.color, boxShadow: `0 0 8px -2px ${cat.color}` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span
                    className="text-[9px] tracking-[0.15em] px-1.5 py-0.5 rounded border"
                    style={{ color: cat.color, borderColor: `${cat.color}40`, background: `${cat.color}12` }}
                  >
                    {c.trendingTopic.toUpperCase()}
                  </span>
                  <span className="text-[11px] text-emerald-400">+{c.change}%</span>
                </div>
                <div className="text-[11px] text-white/35 mt-2">Most active: {c.topCity}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}