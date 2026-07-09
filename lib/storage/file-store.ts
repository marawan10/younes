import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import type { Message } from "@/lib/db/schema";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "messages.json");

async function ensureStore(): Promise<Message[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Message[];
  } catch {
    return [];
  }
}

async function writeStore(messages: Message[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2), "utf-8");
}

export async function fileGetMessages(limit = 50): Promise<Message[]> {
  const messages = await ensureStore();
  return messages
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, limit);
}

export async function fileGetAllMessages(): Promise<Message[]> {
  const messages = await ensureStore();
  return messages.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function fileCreateMessage(input: {
  authorName: string;
  body: string;
  ipHash: string;
}): Promise<Message> {
  const messages = await ensureStore();
  const message: Message = {
    id: randomUUID(),
    authorName: input.authorName,
    body: input.body,
    ipHash: input.ipHash,
    createdAt: new Date(),
  };

  messages.unshift(message);
  await writeStore(messages);
  return message;
}

export async function fileCountRecentByIp(
  ipHash: string,
  since: Date,
): Promise<number> {
  const messages = await ensureStore();
  return messages.filter(
    (message) =>
      message.ipHash === ipHash &&
      new Date(message.createdAt).getTime() >= since.getTime(),
  ).length;
}
