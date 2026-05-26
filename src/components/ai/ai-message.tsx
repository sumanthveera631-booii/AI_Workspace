"use client";
import ReactMarkdown from "react-markdown";
import StreamRenderer from "./stream-renderer";
import { Sparkles, User } from "lucide-react";

export default function AIMessage({
  role,
  content,
}: {
  role: string;
  content: string;
}) {
  const isUser = role === "user";

  return (
    <div
      className={`flex gap-4 items-start ${
        isUser ? "flex-row-reverse" : "flex-row"
      } animate-[fadeIn_0.35s_ease-out]`}
    >
      {/* AVATAR BOX */}
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all ${
          isUser
            ? "border-violet-500/20 bg-violet-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]"
            : "border-white/10 bg-white/5 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] animate-pulse"
        }`}
      >
        {isUser ? <User size={14} /> : <Sparkles size={14} />}
      </div>

      {/* MESSAGE BUBBLE */}
      <div
        className={`max-w-2xl rounded-3xl px-6 py-4.5 border transition-all duration-300 ${
          isUser
            ? "bg-violet-600/10 border-violet-500/30 text-white shadow-[0_4px_20px_rgba(124,58,237,0.05)]"
            : "border-white/[0.04] bg-white/[0.02] shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:border-white/[0.08]"
        }`}
      >
        {isUser ? (
          <div className="text-white/90 prose prose-invert max-w-none text-xs sm:text-sm">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <StreamRenderer text={content} />
        )}
      </div>
    </div>
  );
}