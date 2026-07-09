"use client";

import { useCallback, useEffect, useRef } from "react";

export function BackgroundLullaby() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playingRef = useRef(false);

  const startLullaby = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    audio.volume = 0.4;

    if (!audio.paused && playingRef.current) {
      return true;
    }

    try {
      audio.muted = false;
      await audio.play();
      playingRef.current = true;
      return true;
    } catch {
      // Unmuted autoplay blocked — try muted start then unmute.
    }

    try {
      audio.muted = true;
      await audio.play();
      audio.muted = false;
      audio.volume = 0.4;
      playingRef.current = true;
      return true;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;
    audio.loop = true;

    void startLullaby();

    const onReady = () => void startLullaby();
    audio.addEventListener("canplaythrough", onReady);

    const unlock = () => {
      void startLullaby();
    };

    document.addEventListener("pointerdown", unlock, { passive: true });
    document.addEventListener("touchstart", unlock, { passive: true });
    document.addEventListener("keydown", unlock);

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        void startLullaby();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      audio.removeEventListener("canplaythrough", onReady);
      document.removeEventListener("pointerdown", unlock);
      document.removeEventListener("touchstart", unlock);
      document.removeEventListener("keydown", unlock);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [startLullaby]);

  return (
    <audio
      ref={audioRef}
      src="/lullaby.mp3"
      autoPlay
      loop
      playsInline
      preload="auto"
      // Do not use display:none — iOS often refuses to play hidden audio.
      className="pointer-events-none fixed left-0 top-0 h-px w-px opacity-0"
      aria-hidden="true"
    />
  );
}
