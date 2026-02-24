import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Send welcome email
    await resend.emails.send({
      from: "EBSTAR <noreply@ebstar.com>",
      to: email,
      subject: "Welcome to the ESOTERIC circle",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2E86DE, #1B5E8A); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">EBSTAR</h1>
            <p style="color: rgba(255,255,255,0.8); margin-top: 8px;">The ESOTERIC Ones</p>
          </div>
          <div style="padding: 30px 20px; background: #FFFFFF;">
            <h2 style="color: #1A1A2E;">Welcome to the circle!</h2>
            <p style="color: #555; line-height: 1.6;">
              You'll be the first to know about new releases, behind-the-scenes content, and exclusive updates.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://open.spotify.com/artist/4mH71Zjiq36Q3SI7IZIBQK"
                 style="background: #2E86DE; color: white; padding: 12px 30px; border-radius: 30px; text-decoration: none; display: inline-block;">
                Listen on Spotify
              </a>
            </div>
          </div>
          <div style="background: #EAF4FC; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              © 2025 The ESOTERIC Ones. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    // Notify artist of new subscriber
    await resend.emails.send({
      from: "EBSTAR Website <noreply@ebstar.com>",
      to: "ebstarmusic@gmail.com",
      subject: "New newsletter subscriber!",
      html: `<p>New subscriber: <strong>${email}</strong></p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
