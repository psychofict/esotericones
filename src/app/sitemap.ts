import type { MetadataRoute } from "next";
import { artists } from "@/data/artists";
import { releases } from "@/data/releases";
import { newsPosts } from "@/data/news";

const locales = ["en", "ko", "fr"] as const;

function withLanguages(url: string): { languages: Record<string, string> } {
  const languages: Record<string, string> = { "x-default": url };
  for (const locale of locales) {
    languages[locale] = url;
  }
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://esotericones.com";

  // Use the most recent release or news date as the "last updated" for listing pages
  const latestReleaseDate = releases[0]?.date ?? "2026-03-16";
  const latestNewsDate = newsPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0]?.date ?? "2026-03-16";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: latestReleaseDate, changeFrequency: "weekly", priority: 1, alternates: withLanguages(baseUrl) },
    { url: `${baseUrl}/artists`, lastModified: latestReleaseDate, changeFrequency: "weekly", priority: 0.9, alternates: withLanguages(`${baseUrl}/artists`) },
    { url: `${baseUrl}/releases`, lastModified: latestReleaseDate, changeFrequency: "weekly", priority: 0.9, alternates: withLanguages(`${baseUrl}/releases`) },
    { url: `${baseUrl}/news`, lastModified: latestNewsDate, changeFrequency: "weekly", priority: 0.8, alternates: withLanguages(`${baseUrl}/news`) },
    { url: `${baseUrl}/tour`, lastModified: "2026-03-16", changeFrequency: "weekly", priority: 0.8, alternates: withLanguages(`${baseUrl}/tour`) },
    { url: `${baseUrl}/merch`, lastModified: "2026-03-16", changeFrequency: "monthly", priority: 0.7, alternates: withLanguages(`${baseUrl}/merch`) },
    { url: `${baseUrl}/events`, lastModified: "2026-03-16", changeFrequency: "weekly", priority: 0.7, alternates: withLanguages(`${baseUrl}/events`) },
    { url: `${baseUrl}/about`, lastModified: "2026-03-16", changeFrequency: "monthly", priority: 0.7, alternates: withLanguages(`${baseUrl}/about`) },
    { url: `${baseUrl}/contact`, lastModified: "2026-03-16", changeFrequency: "yearly", priority: 0.6, alternates: withLanguages(`${baseUrl}/contact`) },
    { url: `${baseUrl}/demos`, lastModified: "2026-03-16", changeFrequency: "monthly", priority: 0.6, alternates: withLanguages(`${baseUrl}/demos`) },
  ];

  const artistPages: MetadataRoute.Sitemap = artists.map((artist) => {
    const url = `${baseUrl}/artists/${artist.slug}`;
    return {
      url,
      lastModified: releases.find((r) => r.artistSlugs.includes(artist.slug))?.date ?? "2026-03-16",
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: withLanguages(url),
    };
  });

  const releasePages: MetadataRoute.Sitemap = releases.map((release) => {
    const url = `${baseUrl}/releases/${release.slug}`;
    return {
      url,
      lastModified: release.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: withLanguages(url),
    };
  });

  const newsPages: MetadataRoute.Sitemap = newsPosts.map((post) => {
    const url = `${baseUrl}/news/${post.slug}`;
    return {
      url,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.5,
      alternates: withLanguages(url),
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
            alternates: withLanguages(url),
          });
        }
      }
    }
  }

  return [...staticPages, ...artistPages, ...releasePages, ...trackPages, ...newsPages];
}
