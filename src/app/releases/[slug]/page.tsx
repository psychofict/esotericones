import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getReleaseBySlug, releases } from "@/data/releases";
import { getReleaseSchema, getBreadcrumbSchema } from "@/lib/structured-data";
import JsonLd from "@/components/JsonLd";
import ReleasePageClient from "./ReleasePageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return releases.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);
  if (!release) return {};

  const title = `${release.title} — ${release.artistNames.join(", ")}`;
  const description = `${release.title} by ${release.artistNames.join(", ")}. ${release.type === "ep" ? "EP" : release.type.charAt(0).toUpperCase() + release.type.slice(1)} released in ${release.year}. Genres: ${release.genres.join(", ")}.`;

  return {
    title,
    description,
    openGraph: {
      title: `${release.title} | The ESOTERIC Ones`,
      description,
      type: "music.album",
      url: `https://esotericones.com/releases/${slug}`,
      ...(release.artwork
        ? { images: [{ url: release.artwork, width: 600, height: 600, alt: release.title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${release.title} | The ESOTERIC Ones`,
      description,
    },
    alternates: {
      canonical: `https://esotericones.com/releases/${slug}`,
    },
  };
}

export default async function ReleasePage({ params }: Props) {
  const { slug } = await params;
  const release = getReleaseBySlug(slug);

  if (!release) {
    notFound();
  }

  const releaseSchema = getReleaseSchema(slug);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://esotericones.com" },
    { name: "Releases", url: "https://esotericones.com/releases" },
    { name: release.title, url: `https://esotericones.com/releases/${slug}` },
  ]);

  return (
    <>
      {releaseSchema && <JsonLd data={releaseSchema} />}
      <JsonLd data={breadcrumbSchema} />
      <ReleasePageClient release={release} />
    </>
  );
}
