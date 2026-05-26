"use client";

import { motion } from "motion/react";

export default function BackgroundBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="absolute left-[-10%] top-[10%] h-[400px] w-[400px] rounded-full bg-violet-500/20 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
        }}
        className="absolute right-[-10%] top-[20%] h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-[120px]"
      />

      <motion.div
        animate={{
          y: [0, -80, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
        }}
        className="absolute bottom-[-10%] left-[30%] h-[350px] w-[350px] rounded-full bg-fuchsia-500/20 blur-[120px]"
      />
    </div>
  );
}