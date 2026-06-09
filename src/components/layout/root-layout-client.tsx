"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  DynamicClientBackgroundEffects,
  DynamicCommandMenu,
  DynamicShortcutHandler,
} from "@/lib/dynamic-imports";
import ErrorBoundary from "@/components/system/error-boundary";
import { Toaster } from "sonner";

interface RootLayoutClientProps {
  children: ReactNode;
}

export default function RootLayoutClient({ children }: RootLayoutClientProps) {
  const pathname = usePathname();

  const showBackgroundEffects = useMemo(() => {
    if (!pathname) return false;
    const excludedPaths = [
      "/ai",
      "/dashboard",
      "/editor",
      "/profile",
      "/workspaces",
      "/settings",
      "/auth",
      "/collaboration",
      "/command",
    ];

    return !excludedPaths.some((path) => pathname.startsWith(path));
  }, [pathname]);

  return (
    <>
      {showBackgroundEffects && <DynamicClientBackgroundEffects />}

      <div className="relative z-10">
        <ErrorBoundary>
          <DynamicShortcutHandler />
          <DynamicCommandMenu />
          <Toaster theme="dark" closeButton richColors />
          {children}
        </ErrorBoundary>
      </div>
    </>
  );
}
