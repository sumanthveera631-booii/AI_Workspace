"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Particle {
  left: number;
  top: number;
  duration: number;
  delay: number;
}

export default function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 40 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 8 + Math.random() * 5,
      delay: Math.random() * 5,
    }));

    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden z-[1]">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          animate={{
            y: ["0%", "100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
          className="absolute h-1 w-1 rounded-full bg-white/30"
          style={{
            left: `${particle.left}%`,
            top: `-${particle.top}%`,
          }}
        />
      ))}
    </div>
  );
}