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

    const handleCommandKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((open) => !open);
      }
    };

    window.addEventListener("nexus:open-search", openSearch);
    window.addEventListener("keydown", handleCommandKey);

    return () => {
      window.removeEventListener("nexus:open-search", openSearch);
      window.removeEventListener("keydown", handleCommandKey);
    };
  }, []);

  const handleSearchResult = (result) => {
    setSearchOpen(false);

    if (result.target.kind === "country") {
      navigate(`/country/${result.target.code}`);
    } else if (result.target.kind === "topic") {
      navigate("/trends");
    }
  };

  const handleCommand = (command) => {
    setCmdOpen(false);

    const action = command.action;

    if (action.kind === "nav") {
      navigate(action.to);
    } else if (action.kind === "country") {
      navigate(`/country/${action.code}`);
    } else if (action.kind === "search") {
      setSearchOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070b] text-white antialiased">
      <NavigationBar />

      <main>
        <Outlet />
      </main>

      <GlobalSearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onResult={handleSearchResult}
      />

      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onRun={handleCommand}
      />
    </div>
  );
}