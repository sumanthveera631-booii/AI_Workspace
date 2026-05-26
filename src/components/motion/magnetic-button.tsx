"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
}

export default function MagneticButton({
  children,
}: MagneticButtonProps) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
      }}
    >
      {children}
    </motion.div>
  );
}