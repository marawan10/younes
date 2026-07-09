"use client";

import { useEffect } from "react";
import {
  fireRandomFirework,
  fireWelcomeShow,
  fireWelcomeShowLite,
} from "@/components/celebration-effects";
import { Confetti } from "@/components/Confetti";
import { FireworksCanvas } from "@/components/FireworksCanvas";
import { FloatingSparkles } from "@/components/FloatingSparkles";
import { useLiteMode } from "@/lib/hooks/use-lite-mode";

export function CelebrationLayer() {
  const lite = useLiteMode();

  useEffect(() => {
    if (lite || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = setInterval(() => {
      fireRandomFirework();
    }, 12000);

    return () => clearInterval(interval);
  }, [lite]);

  return (
    <>
      {!lite && <FloatingSparkles />}
      {!lite && <FireworksCanvas />}
      <Confetti onWelcome={lite ? fireWelcomeShowLite : fireWelcomeShow} />
    </>
  );
}
