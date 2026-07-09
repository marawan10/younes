"use client";

import { useEffect } from "react";
import {
  fireRandomFirework,
  fireWelcomeShow,
} from "@/components/celebration-effects";
import { Confetti } from "@/components/Confetti";
import { FireworksCanvas } from "@/components/FireworksCanvas";
import { FloatingSparkles } from "@/components/FloatingSparkles";

export function CelebrationLayer() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = setInterval(() => {
      fireRandomFirework();
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <FloatingSparkles />
      <FireworksCanvas />
      <Confetti onWelcome={fireWelcomeShow} />
    </>
  );
}
