"use client";

import { useEffect, useState } from "react";

function detectLiteMode() {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(max-width: 768px)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    navigator.hardwareConcurrency <= 4
  );
}

export function useLiteMode() {
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const mobileMq = window.matchMedia("(max-width: 768px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setLite(detectLiteMode());

    update();
    mobileMq.addEventListener("change", update);
    motionMq.addEventListener("change", update);

    return () => {
      mobileMq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
    };
  }, []);

  return lite;
}

export function isLiteMode() {
  return detectLiteMode();
}
