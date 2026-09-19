import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavigationBar from "./Navigation";
import GlobalSearch from "./GlobalSearch";
import CommandPalette from "./CommandPalette";

export default function Layout() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const openSearch = () => setSearchOpen(true);
    const cmd = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    window.addEventListener("nexus:open-search", openSearch);
    window.addEventListener("keydown", cmd);
    return () => {
      window.removeEventListener("nexus:open-search", openSearch);
      window.removeEventListener("keydown", cmd);
    };
  }, []);

  const handleSearchResult = (r) => {
    setSearchOpen(false);
    if (r.target.kind === "country") navigate(`/country/${r.target.code}`);
    else if (r.target.kind === "topic") navigate("/trends");
  };

  const handleCommand = (cmd) => {
    setCmdOpen(false);
    const a = cmd.action;
    if (a.kind === "nav") navigate(a.to);
    else if (a.kind === "country") navigate(`/country/${a.code}`);
    else if (a.kind === "search") setSearchOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#05070b] text-white">
      <NavigationBar />
      <Outlet />
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} onResult={handleSearchResult} />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} onRun={handleCommand} />
    </div>
  );
}