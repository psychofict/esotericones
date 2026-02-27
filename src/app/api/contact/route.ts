import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
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

    // Validate required fields
    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Build subject based on inquiry type
    const subjectMap: Record<string, string> = {
      booking: `Booking Inquiry from ${escapeHtml(name || email)}`,
      press: `Press Inquiry from ${escapeHtml(rest.outlet || email)}`,
      collaboration: `Collaboration Request from ${escapeHtml(name || email)}`,
      label: `Label Submission from ${escapeHtml(rest.artistName || email)}`,
      general: `General Inquiry from ${escapeHtml(name || email)}`,
    };

    const subject = subjectMap[type] || `New Inquiry from ${escapeHtml(email)}`;

    // Format the email body with all fields — sanitized
    const emailBody = Object.entries({ type, name, email, message, ...rest })
      .filter(([, v]) => v)
      .map(([k, v]) => `<strong>${escapeHtml(k.charAt(0).toUpperCase() + k.slice(1).replace(/([A-Z])/g, ' $1'))}:</strong> ${escapeHtml(String(v))}`)
      .join("<br><br>");

    // Send notification to artist
    await resend.emails.send({
      from: "EBSTAR Website <noreply@ebstar.co>",
      to: "contact@ebstar.co",
      subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2E86DE;">New ${escapeHtml(type || "General")} Inquiry</h2>
          <div style="background: #F8FBFF; padding: 20px; border-radius: 8px; line-height: 1.8;">
            ${emailBody}
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            Sent from ebstar.co contact form
          </p>
        </div>
      `,
    });

    // Send auto-reply confirmation to sender
    await resend.emails.send({
      from: "EBSTAR <noreply@ebstar.co>",
      to: email,
      subject: "Thank you for reaching out! — EBSTAR",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2E86DE, #1B5E8A); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">EBSTAR</h1>
          </div>
          <div style="padding: 30px 20px; background: #FFFFFF;">
            <h2 style="color: #1A1A2E;">Thank you for your message!</h2>
            <p style="color: #555; line-height: 1.6;">
              We've received your ${escapeHtml(type || "general")} inquiry and will get back to you as soon as possible.
            </p>
            <p style="color: #555; line-height: 1.6;">
              In the meantime, check out the latest music on
              <a href="https://open.spotify.com/artist/4mH71Zjiq36Q3SI7IZIBQK" style="color: #2E86DE;">Spotify</a>.
            </p>
          </div>
          <div style="background: #EAF4FC; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #999; font-size: 12px; margin: 0;">
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
