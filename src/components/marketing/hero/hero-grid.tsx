"use client";

import { Canvas } from "@react-three/fiber";

function GridPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100, 50, 50]} />

      <meshBasicMaterial
        color="#ffffff"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

export default function HeroGrid() {
  return (
    <div className="absolute inset-0 opacity-30">
      <Canvas
        camera={{ position: [0, 10, 20], fov: 50 }}
        dpr={[1, 1.25]}
        gl={{ antialias: false, powerPreference: "low-power" }}
      >
        <ambientLight intensity={0.5} />

        <GridPlane />
      </Canvas>
    </div>
  );
}