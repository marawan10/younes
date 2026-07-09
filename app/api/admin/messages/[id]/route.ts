import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  deleteMessage,
  StorageUnavailableError,
} from "@/lib/messages";

const idSchema = z.string().uuid();

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const parsed = idSchema.safeParse(id);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_id" }, { status: 400 });
  }

  try {
    const removed = await deleteMessage(parsed.data);
    if (!removed) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof StorageUnavailableError) {
      return NextResponse.json({ error: "storage_unavailable" }, { status: 503 });
    }

    console.error("DELETE /api/admin/messages failed:", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
