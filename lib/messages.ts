import { desc, and, eq, gte } from "drizzle-orm";
import { db } from "@/lib/db";
import { messages, type Message } from "@/lib/db/schema";
import {
  fileCountRecentByIp,
  fileCreateMessage,
  fileGetAllMessages,
  fileGetMessages,
} from "@/lib/storage/file-store";

export function isUsingDatabase(): boolean {
  return Boolean(process.env.POSTGRES_URL ?? process.env.DATABASE_URL);
}

export async function getMessages(limit = 50): Promise<Message[]> {
  if (db) {
    try {
      return await db
        .select()
        .from(messages)
        .orderBy(desc(messages.createdAt))
        .limit(limit);
    } catch {
      return fileGetMessages(limit);
    }
  }

  return fileGetMessages(limit);
}

export async function getAllMessages(): Promise<Message[]> {
  if (db) {
    return await db
      .select()
      .from(messages)
      .orderBy(desc(messages.createdAt));
  }

  return fileGetAllMessages();
}

export async function createMessage(input: {
  authorName: string;
  body: string;
  ipHash: string;
}): Promise<Message> {
  if (db) {
    const [created] = await db
      .insert(messages)
      .values(input)
      .returning();
    return created;
  }

  return fileCreateMessage(input);
}

export async function countRecentMessagesByIp(
  ipHash: string,
  since: Date,
): Promise<number> {
  if (db) {
    const recent = await db
      .select({ id: messages.id })
      .from(messages)
      .where(
        and(eq(messages.ipHash, ipHash), gte(messages.createdAt, since)),
      )
      .limit(3);
    return recent.length;
  }

  return fileCountRecentByIp(ipHash, since);
}
