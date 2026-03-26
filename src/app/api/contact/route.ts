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
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

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
    const { type, name, email, message, ...rest } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const subjectMap: Record<string, string> = {
      booking: `Booking Inquiry from ${escapeHtml(name || email)}`,
      press: `Press Inquiry from ${escapeHtml(name || email)}`,
      licensing: `Licensing Inquiry from ${escapeHtml(name || email)}`,
      partnerships: `Partnership Inquiry from ${escapeHtml(name || email)}`,
      general: `General Inquiry from ${escapeHtml(name || email)}`,
    };

    const subject = subjectMap[type] || `New Inquiry from ${escapeHtml(email)}`;

    const emailBody = Object.entries({ type, name, email, message, ...rest })
      .filter(([, v]) => v)
      .map(([k, v]) => `<strong>${escapeHtml(k.charAt(0).toUpperCase() + k.slice(1).replace(/([A-Z])/g, ' $1'))}:</strong> ${escapeHtml(String(v))}`)
      .join("<br><br>");

    await resend.emails.send({
      from: "The ESOTERIC Ones <noreply@esotericones.com>",
      to: "contact@ebstar.co",
      subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #E8385D, #FF4D73); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">New ${escapeHtml(type || "General")} Inquiry</h2>
          </div>
          <div style="background: #141414; padding: 20px; border-radius: 0 0 8px 8px; line-height: 1.8; color: #A0A0A0;">
            ${emailBody}
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Sent from esotericones.com contact form
          </p>
        </div>
      `,
    });

    await resend.emails.send({
      from: "The ESOTERIC Ones <noreply@esotericones.com>",
      to: email,
      subject: "Thank you for reaching out — The ESOTERIC Ones",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #E8385D, #FF4D73); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">THE ESOTERIC ONES</h1>
          </div>
          <div style="padding: 30px 20px; background: #0A0A0A; color: #A0A0A0;">
            <h2 style="color: #F5F5F5;">Thank you for your message!</h2>
            <p>We've received your ${escapeHtml(type || "general")} inquiry and will get back to you as soon as possible.</p>
            <p>In the meantime, check out our latest releases on
              <a href="https://open.spotify.com/artist/4mH71Zjiq36Q3SI7IZIBQK" style="color: #E8385D;">Spotify</a>.
            </p>
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
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
