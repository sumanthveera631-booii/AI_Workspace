"use client";

import { useWorkspaceStore } from "@/store/workspace-store";

const tabs = [
  "Dashboard",
  "Agents",
  "Projects",
  "Analytics",
];

export default function WorkspaceTabs() {
  const {
    activeTab,
    setActiveTab,
  } = useWorkspaceStore();

  return (
    <div className="flex items-center gap-3 border-b border-white/[0.04] px-6 py-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`rounded-2xl px-5 py-2 text-sm transition ${
            activeTab === tab
              ? "bg-white text-black"
              : "bg-white/[0.03] text-white/60 hover:text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}