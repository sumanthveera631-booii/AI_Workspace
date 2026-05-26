"use client";

import { motion } from "motion/react";
import AIPreview from "./ai-preview";
import Link from "next/link";
export default function HeroContent() {
  return (
    <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.div
  
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
        }}
        className="transform-gpu will-change-transform inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl"
      >
        <span className="text-sm text-white/70">
          AI Workspace for the future
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 1,
        }}
        className="transform-gpu will-change-transform mt-8 max-w-5xl text-center text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[90px]"
      >
        The AI Operating
        <br />
        System for Teams
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
  href="/dashboard"
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
  Start Free
</Link>

        <Link
  href="/ai"
  className="
    rounded-2xl
    border
    border-white/10
    bg-white/5
    px-8
    py-4
    text-white
    backdrop-blur-xl
    transition
    hover:bg-white/10
  "
>
  Live Demo
</Link>
      </motion.div>

      <div className="mt-24 w-full max-w-6xl">
  <AIPreview />
</div>
    </div>
  );
}