import type { MetadataRoute } from "next";
import { artists } from "@/data/artists";
import { releases } from "@/data/releases";
import { newsPosts } from "@/data/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://esotericones.com";

  // Find the most recent release and news dates
  const latestReleaseDate = releases.reduce((latest, r) =>
    r.date > latest ? r.date : latest, releases[0]?.date ?? "2026-03-16"
  );
  const latestNewsDate = newsPosts.reduce((latest, p) =>
    p.date > latest ? p.date : latest, newsPosts[0]?.date ?? "2026-03-16"
  );

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: latestReleaseDate, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/artists`, lastModified: latestReleaseDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/releases`, lastModified: latestReleaseDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/news`, lastModified: latestNewsDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tour`, lastModified: "2026-03-16", changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/merch`, lastModified: "2026-03-16", changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/events`, lastModified: "2026-03-16", changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: "2026-03-16", changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: "2026-03-16", changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/demos`, lastModified: "2026-03-16", changeFrequency: "monthly", priority: 0.6 },
  ];

  const artistPages: MetadataRoute.Sitemap = artists.map((artist) => {
    const url = `${baseUrl}/artists/${artist.slug}`;
    return {
      url,
      lastModified: releases.find((r) => r.artistSlugs.includes(artist.slug))?.date ?? "2026-03-16",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    };
  });

  const releasePages: MetadataRoute.Sitemap = releases.map((release) => {
    const url = `${baseUrl}/releases/${release.slug}`;
    return {
      url,
      lastModified: release.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  const newsPages: MetadataRoute.Sitemap = newsPosts.map((post) => {
    const url = `${baseUrl}/news/${post.slug}`;
    return {
      url,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    };
  });

  const trackPages: MetadataRoute.Sitemap = [];
  for (const release of releases) {
    if (release.tracklist) {
      for (const track of release.tracklist) {
        if (track.slug && track.lyrics) {
          const url = `${baseUrl}/releases/${release.slug}/${track.slug}`;
          trackPages.push({
            url,
            lastModified: release.date,
            changeFrequency: "monthly" as const,
            priority: 0.5,
          });
        }
      }
    }
  }

  return [...staticPages, ...artistPages, ...releasePages, ...trackPages, ...newsPages];
}
