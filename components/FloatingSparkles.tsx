"use client";

import { Heart, Sparkles, Star } from "lucide-react";

export function FloatingSparkles({ count = 8 }: { count?: number }) {
  const items = Array.from({ length: count }, (_, i) => ({
    id: i,
    Icon: i % 3 === 0 ? Heart : i % 3 === 1 ? Star : Sparkles,
    left: `${(i * 17 + 5) % 95}%`,
    size: 10 + (i % 3) * 3,
    duration: 14 + (i % 4) * 2,
    delay: i * 1.2,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {items.map(({ id, Icon, left, size, duration, delay }) => (
        <span
          key={id}
          className="absolute animate-float-up text-sky-400/35"
          style={{
            left,
            bottom: "-5%",
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        >
          <Icon
            style={{ width: size, height: size }}
            className={Icon === Heart ? "fill-rose-300/40 text-rose-300/40" : ""}
          />
        </span>
      ))}
    </div>
  );
}
