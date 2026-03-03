import type { MetadataRoute } from "next";

// Known Spotify artist IDs for label roster (for dynamic sitemap generation)
const rosterArtistIds = [
  "4mH71Zjiq36Q3SI7IZIBQK", // Ebstar
  "1p2dSqAtCIaa0WlDB07qlC", // CJ Melzy
  "2hMqklMYzGACbEAwgSDHGp", // ESØTËRIX
  "6T0KqCO2bNDeSIFLpqnA5X", // KARLOST
  "5Y0La8bEi1Fw0ZrRXxKf6S", // Loxion TXI
  "7gRK9sMFL8kp6m2W51VYhI", // Makhathini
  "34PdMKvZSzzLKcHSBrjh3Z", // PieceMaker
  "3KQQVGnNMJkUINfSMbliXx", // RATSBE
  "6QPTDRlSTKXrh9JMXuoEqe", // SkyDAWN
  "5dBIFLPEsBVAuAfKWaOmYS", // Swedish Dance Glory
  "75iwMKINOSQfQJHkYVkIlZ", // ThatGirlVee
  "3rYLLfiGp6TaeLiYoEHU7j", // Tribal Muziq
  "3YuAG3E9WBMOGNBIjMBSbE", // illversemusic
  "7s6RyGFiUnSj6lhoMFqYdF", // retr0
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ebstar.co";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: "2026-03-03", changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/music`, lastModified: "2026-03-01", changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: "2026-03-03", changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/ai`, lastModified: "2026-02-01", changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/label`, lastModified: "2026-03-03", changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/macro-influencer`, lastModified: "2026-02-01", changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/tour`, lastModified: "2026-03-03", changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: "2026-01-01", changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/merch`, lastModified: "2026-01-01", changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/links`, lastModified: "2026-02-01", changeFrequency: "monthly", priority: 0.4 },
  ];

  const artistPages: MetadataRoute.Sitemap = rosterArtistIds.map((id) => ({
    url: `${baseUrl}/label/${id}`,
    lastModified: "2026-03-01",
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...artistPages];
}
