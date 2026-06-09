"use client";

import { motion } from "motion/react";
import AIPreview from "./ai-preview";
import Link from "next/link";
export default function HeroContent() {
  return (
    <div className="relative z-20 flex min-h-[calc(100vh-5.5rem)] flex-col justify-between px-6 py-16 text-center">
      <div className="space-y-12">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 1,
          }}
          className="transform-gpu will-change-transform max-w-6xl text-center text-7xl font-bold leading-[1.1] tracking-tight sm:text-8xl md:text-9xl lg:text-[120px]"
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
          className="mx-auto max-w-3xl text-2xl leading-10 text-white/70 font-medium"
        >
          Combine docs, AI agents, workflows, chats, research, and knowledge into
          one cinematic collaborative workspace.
        </motion.p>
      </div>

      <div className="flex flex-col items-center gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
          }}
          className="flex items-center justify-center"
        >
          <Link
            href="/login"
            className="rounded-3xl bg-white px-12 py-6 text-xl font-bold text-black transition hover:scale-105 shadow-2xl"
          >
            Start for Free
          </Link>
        </motion.div>

        <div className="w-full max-w-6xl">
          <AIPreview />
        </div>
      </div>
    </div>
  );
}