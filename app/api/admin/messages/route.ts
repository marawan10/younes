import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAllMessages } from "@/lib/messages";

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const result = await getAllMessages();
    return NextResponse.json({ messages: result });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
