"use client";

import { Canvas, useFrame } from "@react-three/fiber";

import { Float } from "@react-three/drei";

function GeometryGroup() {
  return (
    <>
      <Float
        speed={2}
        rotationIntensity={2}
        floatIntensity={3}
      >
        <mesh position={[-2, 0, 0]}>
          <icosahedronGeometry args={[1, 0]} />

          <meshStandardMaterial
            color="#8b5cf6"
            wireframe
          />
        </mesh>
      </Float>

      <Float
        speed={3}
        rotationIntensity={3}
        floatIntensity={4}
      >
        <mesh position={[2, 1, -1]}>
          <torusGeometry args={[1, 0.3, 24, 64]} />

          <meshStandardMaterial
            color="#06b6d4"
            wireframe
          />
        </mesh>
      </Float>
    </>
  );
}

export default function FloatingGeometry() {
  return (
    <div className="absolute inset-0 transform-gpu will-change-transform">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={1} />

        <pointLight position={[10, 10, 10]} />

        <GeometryGroup />
      </Canvas>
    </div>
  );
}