"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function GradientButton({
  children,
  className,
  ...props
}: GradientButtonProps) {
  return (
    <button
      className={cn(
        "rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-400 px-6 py-3 font-semibold text-white transition-all duration-300 hover:opacity-90",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}