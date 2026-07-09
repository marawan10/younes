import type { Message } from "@/lib/db/schema";

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("ar-EG", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export function MessageCard({
  message,
}: {
  message: Message;
}) {
  return (
    <article className="message-card relative w-full md:w-80 md:shrink-0">
      <div className="relative rounded-2xl border border-slate-200/80 bg-white p-4 md:rounded-[1.25rem] md:border-white/70 md:bg-white/85 md:p-5 md:shadow-xl md:backdrop-blur-xl">
        <p className="mb-3 text-sm leading-relaxed text-slate-700 line-clamp-4 md:mb-5 md:line-clamp-5">
          {message.body}
        </p>
        <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
          <span className="truncate font-semibold text-slate-800">
            {message.authorName}
          </span>
          <time className="shrink-0 text-xs font-medium text-slate-400">
            {formatDate(message.createdAt)}
          </time>
        </div>
      </div>
    </article>
  );
}
