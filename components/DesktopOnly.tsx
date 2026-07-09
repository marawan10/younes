"use client";

import { useLayoutEffect, useState } from "react";

export function DesktopOnly({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    setShow(window.matchMedia("(min-width: 769px)").matches);
  }, []);

  if (!show) return null;

  return children;
}
