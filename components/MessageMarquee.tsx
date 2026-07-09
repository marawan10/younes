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
    <div
      dir="ltr"
      className="marquee-fade relative overflow-hidden py-2"
    >
      <motion.div
        className="flex w-max gap-4 px-3 sm:gap-5 sm:px-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
        style={{ willChange: "transform" }}
      >
        {loop.map((message, index) => (
          <div key={`${message.id}-${index}`} dir="rtl">
            <MessageCard
              message={message}
              index={index % items.length}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function StaticMessageGrid({ messages }: { messages: Message[] }) {
  return (
    <div className="flex justify-center px-3 py-2 sm:px-4 sm:py-4">
      <MessageCard message={messages[0]} index={0} />
    </div>
  );
}

export function MessageMarquee({ messages }: { messages: Message[] }) {
  const displayMessages = [...messages].reverse();

  if (displayMessages.length === 0) {
    return (
      <section className="relative overflow-hidden rounded-3xl border border-dashed border-sky-200/80 bg-white/45 px-4 py-12 text-center backdrop-blur-xl sm:rounded-[2rem] sm:px-6 sm:py-16">
        <motion.div
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-200/60"
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.15, 0.35] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="relative mx-auto mb-5 w-fit"
        >
          <BabyIcon className="h-20 w-20 opacity-90" />
        </motion.div>
        <p className="relative text-lg font-semibold text-sky-800 sm:text-xl">
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
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold tracking-tight text-slate-800 sm:text-4xl"
        >
          {siteContent.wishesTitle}
        </motion.h2>
        <p className="mt-1.5 text-sm text-slate-500 sm:mt-2 sm:text-base">
          {siteContent.wishesSubtitle}
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/35 py-3 shadow-inner backdrop-blur-xl sm:rounded-[2rem] sm:py-4">
        {useMarquee ? (
          <MarqueeRow items={displayMessages} duration={duration} />
        ) : (
          <StaticMessageGrid messages={displayMessages} />
        )}
      </div>
    </section>
  );
}
