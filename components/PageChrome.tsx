"use client";

import dynamic from "next/dynamic";
import { BackgroundLullaby } from "@/components/BackgroundLullaby";

const CelebrationLayer = dynamic(
  () =>
    import("@/components/CelebrationLayer").then((m) => m.CelebrationLayer),
  { ssr: false },
);

const AnimatedBackground = dynamic(
  () =>
    import("@/components/AnimatedBackground").then((m) => m.AnimatedBackground),
  { ssr: false },
);

export function PageChrome() {
  return (
    <>
      <BackgroundLullaby />
      <CelebrationLayer />
      <div className="hidden md:contents">
        <AnimatedBackground />
      </div>
    </>
  );
}
