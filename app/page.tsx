import NextDynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { MessageList } from "@/components/MessageList";
import { PageChrome } from "@/components/PageChrome";
import { getMessages } from "@/lib/messages";

export const dynamic = "force-dynamic";

const MessageForm = NextDynamic(
  () => import("@/components/MessageForm").then((m) => m.MessageForm),
);

const ShareButton = NextDynamic(
  () => import("@/components/ShareButton").then((m) => m.ShareButton),
);

export default async function Page() {
  const messages = await getMessages(50);

  return (
    <>
      <PageChrome />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 px-3 py-6 md:gap-12 md:px-6 md:py-14">
        <Hero messageCount={messages.length} />

        <section className="page-section">
          <MessageList messages={messages} />
        </section>

        <section className="page-section">
          <MessageForm />
        </section>

        <section className="page-section flex justify-center pb-8 md:pb-10">
          <ShareButton />
        </section>
      </div>
    </>
  );
}
