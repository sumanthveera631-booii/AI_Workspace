"use client";

import {
  Sparkles,
  BrainCircuit,
  Wand2,
} from "lucide-react";

export default function AIToolbar() {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.05] bg-black/20 px-6 py-4 backdrop-blur-3xl">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-violet-500/20 p-3">
          <Sparkles size={18} />
        </div>

        <div>
          <h1 className="font-semibold">
            Nexus AI
          </h1>

          <p className="text-sm text-white/50">
            Productivity Intelligence
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-2xl bg-white/[0.03] px-4 py-3 transition hover:bg-white/[0.06]">
          <BrainCircuit size={18} />
        </button>

        <button className="rounded-2xl bg-white/[0.03] px-4 py-3 transition hover:bg-white/[0.06]">
          <Wand2 size={18} />
        </button>
      </div>
    </div>
  );
}