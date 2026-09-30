import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NexusGlobe from "@/components/globe/NexusGlobe";
import CategorySelector from "@/components/CategorySelector";
import SignalFeed from "@/components/SignalFeed";
import CountryPanel from "@/components/CountryPanel";
import LiveIndicator from "@/components/LiveIndicator";
import {
  GlobeService,
  CountriesService,
  CityIntelligenceService,
} from "@/services/nexus";
import {
  CATEGORY_MAP,
  CATEGORY_METRICS,
} from "@/services/mockData";
import CityPanel from "@/components/ui/CityPanel";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const globeRef = useRef(null);
  const connectionLineRef = useRef(null);

  const [category, setCategory] = useState("ALL");
  const [selected, setSelected] = useState(null);
  const [city, setCity] = useState(null);
  const [cityIntel, setCityIntel] = useState(null);

  const markers = useMemo(
    () => GlobeService.markers("ALL"),
    []
  );

  const arcs = useMemo(
    () => GlobeService.arcs(category),
    [category]
  );

  const metrics = useMemo(
    () =>
      CATEGORY_METRICS[category] ||
      CATEGORY_METRICS.ALL,
    [category]
  );

  const handleSelectMarker = async (marker) => {
    globeRef.current?.focus(
      marker.lat,
      marker.lng,
      2.4,
      true
    );

    const intel = await CityIntelligenceService.get(
      marker.city,
      category
    );

    if (intel) {
      setCityIntel(intel);
    }
  };

  const handleSelectCity = async (selectedCity) => {
    setSelected(null);

    globeRef.current?.focus(
      selectedCity.lat,
      selectedCity.lng,
      2.0,
      true
    );

    const intel =
      await CityIntelligenceService.get(
        selectedCity.name,
        category
      );

    if (intel) {
      setCityIntel(intel);
    }
  };

  const handleSelectSignal = (signal) => {
    globeRef.current?.highlight(
      signal.lat,
      signal.lng
    );
  };

  const handleOpenCountry = async (code) => {
    const country =
      await CountriesService.get(code);

    if (country) {
      setCityIntel(null);
      setSelected(country);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#05070b]">

      {/* subtle atmosphere */}
      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(34,211,238,0.045),transparent_38%)]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
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
          connectionAnchor={{
            xPct: 0.2,
            yPct: 0.7,
          }}
        />
      </div>

      {/* globe → signal connection */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
        <line
          ref={connectionLineRef}
          x1="0"
          y1="0"
          x2="0"
          y2="0"
          stroke="#22d3ee"
          strokeWidth="1"
          strokeDasharray="2 5"
          style={{
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </svg>

      {/* top-left system readout */}
      <div className="absolute left-5 sm:left-7 top-[82px] z-30 hidden sm:block">

        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(103,232,249,0.8)]" />

          <span className="text-[9px] tracking-[0.2em] text-white/40 uppercase">
            Global field
          </span>
        </div>

        <div className="mt-3 flex items-center gap-4 text-[10px] text-white/25">
          <span>
            {markers.length} nodes
          </span>

          <span className="w-px h-3 bg-white/10" />

          <span>
            {arcs.length} links
          </span>
        </div>
      </div>

      {/* top-right status */}
      <div className="absolute right-5 sm:right-7 top-[84px] z-30">
        <LiveIndicator label="Monitoring" />
      </div>

      {/* left signal rail */}
      <aside className="absolute left-4 sm:left-6 bottom-[76px] sm:bottom-[70px] z-30 w-[290px] hidden sm:block">

        <div className="mb-2 flex items-center justify-between">
          <span className="text-[9px] tracking-[0.2em] uppercase text-white/35">
            Live signals
          </span>

          <span className="text-[9px] text-white/20">
            {signalsLabel(category)}
          </span>
        </div>

        <div className="border-t border-white/[0.1]">
          <SignalFeed
            category={category}
            onSelect={handleSelectSignal}
          />
        </div>

        <button
          onClick={() => navigate("/signals")}
          className="mt-3 text-[9px] tracking-[0.14em] uppercase text-white/25 hover:text-white/60 transition-colors"
        >
          View all signals →
        </button>
      </aside>

      {/* right intelligence rail */}
      <aside className="absolute right-4 sm:right-6 bottom-[76px] sm:bottom-[70px] z-30 w-[220px] hidden lg:block">

        <div className="flex items-center justify-between pb-2 border-b border-white/[0.1]">
          <span className="text-[9px] tracking-[0.2em] uppercase text-white/35">
            Activity
          </span>

          <span className="text-[9px] text-white/20">
            24H
          </span>
        </div>

        <div className="pt-2">
          {metrics.map((metric) => {
            const color =
              metric.cat
                ? CATEGORY_MAP[metric.cat]?.color
                : CATEGORY_MAP[category]?.color;

            return (
              <div
                key={metric.label}
                className="group py-2.5"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-white/40">
                    {metric.label}
                  </span>

                  <span className="text-[10px] tabular-nums text-white/30">
                    {metric.val}
                  </span>
                </div>

                <div className="h-px bg-white/[0.08]">
                  <div
                    className="h-px transition-all duration-700"
                    style={{
                      width: `${metric.val}%`,
                      background: color,
                      opacity: 0.75,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-3 pt-3 border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-[9px] text-white/20">
            Network activity
          </span>

          <ArrowUpRight className="w-3 h-3 text-white/20" />
        </div>
      </aside>

      {/* category navigation */}
      <div className="absolute bottom-0 inset-x-0 z-40">
        <div className="border-t border-white/[0.08] bg-[#05070b]/80 backdrop-blur-md">

          <div className="mx-auto max-w-[1700px] px-2 sm:px-6">
            <div className="flex justify-center overflow-hidden">
              <CategorySelector
                active={category}
                onChange={setCategory}
              />
            </div>
          </div>

        </div>
      </div>

      {/* mobile signal access */}
      <button
        onClick={() => navigate("/signals")}
        className="absolute left-4 bottom-[62px] z-30 sm:hidden flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-white/45"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        Signals
      </button>

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

      {/* city intelligence */}
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

function signalsLabel(category) {
  if (category === "ALL") return "All activity";

  const labels = {
    SEARCH: "Search",
    MUSIC: "Music",
    MARKETS: "Markets",
    CRYPTO: "Crypto",
    VIRAL: "Viral",
    GAMING: "Gaming",
    SOCIAL: "Social",
    NEWS: "News",
    ONLINE: "Online",
  };

  return labels[category] || "Activity";
}