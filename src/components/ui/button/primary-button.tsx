"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function PrimaryButton({
  className,
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={cn(
        "rounded-2xl bg-[var(--primary)] px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(124,58,237,0.45)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}