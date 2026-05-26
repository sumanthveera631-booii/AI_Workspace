"use client";

import { motion } from "motion/react";

export default function WidgetCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -8,
        scale: 1.01,
      }}
      transition={{ duration: 0.35 }}
      className="transform-gpu will-change-transform group relative flex h-full min-h-[320px] overflow-hidden rounded-[32px] border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-3xl"
    >
      {/* GLOW */}
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-violet-500/20 blur-[90px]" />

        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-cyan-500/20 blur-[90px]" />
      </div>

      {/* SHIMMER */}
      <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
        <div className="absolute inset-y-0 -left-20 w-20 rotate-12 bg-white/10 blur-2xl transition-all duration-1000 group-hover:left-[120%]" />
      </div>

      <div className="relative z-10 flex w-full flex-col">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.9)]" />

            <span className="text-xs text-white/40">
              LIVE
            </span>
          </div>
        </div>

        <div className="flex-1">
          {children}
        </div>
      </div>
    </motion.div>
  );
}