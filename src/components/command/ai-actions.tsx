"use client";

import {
  Sparkles,
  Wand2,
  BrainCircuit,
} from "lucide-react";

const actions = [
  {
    icon: Sparkles,
    label: "Generate Summary",
  },
  {
    icon: Wand2,
    label: "Rewrite Content",
  },
  {
    icon: BrainCircuit,
    label: "Analyze Workspace",
  },
];

export default function AIActions() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <button
            key={action.label}
            className="group rounded-[28px] border border-white/[0.05] bg-white/[0.03] p-6 text-left backdrop-blur-3xl transition hover:scale-[1.02] hover:bg-white/[0.05]"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10">
              <Icon size={20} />
            </div>

            <h3 className="text-lg font-semibold">
              {action.label}
            </h3>

            <p className="mt-2 text-sm text-white/50">
              AI-powered productivity workflow
            </p>
          </button>
        );
      })}
    </div>
  );
}