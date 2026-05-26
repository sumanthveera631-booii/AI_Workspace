"use client";

import { Canvas, useFrame } from "@react-three/fiber";

import { MeshDistortMaterial } from "@react-three/drei";

import { useRef } from "react";

import * as THREE from "three";

function Orb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y =
      state.clock.elapsedTime * 0.5;

    meshRef.current.rotation.x =
      state.clock.elapsedTime * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 128, 128]} />

      <MeshDistortMaterial
        color="#8b5cf6"
        distort={0.4}
        speed={2}
        roughness={0}
      />
    </mesh>
  );
}

export default function AIOrb() {
  return (
    <div className="absolute inset-0 transform-gpu will-change-transform">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[2, 2, 5]}
        />

        <Orb />
      </Canvas>
    </div>
  );
}