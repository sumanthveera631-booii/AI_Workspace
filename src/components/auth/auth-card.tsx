"use client";

import { motion } from "motion/react";

export default function AuthCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="rounded-[32px] border border-white/[0.05] bg-white/[0.03] p-8 shadow-2xl backdrop-blur-3xl"
    >
      {children}
    </motion.div>
  );
}