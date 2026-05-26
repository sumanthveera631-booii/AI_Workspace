"use client";

import { motion } from "motion/react";

export default function MobileGestureWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      drag="x"
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className="touch-pan-x"
    >
      {children}
    </motion.div>
  );
}