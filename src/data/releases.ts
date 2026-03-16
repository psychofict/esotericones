export interface Release {
  slug: string;
  title: string;
  type: "album" | "ep" | "single";
  artistSlugs: string[];
  artistNames: string[];
  date: string;
  year: number;
  genres: string[];
  spotifyId: string;
  spotifyUri: string;
  artwork?: string;
  tracklist?: { number: number; title: string; duration?: string; feat?: string }[];
  credits?: { role: string; name: string }[];
  featured: boolean;
}

export const releases: Release[] = [
  {
    slug: "kuzokhanya",
    title: "KUZOKHANYA",
    type: "single",
    artistSlugs: ["ebstar"],
    artistNames: ["Ebstar", "Roline"],
    date: "2025-01-01",
    year: 2025,
    genres: ["Piano House", "Amapiano"],
    spotifyId: "52rTZtmbEp1VNsj44ttuLO",
    spotifyUri: "album/52rTZtmbEp1VNsj44ttuLO",
    tracklist: [{ number: 1, title: "KUZOKHANYA", feat: "Roline" }],
    credits: [{ role: "Producer", name: "Ebstar" }],
    featured: true,
  },
  {
    slug: "ready-to-be-loved",
    title: "READY TO BE LOVED",
    type: "single",
    artistSlugs: ["ebstar"],
    artistNames: ["Ebstar"],
    date: "2025-01-01",
    year: 2025,
    genres: ["Dance-Pop", "Piano House"],
    spotifyId: "0wNJNjxA7Bmj0i7CaaU40v",
    spotifyUri: "album/0wNJNjxA7Bmj0i7CaaU40v",
    tracklist: [{ number: 1, title: "READY TO BE LOVED" }],
    credits: [{ role: "Producer", name: "Ebstar" }],
    featured: true,
  },
  {
    slug: "adiwele",
    title: "Adiwele",
    type: "single",
    artistSlugs: ["ebstar"],
    artistNames: ["Ebstar", "Trigger Mufasa", "GillianBlxck"],
    date: "2024-01-01",
    year: 2024,
    genres: ["Amapiano", "Afrobeats"],
    spotifyId: "00G4NYB9lLESY72agcsGI8",
    spotifyUri: "album/00G4NYB9lLESY72agcsGI8",
    tracklist: [{ number: 1, title: "Adiwele", feat: "Trigger Mufasa & GillianBlxck" }],
    credits: [{ role: "Producer", name: "Ebstar" }],
    featured: false,
  },
  {
    slug: "washa",
    title: "Washa!",
    type: "single",
    artistSlugs: ["ebstar"],
    artistNames: ["Ebstar", "Trigger Mufasa", "GillianBlxck"],
    date: "2024-01-01",
    year: 2024,
    genres: ["Amapiano", "Afrobeats"],
    spotifyId: "2gzxkTytiDrjD5ORYw4Cge",
    spotifyUri: "album/2gzxkTytiDrjD5ORYw4Cge",
    tracklist: [{ number: 1, title: "Washa!", feat: "Trigger Mufasa & GillianBlxck" }],
    credits: [{ role: "Producer", name: "Ebstar" }],
    featured: false,
  },
  {
    slug: "coming-back-for-more",
    title: "COMING BACK FOR MORE",
    type: "single",
    artistSlugs: ["ebstar"],
    artistNames: ["Ebstar"],
    date: "2024-01-01",
    year: 2024,
    genres: ["Dance-Pop", "Piano House"],
    spotifyId: "26kkRdv0k9ueKLRdFV0G5C",
    spotifyUri: "album/26kkRdv0k9ueKLRdFV0G5C",
    tracklist: [{ number: 1, title: "COMING BACK FOR MORE" }],
    credits: [{ role: "Producer", name: "Ebstar" }],
    featured: false,
  },
  {
    slug: "falling-for-love",
    title: "Falling For Love",
    type: "single",
    artistSlugs: ["ebstar"],
    artistNames: ["Ebstar"],
    date: "2024-01-01",
    year: 2024,
    genres: ["Deep House", "Dance-Pop"],
    spotifyId: "0rQQDhkaGOmqxMxt1H01ce",
    spotifyUri: "album/0rQQDhkaGOmqxMxt1H01ce",
    tracklist: [{ number: 1, title: "Falling For Love" }],
    credits: [{ role: "Producer", name: "Ebstar" }],
    featured: false,
  },
  {
    slug: "together-forever",
    title: "Together Forever",
    type: "single",
    artistSlugs: ["ebstar"],
    artistNames: ["Ebstar"],
    date: "2024-01-01",
    year: 2024,
    genres: ["Piano House", "Pop"],
    spotifyId: "5IY2JwPR00FAwgaKL0Vx6S",
    spotifyUri: "album/5IY2JwPR00FAwgaKL0Vx6S",
    tracklist: [{ number: 1, title: "Together Forever" }],
    credits: [{ role: "Producer", name: "Ebstar" }],
    featured: false,
  },
  {
    slug: "hard-times-dont-last",
    title: "Hard Times Don't Last",
    type: "single",
    artistSlugs: ["ebstar"],
    artistNames: ["Ebstar"],
    date: "2024-01-01",
    year: 2024,
    genres: ["Future Bass", "Pop"],
    spotifyId: "6LR1hNRJA58fRUkqjU5O9d",
    spotifyUri: "album/6LR1hNRJA58fRUkqjU5O9d",
    tracklist: [{ number: 1, title: "Hard Times Don't Last" }],
    credits: [{ role: "Producer", name: "Ebstar" }],
    featured: false,
  },
  {
    slug: "but-i-dont-trust-you",
    title: "But....I DONT TRUST YOU",
    type: "single",
    artistSlugs: ["ebstar"],
    artistNames: ["Ebstar"],
    date: "2024-01-01",
    year: 2024,
    genres: ["Dance-Pop", "Electronic"],
    spotifyId: "4aGgNPSee77X9YdiI2szus",
    spotifyUri: "album/4aGgNPSee77X9YdiI2szus",
    tracklist: [{ number: 1, title: "But....I DONT TRUST YOU" }],
    credits: [{ role: "Producer", name: "Ebstar" }],
    featured: false,
  },
  {
    slug: "lokshin",
    title: "LOKSHIN",
    type: "single",
    artistSlugs: ["ebstar"],
    artistNames: ["Ebstar", "Trigger Mufasa", "GillianBlxck"],
    date: "2024-01-01",
    year: 2024,
    genres: ["Amapiano", "Hip-Hop"],
    spotifyId: "255lmSBIPAgJWxXB44fQlN",
    spotifyUri: "album/255lmSBIPAgJWxXB44fQlN",
    tracklist: [{ number: 1, title: "LOKSHIN", feat: "Trigger Mufasa & GillianBlxck" }],
    credits: [{ role: "Producer", name: "Ebstar" }],
    featured: false,
  },
  {
    slug: "echoes-of-love",
    title: "ECHOES OF LOVE I (Deluxe Version)",
    type: "album",
    artistSlugs: ["ebstar"],
    artistNames: ["Ebstar"],
    date: "2024-01-01",
    year: 2024,
    genres: ["Piano House", "Dance-Pop", "Deep House"],
    spotifyId: "6lJzDeHVkGbsLAYG5SohwR",
    spotifyUri: "album/6lJzDeHVkGbsLAYG5SohwR",
    credits: [{ role: "Producer", name: "Ebstar" }],
    featured: true,
  },
  {
    slug: "maknaebe",
    title: "Maknaebe (Deluxe Version)",
    type: "album",
    artistSlugs: ["ebstar", "ratsbe"],
    artistNames: ["Ebstar", "RATSBE"],
    date: "2024-01-01",
    year: 2024,
    genres: ["Hip-Hop", "R&B", "Amapiano"],
    spotifyId: "4xa01k8vEIqumeDMHegoP2",
    spotifyUri: "album/4xa01k8vEIqumeDMHegoP2",
    credits: [
      { role: "Producer", name: "Ebstar" },
      { role: "Producer", name: "RATSBE" },
    ],
    featured: true,
  },
  {
    slug: "life-is-beautiful",
    title: "Life Is Beautiful",
    type: "album",
    artistSlugs: ["ebstar"],
    artistNames: ["Ebstar"],
    date: "2022-01-01",
    year: 2022,
    genres: ["Piano House", "Dance-Pop", "Progressive House"],
    spotifyId: "3ZHNSXWQZJ31leN1hYl4Un",
    spotifyUri: "album/3ZHNSXWQZJ31leN1hYl4Un",
    credits: [{ role: "Producer", name: "Ebstar" }],
    featured: false,
  },
  {
    slug: "with-love-ebstar",
    title: "With Love, Ebstar :)",
    type: "ep",
    artistSlugs: ["ebstar"],
    artistNames: ["Ebstar"],
    date: "2023-01-01",
    year: 2023,
    genres: ["Piano House", "Dance-Pop"],
    spotifyId: "75iwN0MtpZoBmneKAUZiUF",
    spotifyUri: "album/75iwN0MtpZoBmneKAUZiUF",
    credits: [{ role: "Producer", name: "Ebstar" }],
    featured: false,
  },
  {
    slug: "crush-on-you-remixes",
    title: "I Have a Crush on You (2 Year Anniversary Deluxe) [Remixes]",
    type: "ep",
    artistSlugs: ["ebstar"],
    artistNames: ["Ebstar"],
    date: "2023-01-01",
    year: 2023,
    genres: ["Dance-Pop", "Deep House"],
    spotifyId: "0ul67kwpuIXPukQJ7SMgiR",
    spotifyUri: "album/0ul67kwpuIXPukQJ7SMgiR",
    credits: [{ role: "Producer", name: "Ebstar" }],
    featured: false,
  },
  {
    slug: "aint-here-for-your-drama",
    title: "Ain't Here for Your Drama",
    type: "single",
    artistSlugs: ["ebstar"],
    artistNames: ["Ebstar"],
    date: "2022-01-01",
    year: 2022,
    genres: ["Dance-Pop", "Pop"],
    spotifyId: "7cT1ssadNbVbzV23KgDQKW",
    spotifyUri: "album/7cT1ssadNbVbzV23KgDQKW",
    credits: [{ role: "Producer", name: "Ebstar" }],
    featured: false,
  },
];

export function getReleaseBySlug(slug: string): Release | undefined {
  return releases.find((r) => r.slug === slug);
}

export function getFeaturedReleases(): Release[] {
  return releases.filter((r) => r.featured);
}

export function getReleasesByArtist(artistSlug: string): Release[] {
  return releases.filter((r) => r.artistSlugs.includes(artistSlug));
}

export function getAllReleaseYears(): number[] {
  return [...new Set(releases.map((r) => r.year))].sort((a, b) => b - a);
}

export function getAllReleaseGenres(): string[] {
  const genres = new Set<string>();
  releases.forEach((r) => r.genres.forEach((g) => genres.add(g)));
  return Array.from(genres).sort();
}
