"use client";

import { motion } from "framer-motion";
import { MessageCard } from "@/components/MessageCard";
import type { Message } from "@/lib/db/schema";

export function DesktopMarquee({ messages }: { messages: Message[] }) {
  const loop = [...messages, ...messages];
  const duration = Math.max(messages.length * 12, 24);

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
            <MessageCard message={message} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
