"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HoverGlowProps {
  children: ReactNode;
}

export default function HoverGlow({
  children,
}: HoverGlowProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        boxShadow:
          "0 0 35px rgba(124,58,237,0.35)",
      }}
      transition={{
        type: "spring",
        stiffness: 250,
      }}
    >
      {children}
    </motion.div>
  );
}