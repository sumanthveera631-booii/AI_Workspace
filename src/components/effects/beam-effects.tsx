"use client";

import { motion } from "motion/react";

export default function BeamEffects() {
  return (
    <div className="fixed inset-0 overflow-hidden z-[1] pointer-events-none">
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 h-[1200px] w-[200px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-violet-500/0 via-violet-500/20 to-cyan-500/0 blur-3xl"
      />
    </div>
  );
}