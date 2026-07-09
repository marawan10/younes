import { createHash } from "crypto";
import { countRecentMessagesByIp } from "@/lib/messages";

export function hashIp(ip: string): string {
  return createHash("sha256").update(`younes-ip:${ip}`).digest("hex");
}

export async function isRateLimited(ipHash: string): Promise<boolean> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const count = await countRecentMessagesByIp(ipHash, oneHourAgo);
  return count >= 3;
}
