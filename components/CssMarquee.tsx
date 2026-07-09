import { MessageCard } from "@/components/MessageCard";
import type { Message } from "@/lib/db/schema";

export function CssMarquee({ messages }: { messages: Message[] }) {
  const loop = [...messages, ...messages];
  const duration = Math.max(messages.length * 10, 24);

  return (
    <div dir="ltr" className="marquee-fade relative overflow-hidden py-2">
      <div
        className="marquee-track flex w-max gap-5 px-4"
        style={{ animationDuration: `${duration}s` }}
      >
        {loop.map((message, index) => (
          <div key={`${message.id}-${index}`} dir="rtl">
            <MessageCard message={message} />
          </div>
        ))}
      </div>
    </div>
  );
}
