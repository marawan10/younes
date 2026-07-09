"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import {
  fireMobileBurst,
  fireRandomFirework,
  fireWelcomeShow,
  fireWelcomeShowLite,
} from "@/components/celebration-effects";
import { Confetti } from "@/components/Confetti";
import { FireworksCanvas } from "@/components/FireworksCanvas";
import { FloatingSparkles } from "@/components/FloatingSparkles";

function isMobileViewport() {
  return window.matchMedia("(max-width: 768px)").matches;
}

export function CelebrationLayer() {
  const [mobile, setMobile] = useState(false);

  useLayoutEffect(() => {
    setMobile(isMobileViewport());
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = setInterval(() => {
      if (mobile) {
        fireMobileBurst();
      } else {
        fireRandomFirework();
      }
    }, mobile ? 14000 : 12000);

    return () => clearInterval(interval);
  }, [mobile]);

  return (
    <>
      <FloatingSparkles count={mobile ? 5 : 8} />
      {!mobile && <FireworksCanvas />}
      <Confetti onWelcome={mobile ? fireWelcomeShowLite : fireWelcomeShow} />
    </>
  );
}
