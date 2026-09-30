import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";

const NAV = [
  { label: "Global", to: "/" },
  { label: "Trends", to: "/trends" },
  { label: "Countries", to: "/countries" },
  { label: "Signals", to: "/signals" },
  { label: "About", to: "/about" },
];

export default function NavigationBar() {
  const location = useLocation();

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <div className="mx-auto max-w-[1700px] px-4 sm:px-7">
        <div className="h-[68px] flex items-center justify-between">

          {/* Brand */}
          <Link
            to="/"
            className="pointer-events-auto group flex items-center gap-3"
          >
            <div className="relative flex items-center justify-center w-7 h-7">
              <span className="absolute inset-0 border border-white/20 rotate-45 group-hover:border-cyan-300/50 transition-colors" />
              <span className="relative w-1.5 h-1.5 bg-cyan-300 rounded-full" />
            </div>

            <div className="leading-none">
              <div className="text-[15px] font-semibold tracking-[0.28em] text-white">
                NEXUS
              </div>

              <div className="hidden sm:block mt-1 text-[8px] tracking-[0.22em] text-white/30">
                GLOBAL ACTIVITY
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex pointer-events-auto items-center gap-7">
            {NAV.map((item) => {
              const active =
                item.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.to);

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`relative py-2 text-[11px] tracking-[0.12em] transition-colors ${
                    active
                      ? "text-white"
                      : "text-white/35 hover:text-white/75"
                  }`}
                >
                  {item.label}

                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-cyan-300/80" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Search */}
          <button
            onClick={() =>
              window.dispatchEvent(new Event("nexus:open-search"))
            }
            className="pointer-events-auto group flex items-center gap-2 text-white/40 hover:text-white transition-colors"
            aria-label="Open search"
          >
            <Search className="w-4 h-4" />

            <span className="hidden sm:inline text-[10px] tracking-[0.12em]">
              SEARCH
            </span>

            <kbd className="hidden lg:inline text-[9px] text-white/25 border border-white/10 px-1.5 py-0.5">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>

      <div className="h-px bg-white/[0.07]" />
    </header>
  );
}