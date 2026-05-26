"use client";

import {
  FileText,
  Sparkles,
  Brain,
  Folder,
} from "lucide-react";

const items = [
  "AI Notes",
  "Research",
  "Tasks",
  "Documentation",
];

export default function EditorSidebar() {
  return (
    <aside className="hidden w-72 border-r border-white/[0.04] bg-black/20 p-6 backdrop-blur-3xl lg:block">
      <div className="mb-10 flex items-center gap-3">
        <div className="rounded-2xl bg-violet-500/20 p-3">
          <Sparkles size={20} />
        </div>

        <div>
          <h2 className="font-semibold">
            Nexus AI
          </h2>

          <p className="text-sm text-white/50">
            Workspace Editor
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-left transition hover:bg-white/[0.04]"
          >
            <FileText size={18} />

            <span className="text-sm text-white/70">
              {item}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-10 rounded-3xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-5">
        <div className="flex items-center gap-3">
          <Brain size={18} />

          <h3 className="font-medium">
            AI Assistant
          </h3>
        </div>

        <p className="mt-3 text-sm text-white/60">
          Context-aware editing intelligence
        </p>
      </div>
    </aside>
  );
}