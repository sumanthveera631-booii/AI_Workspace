"use client";

import { useEffect } from "react";

import hotkeys from "hotkeys-js";

import { useRouter } from "next/navigation";

export default function ShortcutHandler() {
  const router = useRouter();

  useEffect(() => {
    hotkeys("ctrl+d, command+d", () => {
      router.push("/dashboard");
    });

    hotkeys("ctrl+e, command+e", () => {
      router.push("/editor");
    });

    hotkeys("ctrl+i, command+i", () => {
      router.push("/ai");
    });

    return () => {
      hotkeys.unbind("ctrl+d");
      hotkeys.unbind("ctrl+e");
      hotkeys.unbind("ctrl+i");
    };
  }, [router]);

  return null;
}