import { sql } from "drizzle-orm";
import { db } from "@/lib/db";

let ensured = false;

export async function ensureSchema() {
  if (!db || ensured) return;

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS messages (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      author_name varchar(50) NOT NULL,
      body varchar(300) NOT NULL,
      ip_hash varchar(64),
      created_at timestamp with time zone DEFAULT now() NOT NULL
    )
  `);

  ensured = true;
}
