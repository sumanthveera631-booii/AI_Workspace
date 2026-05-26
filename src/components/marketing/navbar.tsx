"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* LOGO */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight"
        >
          Nexus AI
        </Link>

        {/* NAV */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/features"
            className="text-white/60 transition hover:text-white"
          >
            Features
          </Link>

          <Link
            href="/pricing"
            className="text-white/60 transition hover:text-white"
          >
            Pricing
          </Link>

          <Link
            href="/about"
            className="text-white/60 transition hover:text-white"
          >
            About
          </Link>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="
              rounded-2xl
              px-5
              py-2
              text-white/70
              transition
              hover:text-white
            "
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="
              rounded-2xl
              bg-white
              px-5
              py-2
              text-black
              transition
              hover:scale-105
            "
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}