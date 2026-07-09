import { desc, and, eq, gte } from "drizzle-orm";
import { db } from "@/lib/db";
import { ensureSchema } from "@/lib/db/ensure-schema";
import { messages, type Message } from "@/lib/db/schema";
import {
  blobCountRecentByIp,
  blobCreateMessage,
  blobGetAllMessages,
  blobGetMessages,
  hasBlobStorage,
} from "@/lib/storage/blob-store";
import {
  fileCountRecentByIp,
  fileCreateMessage,
  fileGetAllMessages,
  fileGetMessages,
} from "@/lib/storage/file-store";

export class StorageUnavailableError extends Error {
  constructor() {
    super("storage_unavailable");
    this.name = "StorageUnavailableError";
  }
}

type StorageMode = "database" | "blob" | "file";

function getStorageMode(): StorageMode {
  if (db) return "database";
  if (hasBlobStorage()) return "blob";
  return "file";
}

function isServerlessProduction() {
  return Boolean(process.env.VERCEL);
}

export function isUsingDatabase(): boolean {
  return getStorageMode() === "database";
}

export async function getMessages(limit = 50): Promise<Message[]> {
  const mode = getStorageMode();

  if (mode === "database") {
    try {
      await ensureSchema();
      return await db!
        .select()
        .from(messages)
        .orderBy(desc(messages.createdAt))
        .limit(limit);
    } catch {
      if (hasBlobStorage()) return blobGetMessages(limit);
      return fileGetMessages(limit);
    }
  }

  if (mode === "blob") {
    return blobGetMessages(limit);
  }

  return fileGetMessages(limit);
}

export async function getAllMessages(): Promise<Message[]> {
  const mode = getStorageMode();

  if (mode === "database") {
    try {
      await ensureSchema();
      return await db!.select().from(messages).orderBy(desc(messages.createdAt));
    } catch {
      if (hasBlobStorage()) return blobGetAllMessages();
      return fileGetAllMessages();
    }
  }

  if (mode === "blob") {
    return blobGetAllMessages();
  }

  return fileGetAllMessages();
}

export async function createMessage(input: {
  authorName: string;
  body: string;
  ipHash: string;
}): Promise<Message> {
  const mode = getStorageMode();

  if (mode === "database") {
    try {
      await ensureSchema();
      const [created] = await db!
        .insert(messages)
        .values(input)
        .returning();
      return created;
    } catch (error) {
      console.error("Database create failed:", error);
      if (hasBlobStorage()) return blobCreateMessage(input);
      if (!isServerlessProduction()) return fileCreateMessage(input);
      throw new StorageUnavailableError();
    }
  }

  if (mode === "blob") {
    try {
      return await blobCreateMessage(input);
    } catch (error) {
      console.error("Blob create failed:", error);
      throw new StorageUnavailableError();
    }
  }

  try {
    return await fileCreateMessage(input);
  } catch (error) {
    console.error("File create failed:", error);
    if (isServerlessProduction()) throw new StorageUnavailableError();
    throw error;
  }
}

export async function countRecentMessagesByIp(
  ipHash: string,
  since: Date,
): Promise<number> {
  const mode = getStorageMode();

  if (mode === "database") {
    try {
      await ensureSchema();
      const recent = await db!
        .select({ id: messages.id })
        .from(messages)
        .where(
          and(eq(messages.ipHash, ipHash), gte(messages.createdAt, since)),
        )
        .limit(3);
      return recent.length;
    } catch {
      if (hasBlobStorage()) return blobCountRecentByIp(ipHash, since);
      return fileCountRecentByIp(ipHash, since);
    }
  }

  if (mode === "blob") {
    return blobCountRecentByIp(ipHash, since);
  }

  return fileCountRecentByIp(ipHash, since);
}
