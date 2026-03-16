import type { MetadataRoute } from "next";
import { artists } from "@/data/artists";
import { releases } from "@/data/releases";
import { newsPosts } from "@/data/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://esotericones.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: "2026-03-16", changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/artists`, lastModified: "2026-03-16", changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/releases`, lastModified: "2026-03-16", changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/news`, lastModified: "2026-03-16", changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/events`, lastModified: "2026-03-16", changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: "2026-03-16", changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: "2026-03-16", changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/demos`, lastModified: "2026-03-16", changeFrequency: "monthly", priority: 0.6 },
  ];

  const artistPages: MetadataRoute.Sitemap = artists.map((artist) => ({
    url: `${baseUrl}/artists/${artist.slug}`,
    lastModified: "2026-03-16",
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const releasePages: MetadataRoute.Sitemap = releases.map((release) => ({
    url: `${baseUrl}/releases/${release.slug}`,
    lastModified: "2026-03-16",
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const newsPages: MetadataRoute.Sitemap = newsPosts.map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...artistPages, ...releasePages, ...newsPages];
}
