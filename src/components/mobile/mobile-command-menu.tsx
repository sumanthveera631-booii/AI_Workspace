"use client";

import { motion } from "motion/react";

export default function MobileCommandMenu({
  open,
}: {
  open: boolean;
}) {
  if (!open) return null;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 100,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
      }}
      className="fixed inset-0 z-[100] bg-[#070B14]/95 p-6 backdrop-blur-3xl"
    >
      <input
        placeholder="Search workspace..."
        className="w-full rounded-3xl border border-white/[0.04] bg-white/[0.03] px-6 py-5 text-lg outline-none"
      />

      <div className="mt-8 space-y-4">
        {[
          "Dashboard",
          "Editor",
          "AI Chat",
          "Command Center",
        ].map((item) => (
          <button
            key={item}
            className="w-full rounded-3xl bg-white/[0.03] px-6 py-5 text-left"
          >
            {item}
          </button>
        ))}
      </div>
    </motion.div>
  );
}