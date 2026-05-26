"use client";

import { motion } from "motion/react";

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-fuchsia-500/20 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 100, -80, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute right-[-10%] top-[20%] h-[600px] w-[600px] rounded-full bg-cyan-500/20 blur-3xl"
      />
    </div>
  );
}