import { HomePage } from "@/components/HomePage";
import { getMessages } from "@/lib/messages";

export default async function Page() {
  const messages = await getMessages(50);
  return <HomePage initialMessages={messages} />;
}
