"use client";

import HeroSection from "@/components/marketing/hero/hero-section";
import Navbar from "@/components/marketing/navbar";
import ContactFooter from "@/components/marketing/footer/contact-footer";

export default function MarketingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B14] text-white">
      <Navbar />

      <HeroSection />

      <ContactFooter />
    </main>
  );
}