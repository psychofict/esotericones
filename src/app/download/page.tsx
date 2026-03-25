import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import { getReleaseBySlug } from "@/data/releases";
import { generateDownloadToken } from "@/lib/download-token";
import DownloadPageClient from "./DownloadPageClient";

export const metadata: Metadata = {
  title: "Download Your Music",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function DownloadPage({ searchParams }: Props) {
  const { session_id } = await searchParams;
  if (!session_id) notFound();

  if (!process.env.STRIPE_SECRET_KEY) notFound();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    httpClient: Stripe.createFetchHttpClient(fetch),
  });

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch {
    notFound();
  }

  if (session.payment_status !== "paid") notFound();

  const releaseSlug = session.metadata?.releaseSlug;
  const format = session.metadata?.format;
  if (!releaseSlug || !format) notFound();

  const release = getReleaseBySlug(releaseSlug);
  if (!release?.purchase) notFound();

  const token = generateDownloadToken(releaseSlug, format, session.id);

  return (
    <DownloadPageClient
      releaseTitle={release.title}
      artistNames={release.artistNames}
      artwork={release.artwork}
      format={format}
      downloadToken={token}
    />
  );
}
