"use client";

import dynamic from "next/dynamic";

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
      <CelebrationLayer />
      <div className="hidden md:contents">
        <AnimatedBackground />
      </div>
    </>
  );
}
