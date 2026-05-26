"use client";

import { motion } from "motion/react";

export default function SwipeCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileTap={{
        scale: 0.98,
      }}
      whileHover={{
        scale: 1.01,
      }}
      drag="x"
      dragConstraints={{
        left: -20,
        right: 20,
      }}
      className="rounded-[28px] border border-white/[0.04] bg-white/[0.03] p-6 backdrop-blur-3xl"
    >
      {children}
    </motion.div>
  );
}