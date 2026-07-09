import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "younes_admin_session";

function getSessionToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash("sha256")
    .update(`younes-admin:${password}`)
    .digest("hex");
}

export function createAdminSessionToken(): string | null {
  return getSessionToken();
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const expected = getSessionToken();
  if (!expected) return false;

  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  if (!session) return false;

  try {
    const a = Buffer.from(session);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export const adminCookieName = COOKIE_NAME;
