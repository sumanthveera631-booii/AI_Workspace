import type { Metadata } from "next";
import "./globals.css";
import ErrorBoundary from "@/components/system/error-boundary";
import AuroraBackground from "@/components/effects/aurora-background";
import BeamEffects from "@/components/effects/beam-effects";
import CursorGlow from "@/components/effects/cursor-glow";
import FloatingOrbs from "@/components/effects/floating-orbs";
import GridBackground from "@/components/effects/grid-background";
import NoiseOverlay from "@/components/effects/noise-overlay";
import ParticleField from "@/components/effects/particle-field";
import { AuthProvider } from "@/components/providers/session-provider";
import { Toaster } from "sonner";
import ShortcutHandler from "@/components/command/shortcut-handler";
import CommandMenu from "@/components/command/command-menu";

export const metadata: Metadata = {
  title: "AI Workspace",
  description: "Next generation AI workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#070B14] text-white overflow-x-hidden">
        <AuroraBackground />
        <GridBackground />
        <ParticleField />
        <FloatingOrbs />
        <BeamEffects />
        <CursorGlow />
        <NoiseOverlay />

        <div className="relative z-10">
          <ErrorBoundary>
            <AuthProvider>
              <ShortcutHandler />
              <CommandMenu />
              <Toaster theme="dark" closeButton richColors />
              {children}
            </AuthProvider>
          </ErrorBoundary>
        </div>
      </body>
    </html>
  );
}