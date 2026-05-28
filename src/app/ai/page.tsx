"use client";

import WorkspaceLayout from "@/components/workspace/workspace-layout";
import { DynamicAIChat } from "@/lib/dynamic-imports";

export default function AIPage() {
  return (
    <WorkspaceLayout>
      <div className="flex min-h-screen flex-col bg-[#050816]">
        {/* HEADER */}
        <div
          className="
            border-b
            border-white/[0.04]
            px-6
            py-5
            backdrop-blur-3xl
            md:px-10
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-400">
                Nexus Intelligence
              </p>

              <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                AI Command Center
              </h1>

              <p className="mt-2 text-white/50">
                ChatGPT-style workspace assistant with
                memory, streaming, and productivity tools.
              </p>
            </div>

            <button
              className="
                rounded-2xl
                bg-gradient-to-r
                from-violet-500
                to-cyan-500
                px-5
                py-3
                text-sm
                font-medium
                transition
                hover:scale-[1.02]
              "
            >
              New Chat
            </button>
          </div>
        </div>

        {/* CHAT */}
        <div className="flex-1 overflow-hidden">
          <DynamicAIChat />
        </div>
      </div>
    </WorkspaceLayout>
  );
}