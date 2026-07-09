import { BabyIcon } from "@/components/BabyIcon";
import { DesktopMessageSection } from "@/components/DesktopMessageSection";
import { MessageCard } from "@/components/MessageCard";
import { siteContent } from "@/lib/content";
import type { Message } from "@/lib/db/schema";

const MOBILE_MESSAGE_LIMIT = 12;
const MARQUEE_THRESHOLD = 2;

export function MessageList({ messages }: { messages: Message[] }) {
  const displayMessages = [...messages].reverse();

  if (displayMessages.length === 0) {
    return (
      <section className="rounded-3xl border border-dashed border-sky-200/80 bg-white px-4 py-12 text-center md:rounded-[2rem] md:bg-white/45 md:px-6 md:py-16 md:backdrop-blur-xl">
        <div className="mx-auto mb-5 w-fit">
          <BabyIcon className="h-20 w-20 opacity-90" />
        </div>
        <p className="text-lg font-semibold text-sky-800 md:text-xl">
          {siteContent.emptyWishes}
        </p>
      </section>
    );
  }

  const mobileMessages = displayMessages.slice(0, MOBILE_MESSAGE_LIMIT);
  const useMarquee = displayMessages.length >= MARQUEE_THRESHOLD;

  return (
    <section className="space-y-4 md:space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 md:text-4xl">
          {siteContent.wishesTitle}
        </h2>
        <p className="mt-1.5 text-sm text-slate-500 md:mt-2 md:text-base">
          {siteContent.wishesSubtitle}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white py-3 md:rounded-[2rem] md:border-white/60 md:bg-white/35 md:backdrop-blur-xl">
        <div className="flex flex-col gap-3 px-3 py-3 md:hidden">
          {mobileMessages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>

        <div className="hidden md:block">
          <DesktopMessageSection
            messages={displayMessages}
            useMarquee={useMarquee}
          />
        </div>
      </div>
    </section>
  );
}
