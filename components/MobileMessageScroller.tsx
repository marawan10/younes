import { MessageCard } from "@/components/MessageCard";
import { siteContent } from "@/lib/content";
import type { Message } from "@/lib/db/schema";

export function MobileMessageScroller({ messages }: { messages: Message[] }) {
  return (
    <div className="space-y-2">
      <p className="px-3 text-center text-xs font-medium text-slate-400">
        {siteContent.swipeHint}
      </p>
      <div className="message-scroller flex gap-3 overflow-x-auto overscroll-x-contain px-3 py-2 scroll-smooth snap-x snap-mandatory">
        {messages.map((message) => (
          <div
            key={message.id}
            className="w-[min(88vw,300px)] shrink-0 snap-center"
          >
            <MessageCard message={message} />
          </div>
        ))}
      </div>
    </div>
  );
}
