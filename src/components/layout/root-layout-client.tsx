"use client";

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
  return (
    <>
      <DynamicClientBackgroundEffects />

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
