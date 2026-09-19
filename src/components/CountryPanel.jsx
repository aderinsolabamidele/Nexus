import React from "react";
import { CATEGORY_MAP } from "@/services/mockData";
import { X, MapPin, TrendingUp, Activity } from "lucide-react";

function Bar({ value }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-700"
        style={{ width: `${value}%`, boxShadow: "0 0 8px -2px rgba(34,211,238,0.6)" }}
      />
    </div>
  );
}

export default function CountryPanel({ country, city, onClose, onSelectCity }) {
  if (!country) return null;
  const cat = CATEGORY_MAP[country.trendingCategory] || CATEGORY_MAP.ALL;

  return (
    <div className="pointer-events-auto fixed right-3 sm:right-4 top-20 bottom-24 sm:bottom-6 w-[min(92vw,360px)] z-40 animate-[slideIn_0.4s_cubic-bezier(0.16,1,0.3,1)]">
      <div className="h-full rounded-2xl border border-white/10 bg-[#070b12]/80 backdrop-blur-xl flex flex-col overflow-hidden">
        {/* header */}
        <div className="p-4 border-b border-white/[0.06] relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-md border border-white/10 hover:bg-white/10 flex items-center justify-center"
          >
            <X className="w-3.5 h-3.5 text-white/60" />
          </button>
          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/40">
            <MapPin className="w-3 h-3" style={{ color: cat.color }} />
            {country.region.toUpperCase()}
          </div>
          <h2 className="mt-1.5 text-2xl font-semibold tracking-wide text-white">
            {country.name.toUpperCase()}
          </h2>
          <div className="text-[11px] text-white/40 mt-0.5">Internet Activity Intelligence</div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-5">
          {/* activity score */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] tracking-[0.2em] text-white/40">ACTIVITY SCORE</span>
              <span className="text-[11px] text-cyan-300 font-medium">
                {country.activity}/100
              </span>
            </div>
            <Bar value={country.activity} />
            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400">
              <TrendingUp className="w-3 h-3" />
              <span>+{country.change}% vs 24h</span>
            </div>
          </div>

          {/* trending now */}
          <Section title="TRENDING SEARCHES" items={country.searches} />
          <Section title="SOCIAL TOPICS" items={country.social} />
          <Section title="MUSIC" items={country.music} />
          <Section title="GAMING" items={country.games} />
          <Section title="NEWS" items={country.news} />
          <Section title="MARKETS" items={country.markets} />

          {/* active cities */}
          <div>
            <div className="text-[10px] tracking-[0.2em] text-white/40 mb-2">ACTIVE CITIES</div>
            <div className="space-y-1.5">
              {country.cities.map((c) => {
                const active = city === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => onSelectCity?.(c)}
                    className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg border transition-all ${
                      active
                        ? "border-cyan-400/40 bg-cyan-400/10"
                        : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05]"
                    }`}
                  >
                    <Activity className="w-3 h-3 text-cyan-300/70" />
                    <span className="text-[12px] text-white/85 flex-1 text-left">{c.name}</span>
                    <span className="text-[11px] text-white/50">{c.activity}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, items = [] }) {
  if (!items.length) return null;
  return (
    <div>
      <div className="text-[10px] tracking-[0.2em] text-white/40 mb-2">{title}</div>
      <div className="space-y-1">
        {items.map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.04]"
          >
            <span className="text-[10px] text-cyan-300/50 w-4">{i + 1}</span>
            <span className="text-[12px] text-white/75">{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}