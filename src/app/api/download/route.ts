import { NextRequest, NextResponse } from "next/server";
import { getReleaseBySlug } from "@/data/releases";
import { verifyDownloadToken } from "@/lib/download-token";
import { getDb } from "@/lib/db";

const downloadCounts = new Map<string, { count: number; resetAt: number }>();
const MAX_DOWNLOADS = 5;
const WINDOW_MS = 72 * 60 * 60 * 1000; // 72 hours

function isDownloadLimited(tokenId: string): boolean {
  const now = Date.now();
  if (downloadCounts.size > 1000) {
    for (const [key, val] of downloadCounts) {
      if (now > val.resetAt) downloadCounts.delete(key);
    }
  }
  const entry = downloadCounts.get(tokenId);
  if (!entry || now > entry.resetAt) {
    downloadCounts.set(tokenId, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > MAX_DOWNLOADS;
}

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

  if (isDownloadLimited(payload.sessionId)) {
    return NextResponse.json(
      { error: "Download limit reached for this purchase" },
      { status: 429 }
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

  // Track download count in DB
  try {
    const sql = getDb();
    await sql`
      UPDATE purchases SET download_count = download_count + 1
      WHERE stripe_session_id = ${payload.sessionId}
    `;
  } catch {
    // Don't block download if DB update fails
  }

  // Redirect to Vercel Blob URL
  return NextResponse.redirect(blobPath);
}
