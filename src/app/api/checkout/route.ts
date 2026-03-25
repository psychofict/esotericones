import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getReleaseBySlug } from "@/data/releases";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10;
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

    const body = await req.json();
    const { slug, format } = body;

    if (!slug || !format) {
      return NextResponse.json(
        { error: "Release slug and format are required" },
        { status: 400 }
      );
    }

    if (format !== "wav" && format !== "mp3") {
      return NextResponse.json(
        { error: "Format must be wav or mp3" },
        { status: 400 }
      );
    }

    const release = getReleaseBySlug(slug);
    if (!release?.purchase) {
      return NextResponse.json(
        { error: "Release not available for purchase" },
        { status: 404 }
      );
    }

    if (!release.purchase.formats.includes(format)) {
      return NextResponse.json(
        { error: "Format not available for this release" },
        { status: 400 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      httpClient: Stripe.createFetchHttpClient(fetch),
    });
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://esotericones.com";

    const images: string[] = [];
    if (release.artwork) {
      images.push(`${siteUrl}${release.artwork}`);
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(release.purchase.priceUsd * 100),
            product_data: {
              name: `${release.title} (${format.toUpperCase()})`,
              description: `${release.title} by ${release.artistNames.join(", ")} — Digital Download`,
              ...(images.length > 0 ? { images } : {}),
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        releaseSlug: slug,
        format,
      },
      success_url: `${siteUrl}/download?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/releases/${slug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
