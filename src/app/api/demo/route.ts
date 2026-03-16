import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (rateLimit.size > 500) {
    for (const [key, val] of rateLimit) {
      if (now > val.resetAt) rateLimit.delete(key);
    }
  }
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { artistName, email, country, genre, demoLinks, socials, bio } = body;

    if (!artistName || !email || !demoLinks) {
      return NextResponse.json(
        { error: "Artist name, email, and demo links are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const fields = [
      { label: "Artist Name", value: artistName },
      { label: "Email", value: email },
      { label: "Country", value: country },
      { label: "Genre", value: genre },
      { label: "Demo Links", value: demoLinks },
      { label: "Social Links", value: socials },
      { label: "Bio", value: bio },
    ]
      .filter((f) => f.value)
      .map((f) => `<strong>${escapeHtml(f.label)}:</strong> ${escapeHtml(String(f.value))}`)
      .join("<br><br>");

    await resend.emails.send({
      from: "The ESOTERIC Ones <noreply@esotericones.com>",
      to: "contact@esotericones.com",
      subject: `Demo Submission from ${escapeHtml(artistName)}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #E8385D, #FF4D73); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Demo Submission</h1>
          </div>
          <div style="background: #141414; padding: 30px 20px; border-radius: 0 0 8px 8px; color: #A0A0A0; line-height: 1.8;">
            ${fields}
          </div>
        </div>
      `,
    });

    await resend.emails.send({
      from: "The ESOTERIC Ones <noreply@esotericones.com>",
      to: email,
      subject: "Demo Received — The ESOTERIC Ones",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #E8385D, #FF4D73); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">THE ESOTERIC ONES</h1>
          </div>
          <div style="padding: 30px 20px; background: #0A0A0A; color: #A0A0A0;">
            <h2 style="color: #F5F5F5;">Thanks for your submission, ${escapeHtml(artistName)}!</h2>
            <p>We've received your demo and our A&R team will review it within 2-4 weeks. If we're interested, we'll be in touch.</p>
            <p>In the meantime, follow us on <a href="https://open.spotify.com/artist/4mH71Zjiq36Q3SI7IZIBQK" style="color: #E8385D;">Spotify</a> to stay updated.</p>
          </div>
          <div style="background: #141414; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              &copy; ${new Date().getFullYear()} The ESOTERIC Ones. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Demo submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit demo" },
      { status: 500 }
    );
  }
}
