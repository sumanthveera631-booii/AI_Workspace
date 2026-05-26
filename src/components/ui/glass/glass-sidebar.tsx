import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassSidebarProps {
  children: ReactNode;
  className?: string;
}

export default function GlassSidebar({
  children,
  className,
}: GlassSidebarProps) {
  return (
    <aside
      className={cn(
        "glass h-screen w-[280px] border-r border-white/10 p-5",
        className
      )}
    >
      {children}
    </aside>
  );
}