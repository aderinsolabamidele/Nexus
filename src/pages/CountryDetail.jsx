import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CountriesService } from "@/services/nexus";
import { CATEGORY_MAP } from "@/services/mockData";
import ActivityChart from "@/components/ActivityChart";
import { ArrowLeft, MapPin, TrendingUp, Activity, Globe } from "lucide-react";

function StatBar({ label, value, color }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] tracking-[0.18em] text-white/40">{label}</span>
        <span className="text-[11px] text-white/60 tabular-nums">{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, background: color, boxShadow: `0 0 8px -2px ${color}` }}
        />
      </div>
    </div>
  );
}

function ListBlock({ title, items }) {
  if (!items?.length) return null;
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <div className="text-[10px] tracking-[0.2em] text-white/40 mb-3">{title}</div>
      <div className="space-y-1.5">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-3 px-2.5 py-2 rounded-md bg-white/[0.02] border border-white/[0.04]">
            <span className="text-[10px] text-cyan-300/50 w-4">{i + 1}</span>
            <span className="text-[13px] text-white/80">{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CountryDetail() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    CountriesService.get(code).then(setCountry);
  }, [code]);

  if (!country) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/10 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    );
  }

  const cat = CATEGORY_MAP[country.trendingCategory] || CATEGORY_MAP.ALL;

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[12px] text-white/40 hover:text-white/70 transition-colors mb-5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        {/* header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-white/40">
              <MapPin className="w-3 h-3" style={{ color: cat.color }} />
              {country.region.toUpperCase()}
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mt-1.5">
              {country.name.toUpperCase()}
            </h1>
            <div className="text-[13px] text-white/40 mt-1">Internet Activity Intelligence</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-4xl font-semibold tabular-nums" style={{ color: cat.color }}>
                {country.activity}
              </div>
              <div className="text-[10px] tracking-wider text-white/30">ACTIVITY SCORE / 100</div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[12px] text-emerald-300">+{country.change}%</span>
            </div>
          </div>
        </div>

        {/* timeline chart */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-[0.2em] text-white/40">ACTIVITY TIMELINE</span>
            <span className="text-[11px] text-cyan-300/70">last 24h</span>
          </div>
          <ActivityChart data={country.timeline} height={220} color={cat.color} />
        </div>

        {/* category breakdown */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 mb-6">
          <div className="text-[10px] tracking-[0.2em] text-white/40 mb-4">CATEGORY BREAKDOWN</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            <StatBar label="SEARCH" value={Math.min(99, country.activity + 6)} color={CATEGORY_MAP.SEARCH.color} />
            <StatBar label="SOCIAL" value={Math.min(99, country.activity - 2)} color={CATEGORY_MAP.SOCIAL.color} />
            <StatBar label="MUSIC" value={Math.min(99, country.activity - 8)} color={CATEGORY_MAP.MUSIC.color} />
            <StatBar label="GAMING" value={Math.min(99, country.activity - 14)} color={CATEGORY_MAP.GAMING.color} />
            <StatBar label="NEWS" value={Math.min(99, country.activity - 4)} color={CATEGORY_MAP.NEWS.color} />
            <StatBar label="CRYPTO" value={Math.min(99, country.activity - 18)} color={CATEGORY_MAP.CRYPTO.color} />
          </div>
        </div>

        {/* lists */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          <ListBlock title="TRENDING SEARCHES" items={country.searches} />
          <ListBlock title="SOCIAL TOPICS" items={country.social} />
          <ListBlock title="MUSIC" items={country.music} />
          <ListBlock title="GAMING" items={country.games} />
          <ListBlock title="NEWS" items={country.news} />
          <ListBlock title="MARKETS" items={country.markets} />
        </div>

        {/* active cities */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
          <div className="text-[10px] tracking-[0.2em] text-white/40 mb-3">ACTIVE CITIES</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {country.cities.map((c) => (
              <div key={c.name} className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                <Activity className="w-3.5 h-3.5 text-cyan-300/70" />
                <span className="text-[13px] text-white/85 flex-1">{c.name}</span>
                <span className="text-[12px] text-white/50 tabular-nums">{c.activity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-white/30">
          <Globe className="w-3.5 h-3.5" />
          <Link to="/" className="hover:text-cyan-300/70 transition-colors">
            Return to the globe
          </Link>
        </div>
      </div>
    </div>
  );
}