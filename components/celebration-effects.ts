"use client";

import confetti from "canvas-confetti";

const COLORS = ["#7EC8E3", "#F9D56E", "#C4B5FD", "#FCA5A5", "#B8E0F6", "#FDE68A"];

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isLiteMode() {
  if (typeof window === "undefined") return false;
  return (
    window.innerWidth <= 768 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    navigator.hardwareConcurrency <= 4
  );
}

export function fireFireworkBurst(x = 0.5, y = 0.4) {
  if (prefersReducedMotion() || isLiteMode()) return;

  const base = {
    origin: { x, y },
    colors: COLORS,
    disableForReducedMotion: true,
    zIndex: 9999,
  };

  confetti({
    ...base,
    particleCount: 80,
    spread: 100,
    startVelocity: 42,
    gravity: 0.9,
    ticks: 180,
    scalar: 1.1,
  });

  setTimeout(() => {
    confetti({
      ...base,
      particleCount: 40,
      spread: 120,
      startVelocity: 28,
      gravity: 0.8,
      ticks: 140,
      scalar: 0.9,
      shapes: ["circle"],
    });
  }, 180);
}

export function fireCelebrationConfetti() {
  if (prefersReducedMotion()) return;

  if (isLiteMode()) {
    confetti({
      particleCount: 45,
      spread: 75,
      origin: { y: 0.55 },
      colors: COLORS,
      zIndex: 9999,
      disableForReducedMotion: true,
    });
    return;
  }

  const duration = 3200;
  const end = Date.now() + duration;

  fireFireworkBurst(0.2, 0.55);
  fireFireworkBurst(0.8, 0.5);

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.75 },
      colors: COLORS,
      zIndex: 9999,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.75 },
      colors: COLORS,
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  confetti({
    particleCount: 140,
    spread: 100,
    origin: { y: 0.55 },
    colors: COLORS,
    zIndex: 9999,
  });

  frame();
}

export function fireWelcomeShow() {
  if (prefersReducedMotion()) return;

  const sequence = [
    () => fireFireworkBurst(0.5, 0.35),
    () => {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.4 },
        colors: COLORS,
        zIndex: 9999,
      });
    },
    () => fireFireworkBurst(0.15, 0.45),
    () => fireFireworkBurst(0.85, 0.42),
    () => {
      confetti({
        particleCount: 60,
        angle: 90,
        spread: 55,
        origin: { y: 0.7 },
        colors: COLORS,
        zIndex: 9999,
      });
    },
  ];

  sequence.forEach((step, index) => {
    setTimeout(step, index * 550);
  });
}

export function fireWelcomeShowLite() {
  if (prefersReducedMotion()) return;

  confetti({
    particleCount: 50,
    spread: 70,
    origin: { y: 0.45 },
    colors: COLORS,
    zIndex: 9999,
    disableForReducedMotion: true,
  });
}

export function fireRandomFirework() {
  if (isLiteMode()) return;
  const x = 0.15 + Math.random() * 0.7;
  const y = 0.25 + Math.random() * 0.35;
  fireFireworkBurst(x, y);
}
