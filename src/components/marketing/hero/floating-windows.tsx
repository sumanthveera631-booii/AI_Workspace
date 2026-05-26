"use client";

import { motion } from "motion/react";

export default function FloatingWindows() {
  return (
    <>
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="transform-gpu will-change-transform absolute left-[8%] top-[18%] hidden w-[260px] rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl lg:block"
      >
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>

        <div className="mt-5 space-y-3">
          <div className="h-3 rounded bg-white/10" />
          <div className="h-3 w-3/4 rounded bg-white/10" />
          <div className="h-24 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20" />
        </div>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 25, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
        className="transform-gpu will-change-transform absolute right-[8%] top-[28%] hidden w-[280px] rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl lg:block"
      >
        <div className="h-40 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20" />

        <div className="mt-5 space-y-3">
          <div className="h-3 rounded bg-white/10" />
          <div className="h-3 w-2/3 rounded bg-white/10" />
        </div>
      </motion.div>
    </>
  );
}