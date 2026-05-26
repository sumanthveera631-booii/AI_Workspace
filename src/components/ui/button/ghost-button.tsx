"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GhostButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function GhostButton({
  children,
  className,
  ...props
}: GhostButtonProps) {
  return (
    <button
      className={cn(
        "glass rounded-2xl px-6 py-3 text-white transition-all duration-300 hover:bg-white/10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}