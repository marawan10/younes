"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";

const ITEMS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  Icon: i % 3 === 0 ? Heart : i % 3 === 1 ? Star : Sparkles,
  left: `${(i * 17 + 5) % 95}%`,
  size: 10 + (i % 4) * 4,
  duration: 12 + (i % 6) * 3,
  delay: (i % 8) * 0.8,
  drift: i % 2 === 0 ? 20 : -20,
}));

export function FloatingSparkles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {ITEMS.map(({ id, Icon, left, size, duration, delay, drift }) => (
        <motion.div
          key={id}
          className="absolute text-sky-400/40"
          style={{ left, bottom: "-5%" }}
          initial={{ y: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: [0, "-110vh"],
            opacity: [0, 0.7, 0.5, 0],
            x: [0, drift, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Icon
            style={{ width: size, height: size }}
            className={Icon === Heart ? "fill-rose-300/50 text-rose-300/50" : ""}
          />
        </motion.div>
      ))}
    </div>
  );
}
