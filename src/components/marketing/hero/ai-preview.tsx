"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useLowEndDevice } from "@/hooks/use-low-end-device";

export default function AIPreview() {
  const textRef = useRef<HTMLSpanElement>(null);
  const lowEnd = useLowEndDevice();

  useEffect(() => {
    const words = [
      "Generating AI workflows...",
      "Analyzing documents...",
      "Building knowledge graph...",
      "Creating smart summaries...",
    ];

    let index = 0;

    const updateText = () => {
      if (!textRef.current) return;

      textRef.current.innerText = words[index];

      if (!lowEnd) {
        gsap.fromTo(
          textRef.current,
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          }
        );
      }

      index = (index + 1) % words.length;
    };

    updateText();

    const interval = setInterval(updateText, lowEnd ? 5000 : 2500);

    return () => clearInterval(interval);
  }, [lowEnd]);
  return (
    <div className="transform-gpu will-change-transform mt-10 w-full max-w-4xl rounded-[32px] border border-white/10 bg-black/30 p-8 backdrop-blur-2xl">
      <div className="flex gap-2">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </div>

      <div className="mt-10 flex items-center gap-4">
        <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />

        <span
          ref={textRef}
          className="text-lg text-emerald-300"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="h-24 rounded-xl bg-gradient-to-br from-violet-500/20 to-transparent" />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="h-24 rounded-xl bg-gradient-to-br from-cyan-500/20 to-transparent" />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="h-24 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}