"use client";

import { Quote } from "lucide-react";
import type { Message } from "@/lib/db/schema";

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
  return (
    <article className="relative w-full md:w-80 md:shrink-0">
      <div className="relative rounded-[1.25rem] border border-slate-200/80 bg-white p-4 shadow-sm md:border-white/70 md:bg-white/85 md:p-5 md:shadow-xl md:backdrop-blur-xl">
        <Quote className="mb-3 h-5 w-5 text-sky-400/80" />
        <p className="mb-4 text-sm leading-relaxed text-slate-700 md:mb-5 md:line-clamp-5">
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
    </article>
  );
}
