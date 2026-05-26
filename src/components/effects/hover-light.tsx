"use client";

import { motion } from "motion/react";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

export default function HoverLight({ children }: Props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
      className="relative overflow-hidden rounded-2xl"
    >
      <motion.div
        animate={{
          x: position.x - 100,
          y: position.y - 100,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
        className="pointer-events-none absolute h-[200px] w-[200px] rounded-full bg-white/10 blur-3xl"
      />

      {children}
    </div>
  );
}