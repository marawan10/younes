"use client";

import { useEffect, useRef } from "react";

export function BackgroundLullaby() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;
    audio.loop = true;

    const tryPlay = () => {
      audio.play().catch(() => {
        // Browsers block autoplay until user interaction
      });
    };

    tryPlay();

    const startOnInteraction = () => tryPlay();

    document.addEventListener("click", startOnInteraction);
    document.addEventListener("touchstart", startOnInteraction);
    document.addEventListener("keydown", startOnInteraction);

    return () => {
      document.removeEventListener("click", startOnInteraction);
      document.removeEventListener("touchstart", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/lullaby.mp3"
      preload="auto"
      loop
      className="hidden"
      aria-hidden="true"
    />
  );
}
