import React from "react";
import { Globe2, Activity, Radio, TrendingUp } from "lucide-react";

export default function About() {
  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="mx-auto max-w-[900px] px-4 sm:px-6">
        <div className="text-[10px] tracking-[0.25em] text-cyan-300/60">NEXUS</div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mt-1.5">
          See what's happening everywhere.
        </h1>
        <p className="text-[15px] text-white/50 mt-3 max-w-2xl leading-relaxed">
          NEXUS is a global internet activity intelligence platform. It turns the
          planet into a living interface — explore a 3D Earth, watch activity
          pulse across countries and cities, and follow the signals shaping
          culture, markets, and conversation in real time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
          <Feature
            icon={<Globe2 className="w-4 h-4" />}
            title="3D Globe"
            desc="An interactive Earth you can rotate, zoom, and explore. Activity points, connection arcs, and clusters bring the world to life."
          />
          <Feature
            icon={<Activity className="w-4 h-4" />}
            title="Country Intelligence"
            desc="Click any country for a full breakdown — searches, social, music, gaming, news, markets, and active cities."
          />
          <Feature
            icon={<Radio className="w-4 h-4" />}
            title="Live Signals"
            desc="A streaming feed of activity events as they happen, filterable by category."
          />
          <Feature
            icon={<TrendingUp className="w-4 h-4" />}
            title="Global Trends"
            desc="Ranked topics with growth, regions, and animated timelines."
          />
        </div>

        <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="text-[10px] tracking-[0.2em] text-white/40 mb-2">COMMAND CENTER</div>
          <p className="text-[13px] text-white/60 leading-relaxed">
            Press <kbd className="text-[10px] border border-white/15 rounded px-1.5 py-0.5 mx-0.5">⌘K</kbd>
            or <kbd className="text-[10px] border border-white/15 rounded px-1.5 py-0.5 mx-0.5">Ctrl+K</kbd>
            anywhere to open the command palette — jump to a country, surface
            music trends, or search any topic.
          </p>
        </div>

        <div className="mt-6 text-[11px] text-white/30">
          NEXUS uses a simulated data layer designed so real APIs can be connected
          later without rebuilding the interface.
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
      <div className="w-9 h-9 rounded-lg border border-cyan-400/20 bg-cyan-400/5 flex items-center justify-center text-cyan-300 mb-3">
        {icon}
      </div>
      <div className="text-[14px] text-white/90 font-medium">{title}</div>
      <div className="text-[12px] text-white/45 mt-1 leading-relaxed">{desc}</div>
    </div>
  );
}