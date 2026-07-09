"use client";

import dynamic from "next/dynamic";
import { MessageCard } from "@/components/MessageCard";
import type { Message } from "@/lib/db/schema";

const DesktopMarquee = dynamic(
  () => import("@/components/DesktopMarquee").then((m) => m.DesktopMarquee),
  { ssr: false },
);

export function DesktopMessageSection({
  messages,
  useMarquee,
}: {
  messages: Message[];
  useMarquee: boolean;
}) {
  if (!useMarquee) {
    return (
      <div className="flex justify-center px-4 py-4">
        <MessageCard message={messages[0]} />
      </div>
    );
  }

  return <DesktopMarquee messages={messages} />;
}
