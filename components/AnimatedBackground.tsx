"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#dff3ff_0%,_#fff8f0_35%,_#f7ecff_70%,_#fff8f0_100%)]" />

      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
          backgroundSize: "200% 200%",
        }}
      />

      <motion.div
        className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 35, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-16 top-1/4 h-80 w-80 rounded-full bg-violet-300/25 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 45, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 left-1/4 h-64 w-64 rounded-full bg-amber-200/35 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -25, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-1/4 top-1/2 h-56 w-56 rounded-full bg-rose-200/25 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {Array.from({ length: 24 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/80"
          style={{
            left: `${(i * 41) % 100}%`,
            top: `${(i * 29) % 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: 2 + (i % 4),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      <div className="absolute inset-0 opacity-[0.3] [background-image:radial-gradient(#7ec8e3_0.8px,transparent_0.8px)] [background-size:24px_24px]" />
    </div>
  );
}
