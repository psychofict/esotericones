import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArtistBySlug, artists } from "@/data/artists";
import { getReleasesByArtist } from "@/data/releases";
import { getArtistSchema, getBreadcrumbSchema } from "@/lib/structured-data";
import JsonLd from "@/components/JsonLd";
import ArtistPageClient from "./ArtistPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) return {};

  const title = artist.name;
  const description = artist.shortBio || artist.bio.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title: `${artist.name} | The ESOTERIC Ones`,
      description,
      type: "profile",
      url: `https://esotericones.com/artists/${slug}`,
      ...(artist.image
        ? { images: [{ url: artist.image, width: 400, height: 400, alt: artist.name }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${artist.name} | The ESOTERIC Ones`,
      description,
    },
    alternates: {
      canonical: `https://esotericones.com/artists/${slug}`,
    },
  };
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);

  if (!artist) {
    notFound();
  }

  const artistReleases = getReleasesByArtist(slug);
  const relatedArtists = artists
    .filter((a) => a.slug !== slug && a.genres.some((g) => artist.genres.includes(g)))
    .slice(0, 4);

  const artistSchema = getArtistSchema(slug);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://esotericones.com" },
    { name: "Artists", url: "https://esotericones.com/artists" },
    { name: artist.name, url: `https://esotericones.com/artists/${slug}` },
  ]);

  return (
    <>
      {artistSchema && <JsonLd data={artistSchema} />}
      <JsonLd data={breadcrumbSchema} />
      <ArtistPageClient
        artist={artist}
        artistReleases={artistReleases}
        relatedArtists={relatedArtists}
      />
    </>
  );
}
