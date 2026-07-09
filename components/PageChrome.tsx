"use client";

import dynamic from "next/dynamic";
import { BackgroundLullaby } from "@/components/BackgroundLullaby";
import { DesktopOnly } from "@/components/DesktopOnly";

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
      <DesktopOnly>
        <AnimatedBackground />
        <CelebrationLayer />
      </DesktopOnly>
    </>
  );
}
