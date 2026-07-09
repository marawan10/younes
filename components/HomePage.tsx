"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { BackgroundLullaby } from "@/components/BackgroundLullaby";
import { DesktopOnly } from "@/components/DesktopOnly";
import { Hero } from "@/components/Hero";
import { MessageForm } from "@/components/MessageForm";
import { MessageMarquee } from "@/components/MessageMarquee";
import { ShareButton } from "@/components/ShareButton";
import type { Message } from "@/lib/db/schema";

const CelebrationLayer = dynamic(
  () =>
    import("@/components/CelebrationLayer").then((m) => m.CelebrationLayer),
  { ssr: false },
);

export function HomePage({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  function handleMessageSent(message: Message) {
    setMessages((current) => [message, ...current]);
  }

  return (
    <>
      <BackgroundLullaby />
      <AnimatedBackground />
      <DesktopOnly>
        <CelebrationLayer />
      </DesktopOnly>
      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col gap-8 px-3 py-6 sm:gap-12 sm:px-6 sm:py-14">
        <Hero messageCount={messages.length} />

        <section className="page-section">
          <MessageMarquee messages={messages} />
        </section>

        <section className="page-section">
          <MessageForm onMessageSent={handleMessageSent} />
        </section>

        <section className="page-section flex justify-center pb-8 sm:pb-10">
          <ShareButton />
        </section>
      </div>
    </>
  );
}
