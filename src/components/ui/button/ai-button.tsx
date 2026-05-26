"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface AIButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function AIButton({
  children,
  className,
  ...props
}: AIButtonProps) {
  return (
    <button
      className={cn(
        "group relative flex items-center gap-2 overflow-hidden rounded-2xl bg-black px-6 py-3 font-medium text-white transition-all duration-300 hover:border-cyan-400",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 to-cyan-400/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <Sparkles size={18} />

      <span className="relative z-10">
        {children}
      </span>
    </button>
  );
}