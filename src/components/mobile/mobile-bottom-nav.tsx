"use client";

import Link from "next/link";

import {
  Home,
  FileText,
  Sparkles,
  Command,
} from "lucide-react";

const items = [
  {
    icon: Home,
    href: "/dashboard",
  },
  {
    icon: FileText,
    href: "/editor",
  },
  {
    icon: Sparkles,
    href: "/ai",
  },
  {
    icon: Command,
    href: "/command",
  },
];

export default function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-white/[0.03] bg-black/40 backdrop-blur-3xl">
      <div className="flex items-center justify-around px-4 py-4">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              key={index}
              href={item.href}
              className="rounded-2xl bg-white/[0.03] p-4"
            >
              <Icon size={20} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}