import { desc, and, eq, gte } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { ensureSchema } from "@/lib/db/ensure-schema";
import { messages, type Message } from "@/lib/db/schema";
import {
  blobCountRecentByIp,
  blobCreateMessage,
  blobDeleteMessage,
  blobGetAllMessages,
  blobGetMessages,
  hasBlobStorage,
} from "@/lib/storage/blob-store";
import {
  fileCountRecentByIp,
  fileCreateMessage,
  fileDeleteMessage,
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
  if (getDb()) return "database";
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
  const db = getDb();

  if (mode === "database" && db) {
    try {
      await ensureSchema();
      return await db
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
  const db = getDb();

  if (mode === "database" && db) {
    try {
      await ensureSchema();
      return await db.select().from(messages).orderBy(desc(messages.createdAt));
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
  const db = getDb();

  if (mode === "database" && db) {
    try {
      await ensureSchema();
      const [created] = await db.insert(messages).values(input).returning();
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
  const db = getDb();

  if (mode === "database" && db) {
    try {
      await ensureSchema();
      const recent = await db
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

export async function deleteMessage(id: string): Promise<boolean> {
  const mode = getStorageMode();
  const db = getDb();

  if (mode === "database" && db) {
    try {
      await ensureSchema();
      const deleted = await db
        .delete(messages)
        .where(eq(messages.id, id))
        .returning({ id: messages.id });
      return deleted.length > 0;
    } catch (error) {
      console.error("Database delete failed:", error);
      if (hasBlobStorage()) return blobDeleteMessage(id);
      if (!isServerlessProduction()) return fileDeleteMessage(id);
      throw new StorageUnavailableError();
    }
  }

  if (mode === "blob") {
    try {
      return await blobDeleteMessage(id);
    } catch (error) {
      console.error("Blob delete failed:", error);
      throw new StorageUnavailableError();
    }
  }

  try {
    return await fileDeleteMessage(id);
  } catch (error) {
    console.error("File delete failed:", error);
    if (isServerlessProduction()) throw new StorageUnavailableError();
    throw error;
  }
}
