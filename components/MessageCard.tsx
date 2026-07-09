"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import type { Message } from "@/lib/db/schema";
import { useLiteMode } from "@/lib/hooks/use-lite-mode";

const CARD_ACCENTS = [
  "from-sky-400/80 to-cyan-300/80",
  "from-violet-400/80 to-fuchsia-300/80",
  "from-amber-400/80 to-orange-300/80",
  "from-rose-400/80 to-pink-300/80",
  "from-emerald-400/80 to-teal-300/80",
];

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ar-EG", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export function MessageCard({
  message,
  index = 0,
}: {
  message: Message;
  index?: number;
}) {
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
  const lite = useLiteMode();

  const card = (
    <>
      {!lite && (
        <div
          className={`absolute -inset-0.5 rounded-[1.35rem] bg-gradient-to-br ${accent} opacity-60 blur-sm transition group-hover:opacity-90`}
        />
      )}
      <div className="relative rounded-[1.25rem] border border-white/70 bg-white/90 p-4 shadow-lg sm:bg-white/85 sm:p-5 sm:shadow-xl sm:backdrop-blur-xl">
        <Quote className="mb-3 h-5 w-5 text-sky-400/80" />
        <p className="mb-4 text-sm leading-relaxed text-slate-700 sm:mb-5 sm:line-clamp-5">
          {message.body}
        </p>
        <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
          <span className="truncate font-semibold text-slate-800">
            {message.authorName}
          </span>
          <time className="shrink-0 text-xs font-medium text-slate-400">
            {formatDate(new Date(message.createdAt))}
          </time>
        </div>
      </div>
    </>
  );

  if (lite) {
    return (
      <article className="group relative w-full sm:w-80 sm:shrink-0">
        {card}
      </article>
    );
  }

  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="group relative w-full sm:w-80 sm:shrink-0"
    >
      {card}
    </motion.article>
  );
}
