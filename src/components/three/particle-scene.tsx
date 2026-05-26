"use client";

import { Canvas, useFrame } from "@react-three/fiber";

import { useMemo, useRef } from "react";

import * as THREE from "three";

function Particles() {
  const points = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(3000);

    for (let i = 0; i < 3000; i++) {
      positions[i] =
        (Math.random() - 0.5) * 20;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (!points.current) return;

    points.current.rotation.y =
      state.clock.elapsedTime * 0.05;

    points.current.rotation.x =
      state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
  attach="attributes-position"
  args={[particles, 3]}
/>
      </bufferGeometry>

      <pointsMaterial
        size={0.03}
        color="#8b5cf6"
        transparent
        opacity={0.7}
      />
    </points>
  );
}

export default function ParticleScene() {
  return (
    <div className="absolute inset-0 transform-gpu will-change-transform">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Particles />
      </Canvas>
    </div>
  );
}