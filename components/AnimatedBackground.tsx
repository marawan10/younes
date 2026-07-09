"use client";

import { useLiteMode } from "@/lib/hooks/use-lite-mode";

export function AnimatedBackground() {
  const lite = useLiteMode();

  if (lite) {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#dff3ff_0%,_#fff8f0_45%,_#f7ecff_100%)]" />
        <div className="absolute -left-10 top-16 h-48 w-48 rounded-full bg-sky-200/25" />
        <div className="absolute -right-10 bottom-20 h-48 w-48 rounded-full bg-violet-200/20" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#dff3ff_0%,_#fff8f0_35%,_#f7ecff_70%,_#fff8f0_100%)]" />

      <div
        className="absolute inset-0 animate-shimmer opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="absolute -left-20 top-20 h-72 w-72 animate-float-slow rounded-full bg-sky-300/25" />
      <div className="absolute -right-16 top-1/4 h-80 w-80 animate-float-slower rounded-full bg-violet-300/20" />
      <div className="absolute bottom-10 left-1/4 h-64 w-64 animate-float-slow rounded-full bg-amber-200/25" />

      <div className="absolute inset-0 opacity-[0.25] [background-image:radial-gradient(#7ec8e3_0.8px,transparent_0.8px)] [background-size:28px_28px]" />
    </div>
  );
}
