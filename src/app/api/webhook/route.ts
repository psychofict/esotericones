import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { getReleaseBySlug } from "@/data/releases";
import { generateDownloadToken } from "@/lib/download-token";
import { getDb } from "@/lib/db";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    httpClient: Stripe.createFetchHttpClient(fetch),
  });
  const resend = new Resend(process.env.RESEND_API_KEY);

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const releaseSlug = session.metadata?.releaseSlug;
    const format = session.metadata?.format;
    const customerEmail = session.customer_details?.email || session.customer_email;

    if (!releaseSlug || !format) {
      return NextResponse.json({ received: true });
    }

    const release = getReleaseBySlug(releaseSlug);
    if (!release?.purchase || !customerEmail) {
      return NextResponse.json({ received: true });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://esotericones.com";
    const token = generateDownloadToken(releaseSlug, format, session.id);
    const downloadUrl = `${siteUrl}/api/download?token=${token}`;

    const safeTitle = escapeHtml(release.title);
    const safeArtists = escapeHtml(release.artistNames.join(", "));

    // Record purchase in database
    try {
      const sql = getDb();
      await sql`
        INSERT INTO purchases (email, release_slug, release_title, artist_names, format, amount_usd, stripe_session_id)
        VALUES (${customerEmail}, ${releaseSlug}, ${release.title}, ${release.artistNames.join(", ")}, ${format}, ${release.purchase.priceUsd}, ${session.id})
        ON CONFLICT (stripe_session_id) DO NOTHING
      `;
    } catch (dbErr) {
      console.error("Failed to record purchase:", dbErr);
    }

    // Send receipt email to customer
    try {
      await resend.emails.send({
        from: "The ESOTERIC Ones <noreply@esotericones.com>",
        to: customerEmail,
        subject: `Your Download — ${release.title}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #E8385D, #FF4D73); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">THE ESOTERIC ONES</h1>
              <p style="color: rgba(255,255,255,0.8); margin-top: 8px;">Your Purchase</p>
            </div>
            <div style="padding: 30px 20px; background: #0A0A0A; color: #A0A0A0;">
              <h2 style="color: #F5F5F5;">Thank you for your purchase!</h2>
              <p><strong style="color: #F5F5F5;">${safeTitle}</strong> by ${safeArtists}</p>
              <p>Format: ${format.toUpperCase()}</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${downloadUrl}"
                   style="background: #E8385D; color: white; padding: 14px 32px; border-radius: 30px; text-decoration: none; display: inline-block; font-weight: 600;">
                  Download Your Music
                </a>
              </div>
              <p style="font-size: 13px; color: #666;">This link expires in 72 hours. If you need a new link, reply to this email.</p>
            </div>
            <div style="background: #141414; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                &copy; ${new Date().getFullYear()} The ESOTERIC Ones. All rights reserved.
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Failed to send receipt email:", emailErr);
    }

    // Notify label of sale
    try {
      await resend.emails.send({
        from: "The ESOTERIC Ones <noreply@esotericones.com>",
        to: "contact@ebstar.co",
        subject: `New Sale: ${release.title} (${format.toUpperCase()})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #E8385D, #FF4D73); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h2 style="color: white; margin: 0;">New Digital Sale</h2>
            </div>
            <div style="background: #141414; padding: 20px; border-radius: 0 0 8px 8px; line-height: 1.8; color: #A0A0A0;">
              <p><strong>Release:</strong> ${safeTitle}</p>
              <p><strong>Artist:</strong> ${safeArtists}</p>
              <p><strong>Format:</strong> ${format.toUpperCase()}</p>
              <p><strong>Customer:</strong> ${escapeHtml(customerEmail)}</p>
              <p><strong>Amount:</strong> $${release.purchase.priceUsd.toFixed(2)}</p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Failed to send sale notification:", emailErr);
    }
  }

  return NextResponse.json({ received: true });
}
