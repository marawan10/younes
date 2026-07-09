"use client";

import { motion } from "framer-motion";
import { BabyIcon } from "@/components/BabyIcon";
import { MessageCard } from "@/components/MessageCard";
import { siteContent } from "@/lib/content";
import type { Message } from "@/lib/db/schema";

const MARQUEE_THRESHOLD = 2;

function MarqueeRow({
  items,
  duration,
}: {
  items: Message[];
  duration: number;
}) {
  const loop = [...items, ...items];

  return (
    <div dir="ltr" className="marquee-fade relative overflow-hidden py-2">
      <motion.div
        className="flex w-max gap-5 px-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
      >
        {loop.map((message, index) => (
          <div key={`${message.id}-${index}`} dir="rtl">
            <MessageCard message={message} index={index % items.length} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function MobileMessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="flex flex-col gap-3 px-3 py-3">
      {messages.map((message, index) => (
        <MessageCard key={message.id} message={message} index={index} />
      ))}
    </div>
  );
}

function StaticMessageGrid({ messages }: { messages: Message[] }) {
  return (
    <div className="flex justify-center px-4 py-4">
      <MessageCard message={messages[0]} index={0} />
    </div>
  );
}

export function MessageMarquee({ messages }: { messages: Message[] }) {
  const displayMessages = [...messages].reverse();

  if (displayMessages.length === 0) {
    return (
      <section className="rounded-3xl border border-dashed border-sky-200/80 bg-white px-4 py-12 text-center sm:rounded-[2rem] sm:bg-white/45 sm:px-6 sm:py-16 sm:backdrop-blur-xl">
        <div className="mx-auto mb-5 w-fit">
          <BabyIcon className="h-20 w-20 opacity-90" />
        </div>
        <p className="text-lg font-semibold text-sky-800 sm:text-xl">
          {siteContent.emptyWishes}
        </p>
      </section>
    );
  }

  const useMarquee = displayMessages.length >= MARQUEE_THRESHOLD;
  const duration = Math.max(displayMessages.length * 12, 24);

  return (
    <section className="space-y-4 sm:space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-4xl">
          {siteContent.wishesTitle}
        </h2>
        <p className="mt-1.5 text-sm text-slate-500 sm:mt-2 sm:text-base">
          {siteContent.wishesSubtitle}
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white py-3 sm:rounded-[2rem] sm:border-white/60 sm:bg-white/35 sm:backdrop-blur-xl">
        <div className="md:hidden">
          <MobileMessageList messages={displayMessages} />
        </div>
        <div className="hidden md:block">
          {useMarquee ? (
            <MarqueeRow items={displayMessages} duration={duration} />
          ) : (
            <StaticMessageGrid messages={displayMessages} />
          )}
        </div>
      </div>
    </section>
  );
}
