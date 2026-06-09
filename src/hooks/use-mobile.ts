"use client";

import { useEffect, useState } from "react";

export function useMobile() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      setMobile(window.innerWidth < 768);
    };

    update();

    addEventListener("resize", update);

    return () =>
      removeEventListener("resize", update);
  }, []);

  return mobile;
}