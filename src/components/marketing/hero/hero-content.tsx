"use client";

import { motion } from "motion/react";
import AIPreview from "./ai-preview";
import Link from "next/link";
export default function HeroContent() {
  return (
    <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* badge removed */}

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 1,
        }}
        className="transform-gpu will-change-transform mt-8 max-w-5xl text-center text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[90px]"
      >
        The AI Workspace
        <br />
        for teams
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 1,
        }}
        className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60"
      >
        Combine docs, AI agents, workflows, chats, research, and knowledge into
        one cinematic collaborative workspace.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.6,
        }}
        className="mt-10 flex items-center gap-4"
      >
        <Link
          href="/login"
          className="
            rounded-2xl
            bg-white
            px-8
            py-4
            text-black
            transition
            hover:scale-105
          "
        >
          Start for Free
        </Link>
      </motion.div>

      <div className="mt-24 w-full max-w-6xl">
        <AIPreview />
      </div>
    </div>
  );
}