"use client";

import Link from "next/link";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Editor",
    href: "/editor",
  },
  {
    name: "AI Chat",
    href: "/ai",
  },
  {
    name: "Collaboration",
    href: "/collaboration",
  },
];

export default function QuickNavigation() {
  return (
    <div className="flex flex-wrap gap-4">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="rounded-2xl border border-white/[0.05] bg-white/[0.03] px-5 py-3 text-sm text-white/70 backdrop-blur-3xl transition hover:bg-white/[0.06]"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}