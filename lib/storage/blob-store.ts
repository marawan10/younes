import { head, put } from "@vercel/blob";
import { randomUUID } from "crypto";
import type { Message } from "@/lib/db/schema";

const BLOB_PATHNAME = "younes/messages.json";

async function readMessages(): Promise<Message[]> {
  try {
    const meta = await head(BLOB_PATHNAME);
    const response = await fetch(meta.url, { cache: "no-store" });
    if (!response.ok) return [];
    const data = (await response.json()) as Message[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeMessages(messages: Message[]) {
  await put(BLOB_PATHNAME, JSON.stringify(messages), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export function hasBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function blobGetMessages(limit = 50): Promise<Message[]> {
  const messages = await readMessages();
  return messages
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, limit);
}

export async function blobGetAllMessages(): Promise<Message[]> {
  const messages = await readMessages();
  return messages.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function blobCreateMessage(input: {
  authorName: string;
  body: string;
  ipHash: string;
}): Promise<Message> {
  const messages = await readMessages();
  const message: Message = {
    id: randomUUID(),
    authorName: input.authorName,
    body: input.body,
    ipHash: input.ipHash,
    createdAt: new Date(),
  };

  messages.unshift(message);
  await writeMessages(messages);
  return message;
}

export async function blobCountRecentByIp(
  ipHash: string,
  since: Date,
): Promise<number> {
  const messages = await readMessages();
  return messages.filter(
    (message) =>
      message.ipHash === ipHash &&
      new Date(message.createdAt).getTime() >= since.getTime(),
  ).length;
}
