"use client";
import { useState } from "react";
import WidgetCard from "./widget-card";
import { Sparkles, Terminal, ArrowRight, CornerDownLeft } from "lucide-react";

export default function AIWidget() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const handleAction = (type: string) => {
    setIsThinking(true);
    setResponse("");

    const replies: Record<string, string> = {
      summary: "Nexus AI: Your workspace has 4 documents connected across 2 folders. Milestone completions are at 25% today with active progress in cinematic styles.",
      activity: "Nexus AI: Most active work is happening on the Lexical Document Editor. High collaboration activity from user@example.com was tracked 10m ago.",
      workflow: "Nexus AI: Automated workflow 'Sync tasks to Figma comments' has been compiled and is now active across all 3 collaborative sessions.",
    };

    setTimeout(() => {
      setResponse(replies[type] || "Generating customized intelligence summary...");
      setIsThinking(false);
    }, 1200);
  };

  const handleCustomPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsThinking(true);
    setResponse("");

    setTimeout(() => {
      setResponse(`Nexus AI Insight: Analyzing '${prompt}'. Workspace performance is optimized at 98fps WebGL mesh gradient render speed, all routes fully operational.`);
      setIsThinking(false);
      setPrompt("");
    }, 1500);
  };

  return (
    <WidgetCard title="Nexus Intelligence">
      <div className="flex h-full flex-col">
        {/* QUICK BUTTONS */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => handleAction("summary")}
            className="flex items-center gap-1.5 rounded-full border border-white/[0.04] bg-white/[0.02] px-2.5 py-1 text-2xs text-white/70 transition hover:bg-violet-500/10 hover:text-white"
          >
            <Sparkles size={10} className="text-violet-400" />
            Summary
          </button>
          <button
            onClick={() => handleAction("activity")}
            className="flex items-center gap-1.5 rounded-full border border-white/[0.04] bg-white/[0.02] px-2.5 py-1 text-2xs text-white/70 transition hover:bg-cyan-500/10 hover:text-white"
          >
            <Terminal size={10} className="text-cyan-400" />
            Activity
          </button>
          <button
            onClick={() => handleAction("workflow")}
            className="flex items-center gap-1.5 rounded-full border border-white/[0.04] bg-white/[0.02] px-2.5 py-1 text-2xs text-white/70 transition hover:bg-fuchsia-500/10 hover:text-white"
          >
            <ArrowRight size={10} className="text-fuchsia-400" />
            Workflow
          </button>
        </div>

        {/* INSIGHT BOX */}
        <div className="flex-1 rounded-2xl border border-white/[0.04] bg-black/30 p-3.5 max-h-[120px] overflow-y-auto">
          {isThinking ? (
            <div className="flex items-center gap-2 text-xs text-white/40">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fuchsia-400 [animation-delay:0.4s]" />
              Syncing workspace model...
            </div>
          ) : response ? (
            <p className="text-xs leading-relaxed text-white/80 animate-[fadeIn_0.5s_ease-out]">
              {response}
            </p>
          ) : (
            <p className="text-xs text-white/40 italic">
              Click a quick intelligence tool above or ask a custom workspace query below...
            </p>
          )}
        </div>

        {/* INPUT PROMPT */}
        <form onSubmit={handleCustomPrompt} className="mt-4 flex gap-2 relative">
          <input
            type="text"
            placeholder="Query Nexus AI..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] pl-3.5 pr-10 py-2.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-violet-500/50"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 text-white/40 hover:text-white transition"
          >
            <CornerDownLeft size={14} />
          </button>
        </form>
      </div>
    </WidgetCard>
  );
}