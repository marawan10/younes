import { NextRequest, NextResponse } from "next/server";
import { createMessage, getMessages, StorageUnavailableError } from "@/lib/messages";
import { hashIp, isRateLimited } from "@/lib/rate-limit";
import { messageSchema, sanitizeText } from "@/lib/validations";

export async function GET() {
  try {
    const result = await getMessages(50);
    return NextResponse.json({ messages: result });
  } catch (error) {
    console.error("GET /api/messages failed:", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = messageSchema.safeParse(body);

    if (
      !parsed.success ||
      (parsed.data.website && parsed.data.website.length > 0)
    ) {
      return NextResponse.json({ error: "invalid_input" }, { status: 400 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";
    const ipHash = hashIp(ip);

    if (await isRateLimited(ipHash)) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }

    const authorName = sanitizeText(parsed.data.authorName);
    const messageBody = sanitizeText(parsed.data.body);

    if (!authorName || !messageBody) {
      return NextResponse.json({ error: "invalid_input" }, { status: 400 });
    }

    const created = await createMessage({
      authorName,
      body: messageBody,
      ipHash,
    });

    return NextResponse.json({ message: created }, { status: 201 });
  } catch (error) {
    if (error instanceof StorageUnavailableError) {
      return NextResponse.json({ error: "storage_unavailable" }, { status: 503 });
    }

    console.error("POST /api/messages failed:", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
