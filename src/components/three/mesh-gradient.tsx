"use client";

import { motion } from "motion/react";

export default function MeshGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
        className="absolute left-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-violet-500/20 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
        }}
        className="absolute bottom-[-20%] right-[-10%] h-[700px] w-[700px] rounded-full bg-cyan-500/20 blur-3xl"
      />
    </div>
  );
}