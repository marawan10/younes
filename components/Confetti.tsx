"use client";

import { useEffect } from "react";

export function Confetti({ onWelcome }: { onWelcome?: () => void }) {
  useEffect(() => {
    const seen = sessionStorage.getItem("younes-confetti");
    if (seen) return;

    const timer = setTimeout(() => {
      onWelcome?.();
      sessionStorage.setItem("younes-confetti", "1");
    }, 600);

    return () => clearTimeout(timer);
  }, [onWelcome]);

  return null;
}
