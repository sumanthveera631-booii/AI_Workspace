import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

export default function GlassPanel({
  children,
  className,
}: GlassPanelProps) {
  return (
    <section
      className={cn(
        "glass rounded-[32px] p-8",
        className
      )}
    >
      {children}
    </section>
  );
}