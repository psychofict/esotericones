import crypto from "crypto";

const EXPIRY_MS = 72 * 60 * 60 * 1000; // 72 hours

interface TokenPayload {
  slug: string;
  format: string;
  sessionId: string;
  expiresAt: number;
}

export function generateDownloadToken(slug: string, format: string, sessionId: string): string {
  const expiresAt = Date.now() + EXPIRY_MS;
  const payload = JSON.stringify({ slug, format, sessionId, expiresAt });
  const encoded = Buffer.from(payload).toString("base64url");
  const signature = crypto
    .createHmac("sha256", process.env.DOWNLOAD_SECRET!)
    .update(encoded)
    .digest("base64url");
  return `${encoded}.${signature}`;
}

export function verifyDownloadToken(token: string): TokenPayload | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encoded, signature] = parts;
  const expectedSig = crypto
    .createHmac("sha256", process.env.DOWNLOAD_SECRET!)
    .update(encoded)
    .digest("base64url");

  if (signature !== expectedSig) return null;

  try {
    const payload: TokenPayload = JSON.parse(Buffer.from(encoded, "base64url").toString());
    if (Date.now() > payload.expiresAt) return null;
    return payload;
  } catch {
    return null;
  }
}
