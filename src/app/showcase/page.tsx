"use client";
import AnimatedGrid from "@/components/three/animated-grid";
import dynamic from "next/dynamic";
const AIOrb = dynamic(
  () =>
    import("@/components/three/ai-orb"),
  {
    ssr: false,
  }
);

const ParticleScene = dynamic(
  () =>
    import(
      "@/components/three/particle-scene"
    ),
  {
    ssr: false,
  }
);
import MeshGradient from "@/components/three/mesh-gradient";
import FloatingGeometry from "@/components/three/floating-geometry";

export default function ShowcasePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B14] text-white">
      <MeshGradient />

      <AnimatedGrid />

      <ParticleScene />

      <FloatingGeometry />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[400px] w-[400px]">
          <AIOrb />
        </div>
      </div>

      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-5xl text-7xl font-semibold tracking-tight md:text-8xl">
          GPU Powered
          <br />
          AI Interface
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-white/60">
          Cinematic realtime rendering with futuristic interaction systems.
        </p>
      </div>
    </main>
  );
}