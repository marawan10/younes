import { MessageCard } from "@/components/MessageCard";
import { CssMarquee } from "@/components/CssMarquee";
import type { Message } from "@/lib/db/schema";

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

  return <CssMarquee messages={messages} />;
}
