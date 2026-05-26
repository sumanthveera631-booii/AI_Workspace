


"use client";

import HeroBackground from "./hero-background";
import HeroContent from "./hero-content";
import FloatingWindows from "./floating-windows";
import HeroGrid from "./hero-grid";


import ParticleScene from "@/components/three/particle-scene";

import AIOrb from "@/components/three/ai-orb";

import MeshGradient from "@/components/three/mesh-gradient";




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