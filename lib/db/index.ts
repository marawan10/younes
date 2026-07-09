import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

type AppDb = NeonHttpDatabase<typeof schema>;

let cachedDb: AppDb | null | undefined;

function getDatabaseUrl() {
  return (
    process.env.POSTGRES_URL ??
    process.env.DATABASE_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    process.env.DATABASE_URL_UNPOOLED
  );
}

export function getDb(): AppDb | null {
  if (cachedDb !== undefined) {
    return cachedDb;
  }

  const url = getDatabaseUrl();
  if (!url) {
    cachedDb = null;
    return null;
  }

  cachedDb = drizzle(neon(url), { schema });
  return cachedDb;
}

export function hasDatabaseConfig() {
  return Boolean(getDatabaseUrl());
}
