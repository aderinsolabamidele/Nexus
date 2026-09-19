import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell, Settings, Globe } from "lucide-react";

const NAV = [
  { label: "GLOBAL", to: "/" },
  { label: "TRENDS", to: "/trends" },
  { label: "COUNTRIES", to: "/countries" },
  { label: "SIGNALS", to: "/signals" },
  { label: "LIVE", to: "/signals" },
  { label: "ABOUT", to: "/about" },
];

export default function NavigationBar() {
  const loc = useLocation();
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative w-7 h-7 rounded-md bg-gradient-to-br from-cyan-400/20 to-cyan-500/5 border border-cyan-400/30 flex items-center justify-center">
            <Globe className="w-4 h-4 text-cyan-300" />
            <div className="absolute inset-0 rounded-md bg-cyan-400/10 blur-md group-hover:bg-cyan-400/20 transition-colors" />
          </div>
          <div className="leading-none">
            <div className="text-[15px] font-semibold tracking-[0.2em] text-white">NEXUS</div>
            <div className="text-[9px] tracking-[0.25em] text-cyan-200/40 mt-0.5 hidden sm:block">
              GLOBAL INTERNET ACTIVITY
            </div>
          </div>
        </Link>

        {/* nav */}
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {NAV.map((n) => {
            const active = loc.pathname === n.to;
            return (
              <Link
                key={n.label}
                to={n.to}
                className={`px-3.5 py-1.5 text-[11px] tracking-[0.18em] rounded-md transition-all ${
                  active
                    ? "text-cyan-200 bg-cyan-400/10 border border-cyan-400/20"
                    : "text-white/45 hover:text-white/80 border border-transparent"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        {/* right */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new Event("nexus:open-search"))}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-cyan-400/30 transition-all"
          >
            <Search className="w-3.5 h-3.5 text-white/50" />
            <span className="text-[11px] text-white/40 hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline text-[9px] text-white/30 border border-white/10 rounded px-1 py-0.5">
              ⌘K
            </kbd>
          </button>
          <button className="w-8 h-8 rounded-md border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-cyan-400/30 flex items-center justify-center transition-all">
            <Bell className="w-3.5 h-3.5 text-white/50" />
          </button>
          <button className="w-8 h-8 rounded-md border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-cyan-400/30 flex items-center justify-center transition-all">
            <Settings className="w-3.5 h-3.5 text-white/50" />
          </button>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
    </header>
  );
}