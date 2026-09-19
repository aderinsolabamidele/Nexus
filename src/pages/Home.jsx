import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NexusGlobe from "@/components/globe/NexusGlobe";
import CategorySelector from "@/components/CategorySelector";
import SignalFeed from "@/components/SignalFeed";
import CountryPanel from "@/components/CountryPanel";
import LiveIndicator from "@/components/LiveIndicator";
import { GlobeService, CountriesService, CityIntelligenceService } from "@/services/nexus";
import { CATEGORY_MAP, CATEGORY_METRICS } from "@/services/mockData";
import CityPanel from "@/components/ui/CityPanel";
import { Activity, Globe2 } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const globeRef = useRef(null);

  const [category, setCategory] = useState("ALL");
  const [selected, setSelected] = useState(null); // country detail object
  const [city, setCity] = useState(null);
  const [cityIntel, setCityIntel] = useState(null);
  const connectionLineRef = useRef(null);

  const markers = useMemo(() => GlobeService.markers("ALL"), []);
  const arcs = useMemo(() => GlobeService.arcs(category), [category]);
  const metrics = useMemo(() => CATEGORY_METRICS[category] || CATEGORY_METRICS.ALL, [category]);

  // Clicking a marker: zoom the globe toward it and open the city intelligence panel.
  const handleSelectMarker = async (marker) => {
    globeRef.current?.focus(marker.lat, marker.lng, 2.4, true);
    const intel = await CityIntelligenceService.get(marker.city, category);
    if (intel) setCityIntel(intel);
  };

  // Drill into a specific city (GLOBAL → COUNTRY → CITY transition).
  const handleSelectCity = async (c) => {
    setSelected(null);
    globeRef.current?.focus(c.lat, c.lng, 2.0, true);
    const intel = await CityIntelligenceService.get(c.name, category);
    if (intel) setCityIntel(intel);
  };

  // Selecting a live signal briefly highlights its location on the globe
  // and draws a subtle connection from the signals panel to that point.
  const handleSelectSignal = (sig) => {
    globeRef.current?.highlight(sig.lat, sig.lng);
  };

  // Open the country intelligence panel from the city panel.
  const handleOpenCountry = async (code) => {
    const country = await CountriesService.get(code);
    if (country) {
      setCityIntel(null);
      setSelected(country);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#05070b]">
      {/* atmospheric backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.06),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* globe */}
      <div className="absolute inset-0">
        <NexusGlobe
          ref={globeRef}
          markers={markers}
          arcs={arcs}
          activeCategory={category}
          onSelectMarker={handleSelectMarker}
          connectionLineRef={connectionLineRef}
          connectionAnchor={{ xPct: 0.2, yPct: 0.7 }}
        />
      </div>

      {/* signal → globe connection line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-30">
        <line
          ref={connectionLineRef}
          x1="0"
          y1="0"
          x2="0"
          y2="0"
          stroke="#22d3ee"
          strokeWidth="1"
          strokeDasharray="3 4"
          style={{ opacity: 0, transition: "opacity 0.3s ease", filter: "drop-shadow(0 0 4px rgba(34,211,238,0.6))" }}
        />
      </svg>

      {/* top-left status */}
      <div className="absolute left-4 sm:left-6 top-20 z-30 hidden sm:block animate-[fadeIn_0.8s_ease]">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/40">
          <Globe2 className="w-3 h-3 text-cyan-300/60" />
          GLOBAL MONITORING
        </div>
        <div className="mt-1 text-[11px] text-white/30">
          {markers.length} active nodes · {arcs.length} live links
        </div>
      </div>

      {/* live indicator top-right */}
      <div className="absolute right-4 sm:right-6 top-20 z-30 animate-[fadeIn_0.8s_ease]">
        <LiveIndicator label="MONITORING" />
      </div>

      {/* live signals feed - left */}
      <div className="absolute left-3 sm:left-4 bottom-28 sm:bottom-24 z-30 w-[min(86vw,300px)] hidden sm:block">
        <div className="rounded-xl border border-white/10 bg-[#070b12]/70 backdrop-blur-xl overflow-hidden">
          <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <LiveIndicator label="LIVE SIGNALS" />
            </div>
            <span className="text-[10px] text-white/30">streaming</span>
          </div>
          <div className="p-2 max-h-[42vh] overflow-y-auto no-scrollbar">
            <SignalFeed category={category} onSelect={handleSelectSignal} />
          </div>
        </div>
      </div>

      {/* activity ticker - right bottom (desktop) */}
      <div className="absolute right-3 sm:right-4 bottom-28 sm:bottom-24 z-30 w-[min(86vw,260px)] hidden lg:block">
        <div className="rounded-xl border border-white/10 bg-[#070b12]/70 backdrop-blur-xl p-4">
          <div className="text-[10px] tracking-[0.2em] text-white/40 mb-3">GLOBAL ACTIVITY</div>
          <div className="space-y-2.5">
            {metrics.map((r) => {
              const c = r.cat ? CATEGORY_MAP[r.cat].color : CATEGORY_MAP[category].color;
              return (
                <div key={r.label}>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-white/60">{r.label}</span>
                    <span className="text-white/40 tabular-nums">{r.val}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${r.val}%`, background: c, boxShadow: `0 0 8px -2px ${c}` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* category selector - bottom center */}
      <div className="absolute bottom-4 inset-x-0 z-30 flex justify-center px-3">
        <div className="rounded-full border border-white/10 bg-[#070b12]/70 backdrop-blur-xl px-1.5 py-1 max-w-full">
          <CategorySelector active={category} onChange={setCategory} />
        </div>
      </div>

      {/* mobile signals toggle hint */}
      <div className="absolute left-3 bottom-20 sm:hidden z-30">
        <button
          onClick={() => navigate("/signals")}
          className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-[#070b12]/70 backdrop-blur-xl text-[11px] text-white/70"
        >
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          Live signals
        </button>
      </div>

      {/* country panel */}
      {selected && (
        <CountryPanel
          country={selected}
          city={city}
          onClose={() => {
            setSelected(null);
            setCity(null);
            globeRef.current?.reset();
          }}
          onSelectCity={handleSelectCity}
        />
      )}

      {/* city intelligence panel */}
      {cityIntel && (
        <CityPanel
          intel={cityIntel}
          onClose={() => {
            setCityIntel(null);
            globeRef.current?.reset();
          }}
          onOpenCountry={handleOpenCountry}
        />
      )}

    </div>
  );
}