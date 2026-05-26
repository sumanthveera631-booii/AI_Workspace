"use client";

import { motion } from "motion/react";

export default function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-[#070B14]" />

      <motion.div
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl"
      />

      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at top, rgba(124,58,237,0.25), transparent 60%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070B14]/20 to-[#070B14]" />
    </>
  );
}