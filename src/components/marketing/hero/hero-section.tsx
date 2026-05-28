


"use client";

import dynamic from "next/dynamic";
import HeroBackground from "./hero-background";
import HeroContent from "./hero-content";
import FloatingWindows from "./floating-windows";
import HeroGrid from "./hero-grid";

const ParticleScene = dynamic(
  () => import("@/components/three/particle-scene"),
  { ssr: false }
);

const MeshGradient = dynamic(
  () => import("@/components/three/mesh-gradient"),
  { ssr: false }
);




export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32">
      <HeroBackground />

  
      {/* GPU VISUALS */}
      <div className="absolute inset-0 z-0">
          <MeshGradient />

          <ParticleScene />{/* GPU   <AIOrb />   VISUALS */}

      </div>

      <FloatingWindows />

      <div className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-center">
        <HeroContent />
      </div>

    </section>
  );
}