"use client";

import { useEffect, useState } from "react";

export function useLowEndDevice() {
  const [lowEnd, setLowEnd] = useState(false);

  useEffect(() => {
    const evaluate = () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const deviceMemory = (navigator as any).deviceMemory ?? 4;
      const hardwareConcurrency = navigator.hardwareConcurrency ?? 4;
      const saveData = (navigator as any).connection?.saveData;
      const smallScreen = window.innerWidth < 768;

      setLowEnd(
        prefersReducedMotion ||
          !!saveData ||
          deviceMemory <= 2 ||
          hardwareConcurrency <= 2 ||
          smallScreen
      );
    };

    evaluate();
    addEventListener("resize", evaluate);

    return () => removeEventListener("resize", evaluate);
  }, []);

  return lowEnd;
}
