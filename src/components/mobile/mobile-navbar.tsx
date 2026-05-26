"use client";

import {
  Bell,
  Search,
} from "lucide-react";

export default function MobileNavbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/[0.03] bg-black/30 backdrop-blur-3xl">
      <div className="flex items-center justify-between px-5 py-4">
        <h1 className="text-lg font-semibold">
          Nexus AI
        </h1>

        <div className="flex items-center gap-3">
          <button className="rounded-xl bg-white/[0.04] p-3">
            <Search size={18} />
          </button>

          <button className="rounded-xl bg-white/[0.04] p-3">
            <Bell size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}