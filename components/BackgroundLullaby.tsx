"use client";

import { useEffect, useRef } from "react";

export function BackgroundLullaby() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;

    const start = () => {
      void audio.play();
    };

    if (audio.readyState >= 2) {
      start();
    } else {
      audio.addEventListener("canplay", start, { once: true });
    }

    return () => {
      audio.removeEventListener("canplay", start);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/lullaby.mp3"
      autoPlay
      loop
      playsInline
      preload="auto"
      className="hidden"
      aria-hidden="true"
    />
  );
}
