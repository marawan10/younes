"use client";

import { motion } from "framer-motion";
import { MessageCard } from "@/components/MessageCard";
import type { Message } from "@/lib/db/schema";

export function MarqueeRow({ messages }: { messages: Message[] }) {
  const loop = [...messages, ...messages];
  const duration = Math.max(messages.length * 8, 20);

  return (
    <div dir="ltr" className="marquee-fade relative overflow-hidden py-2">
      <motion.div
        className="flex w-max gap-4 px-3 md:gap-5 md:px-4"
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
          <div
            key={`${message.id}-${index}`}
            dir="rtl"
            className="w-72 shrink-0 md:w-80"
          >
            <MessageCard message={message} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
