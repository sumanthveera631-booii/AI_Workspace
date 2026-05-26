"use client";

import MobileBottomNav from "./mobile-bottom-nav";
import MobileNavbar from "./mobile-navbar";

export default function MobileShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="transform-gpu will-change-transform relative min-h-screen overflow-hidden bg-[#070B14] text-white">
      <MobileNavbar />

      <main className="pb-28 pt-16">
        {children}
      </main>

      <MobileBottomNav />
    </div>
  );
}