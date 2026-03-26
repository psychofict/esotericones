import { NextRequest, NextResponse } from "next/server";
import { getReleaseBySlug } from "@/data/releases";
import { verifyDownloadToken } from "@/lib/download-token";
import { getDb } from "@/lib/db";

const MAX_DOWNLOADS = 5;

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const payload = verifyDownloadToken(token);
  if (!payload) {
    return NextResponse.json(
      { error: "Invalid or expired download link" },
      { status: 403 }
    );
  }

  const release = getReleaseBySlug(payload.slug);
  if (!release?.purchase) {
    return NextResponse.json({ error: "Release not found" }, { status: 404 });
  }

  const blobPath = payload.format === "wav"
    ? release.purchase.blobPathWav
    : release.purchase.blobPathMp3;

  if (!blobPath) {
    return NextResponse.json({ error: "Format not available" }, { status: 404 });
  }

  // Check and increment download count in DB
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT download_count FROM purchases
      WHERE stripe_session_id = ${payload.sessionId}
    `;
    if (rows.length > 0 && rows[0].download_count >= MAX_DOWNLOADS) {
      return NextResponse.json(
        { error: "Download limit reached for this purchase" },
        { status: 429 }
      );
    }
    await sql`
      UPDATE purchases SET download_count = download_count + 1
      WHERE stripe_session_id = ${payload.sessionId}
    `;
  } catch {
    // Don't block download if DB is unavailable
  }

  return NextResponse.redirect(blobPath);
}
