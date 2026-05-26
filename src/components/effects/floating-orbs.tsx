"use client";

import { motion } from "motion/react";

const orbs = [1, 2, 3, 4];

export default function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden z-[1]">
      {orbs.map((orb) => (
        <motion.div
          key={orb}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 6 + orb,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-white/5 blur-2xl"
          style={{
            width: `${120 + orb * 40}px`,
            height: `${120 + orb * 40}px`,
            top: `${orb * 15}%`,
            left: `${orb * 20}%`,
          }}
        />
      ))}
    </div>
  );
}