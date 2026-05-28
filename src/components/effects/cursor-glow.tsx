"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";
import { useLowEndDevice } from "@/hooks/use-low-end-device";

export default function CursorGlow() {
  const lowEnd = useLowEndDevice();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    damping: 25,
    stiffness: 150,
  });

  const smoothY = useSpring(mouseY, {
    damping: 25,
    stiffness: 150,
  });

  useEffect(() => {
    if (lowEnd) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, [lowEnd, mouseX, mouseY]);

  if (lowEnd) {
    return null;
  }

  return (
    <motion.div
      style={{
        translateX: smoothX,
        translateY: smoothY,
      }}
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[400px] w-[400px] rounded-full bg-violet-500/20 blur-3xl"
    />
  );
}