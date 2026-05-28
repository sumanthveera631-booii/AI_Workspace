"use client";

import AuroraBackground from "./aurora-background";
import BeamEffects from "./beam-effects";
import CursorGlow from "./cursor-glow";
import FloatingOrbs from "./floating-orbs";
import GridBackground from "./grid-background";
import NoiseOverlay from "./noise-overlay";
import ParticleField from "./particle-field";
import { useLowEndDevice } from "@/hooks/use-low-end-device";

export default function ClientBackgroundEffects() {
  const lowEnd = useLowEndDevice();

  return (
    <>
      <AuroraBackground />
      <GridBackground />
      {!lowEnd && <ParticleField />}
      {!lowEnd && <FloatingOrbs />}
      {!lowEnd && <BeamEffects />}
      {!lowEnd && <CursorGlow />}
      <NoiseOverlay />
    </>
  );
}
