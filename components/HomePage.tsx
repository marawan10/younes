"use client";

import { useState } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { BackgroundLullaby } from "@/components/BackgroundLullaby";
import { CelebrationLayer } from "@/components/CelebrationLayer";
import { Hero } from "@/components/Hero";
import { MessageForm } from "@/components/MessageForm";
import { MessageMarquee } from "@/components/MessageMarquee";
import { SectionReveal } from "@/components/SectionReveal";
import { ShareButton } from "@/components/ShareButton";
import type { Message } from "@/lib/db/schema";

export function HomePage({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  function handleMessageSent(message: Message) {
    setMessages((current) => [message, ...current]);
  }

  return (
    <>
      <BackgroundLullaby />
      <AnimatedBackground />
      <CelebrationLayer />
      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col gap-8 px-3 py-6 sm:gap-12 sm:px-6 sm:py-14">
        <Hero messageCount={messages.length} />

        <SectionReveal delay={0.08}>
          <MessageMarquee messages={messages} />
        </SectionReveal>

        <SectionReveal delay={0.14}>
          <MessageForm onMessageSent={handleMessageSent} />
        </SectionReveal>

        <SectionReveal className="flex justify-center pb-8 sm:pb-10" delay={0.2}>
          <ShareButton />
        </SectionReveal>
      </div>
    </>
  );
}
