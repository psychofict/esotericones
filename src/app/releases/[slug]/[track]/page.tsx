import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getReleaseBySlug, releases } from "@/data/releases";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import JsonLd from "@/components/JsonLd";
import TrackPageClient from "./TrackPageClient";

interface Props {
  params: Promise<{ slug: string; track: string }>;
}

export async function generateStaticParams() {
  const params: { slug: string; track: string }[] = [];
  for (const release of releases) {
    if (release.tracklist) {
      for (const track of release.tracklist) {
        if (track.slug && track.lyrics) {
          params.push({ slug: release.slug, track: track.slug });
        }
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, track: trackSlug } = await params;
  const release = getReleaseBySlug(slug);
  if (!release) return {};

  const track = release.tracklist?.find((t) => t.slug === trackSlug);
  if (!track || !track.lyrics) return {};

  const title = `${track.title}${track.feat ? ` (feat. ${track.feat})` : ""} — ${release.artistNames.join(", ")}`;
  const description = `Lyrics for "${track.title}" from ${release.title} by ${release.artistNames.join(", ")}. Track ${track.number} of ${release.tracklist?.length ?? 0}.`;

  return {
    title,
    description,
    openGraph: {
      title: `${track.title} | ${release.title} | The ESOTERIC Ones`,
      description,
      type: "music.song",
      url: `https://esotericones.com/releases/${slug}/${trackSlug}`,
      ...(release.artwork
        ? { images: [{ url: release.artwork, width: 600, height: 600, alt: release.title }] }
        : {}),
    },
    alternates: {
      canonical: `https://esotericones.com/releases/${slug}/${trackSlug}`,
    },
  };
}

export default async function TrackPage({ params }: Props) {
  const { slug, track: trackSlug } = await params;
  const release = getReleaseBySlug(slug);

  if (!release) {
    notFound();
  }

  const track = release.tracklist?.find((t) => t.slug === trackSlug);
  if (!track || !track.lyrics) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://esotericones.com" },
    { name: "Releases", url: "https://esotericones.com/releases" },
    { name: release.title, url: `https://esotericones.com/releases/${slug}` },
    { name: track.title, url: `https://esotericones.com/releases/${slug}/${trackSlug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <TrackPageClient release={release} track={track} />
    </>
  );
}
