import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getEventImagePresignedUrl } from "@/lib/s3";

export async function POST(req: NextRequest) {
  // Require an authenticated admin session
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { eventId, contentType, fileSize } = await req.json();

  if (!eventId || !contentType || !fileSize) {
    return NextResponse.json(
      { error: "Missing eventId, contentType, or fileSize" },
      { status: 400 }
    );
  }

  try {
    const result = await getEventImagePresignedUrl(eventId, contentType, fileSize);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
