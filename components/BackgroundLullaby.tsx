"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX } from "lucide-react";
import { siteContent } from "@/lib/content";

export function BackgroundLullaby() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsTap, setNeedsTap] = useState(true);

  const playAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.muted = false;
      audio.volume = 0.4;
      await audio.play();
      setIsPlaying(true);
      setNeedsTap(false);
      sessionStorage.setItem("younes-music-on", "1");
      return true;
    } catch {
      setIsPlaying(false);
      setNeedsTap(true);
      return false;
    }
  }, []);

  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
    sessionStorage.removeItem("younes-music-on");
  }, []);

  const toggleAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      pauseAudio();
    } else {
      await playAudio();
    }
  }, [pauseAudio, playAudio]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;
    audio.loop = true;

    const onCanPlay = () => {
      if (sessionStorage.getItem("younes-music-on") === "1") {
        void playAudio();
      }
    };

    const tryOnInteraction = () => {
      if (audio.paused) void playAudio();
    };

    audio.addEventListener("canplaythrough", onCanPlay);
    document.addEventListener("pointerdown", tryOnInteraction);
    document.addEventListener("keydown", tryOnInteraction);

    void playAudio();

    return () => {
      audio.removeEventListener("canplaythrough", onCanPlay);
      document.removeEventListener("pointerdown", tryOnInteraction);
      document.removeEventListener("keydown", tryOnInteraction);
    };
  }, [playAudio]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/lullaby.mp3"
        preload="auto"
        loop
        playsInline
        className="hidden"
        aria-hidden="true"
      />

      <div className="fixed bottom-5 start-5 z-50">
        <AnimatePresence mode="wait">
          {needsTap && !isPlaying ? (
            <motion.button
              key="prompt"
              type="button"
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => playAudio()}
              className="flex items-center gap-2 rounded-full border border-violet-200/90 bg-white/95 px-4 py-3 text-sm font-semibold text-violet-800 shadow-lg backdrop-blur-md"
            >
              <Music className="h-4 w-4 animate-pulse text-violet-500" />
              {siteContent.musicTap}
            </motion.button>
          ) : (
            <motion.button
              key="toggle"
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleAudio()}
              aria-label={isPlaying ? siteContent.musicPause : siteContent.musicPlay}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-white/90 text-violet-700 shadow-lg backdrop-blur-md"
            >
              {isPlaying ? (
                <Volume2 className="h-5 w-5" />
              ) : (
                <VolumeX className="h-5 w-5" />
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
