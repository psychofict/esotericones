export interface Artist {
  slug: string;
  name: string;
  spotifyId: string;
  bio: string;
  shortBio: string;
  image?: string;
  genres: string[];
  country: string;
  socials?: { platform: string; url: string }[];
  joinedYear: number;
  featured: boolean;
}

export const artists: Artist[] = [
  {
    slug: "ebstar",
    name: "Ebstar",
    spotifyId: "4mH71Zjiq36Q3SI7IZIBQK",
    bio: "Label founder and Seoul-based producer with 5M+ streams across piano house, dance-pop, Amapiano, and more. MSc AI from Korea University. Known for emotionally charged dance music that bridges African and Asian sounds.",
    shortBio: "Label founder. 5M+ streams. Piano house & dance-pop.",
    genres: ["Piano House", "Dance-Pop", "Amapiano"],
    country: "Zimbabwe",
    socials: [
      { platform: "Spotify", url: "https://open.spotify.com/artist/4mH71Zjiq36Q3SI7IZIBQK" },
      { platform: "Instagram", url: "https://instagram.com/ebstarmusic" },
    ],
    joinedYear: 2023,
    featured: true,
  },
  {
    slug: "cj-melzy",
    name: "CJ Melzy",
    spotifyId: "1p2dSqAtCIaa0WlDB07qlC",
    bio: "Versatile producer and vocalist bringing melodic hip-hop and R&B to the label's roster.",
    shortBio: "Melodic hip-hop & R&B.",
    genres: ["Hip-Hop", "R&B"],
    country: "South Africa",
    joinedYear: 2023,
    featured: false,
  },
  {
    slug: "esoterix",
    name: "ES\u00D8T\u00CBRIX",
    spotifyId: "2hMqklMYzGACbEAwgSDHGp",
    bio: "The label's experimental electronic alias, pushing boundaries with glitchy, atmospheric soundscapes.",
    shortBio: "Experimental electronic & ambient.",
    genres: ["Electronic", "Ambient"],
    country: "South Korea",
    joinedYear: 2023,
    featured: false,
  },
  {
    slug: "karlost",
    name: "KARLOST",
    spotifyId: "6T0KqCO2bNDeSIFLpqnA5X",
    bio: "High-energy electronic producer delivering euphoric drops and festival-ready anthems.",
    shortBio: "Euphoric electronic & big room.",
    genres: ["Big Room", "Electronic"],
    country: "South Korea",
    joinedYear: 2023,
    featured: false,
  },
  {
    slug: "loxion-txi",
    name: "Loxion TXI",
    spotifyId: "5Y0La8bEi1Fw0ZrRXxKf6S",
    bio: "Amapiano specialist blending South African rhythms with international dance music sensibilities.",
    shortBio: "Amapiano & South African dance.",
    genres: ["Amapiano", "Afrobeats"],
    country: "South Africa",
    joinedYear: 2024,
    featured: true,
  },
  {
    slug: "makhathini",
    name: "Makhathini",
    spotifyId: "7gRK9sMFL8kp6m2W51VYhI",
    bio: "Deep house and Afro-tech producer creating hypnotic grooves rooted in African heritage.",
    shortBio: "Deep house & Afro-tech.",
    genres: ["Deep House", "Afrobeats"],
    country: "South Africa",
    joinedYear: 2024,
    featured: false,
  },
  {
    slug: "mfanakithi",
    name: "Mfanakithi",
    spotifyId: "",
    bio: "Emerging talent bringing fresh perspectives to the Amapiano and hip-hop scenes.",
    shortBio: "Amapiano & hip-hop.",
    genres: ["Amapiano", "Hip-Hop"],
    country: "South Africa",
    joinedYear: 2024,
    featured: false,
  },
  {
    slug: "piecemaker",
    name: "PieceMaker",
    spotifyId: "34PdMKvZSzzLKcHSBrjh3Z",
    bio: "Innovative beat-maker and producer stitching together eclectic sounds into cohesive, genre-bending tracks.",
    shortBio: "Eclectic beats & genre-bending.",
    genres: ["Hip-Hop", "Electronic"],
    country: "Zimbabwe",
    joinedYear: 2023,
    featured: false,
  },
  {
    slug: "postythegod",
    name: "Postythegod",
    spotifyId: "",
    bio: "Rapper and vocalist with a commanding presence and introspective lyricism.",
    shortBio: "Hip-hop & rap.",
    genres: ["Hip-Hop", "Rap"],
    country: "Zimbabwe",
    joinedYear: 2024,
    featured: false,
  },
  {
    slug: "ratsbe",
    name: "RATSBE",
    spotifyId: "3KQQVGnNMJkUINfSMbliXx",
    bio: "Co-producer of the acclaimed Maknaebe album. Genre-fluid artist blending hip-hop, R&B, and electronic music.",
    shortBio: "Hip-hop, R&B & electronic. Co-creator of Maknaebe.",
    genres: ["Hip-Hop", "R&B", "Electronic"],
    country: "South Africa",
    joinedYear: 2023,
    featured: true,
  },
  {
    slug: "regina-ashie",
    name: "Regina Ashie",
    spotifyId: "",
    bio: "Soulful vocalist bringing Afrobeats and R&B flavors to the roster.",
    shortBio: "Afrobeats & R&B vocalist.",
    genres: ["Afrobeats", "R&B"],
    country: "Ghana",
    joinedYear: 2024,
    featured: false,
  },
  {
    slug: "skydawn",
    name: "SkyDAWN",
    spotifyId: "6QPTDRlSTKXrh9JMXuoEqe",
    bio: "Progressive house and trance producer crafting epic, uplifting soundscapes.",
    shortBio: "Progressive house & trance.",
    genres: ["Progressive House", "Trance"],
    country: "South Korea",
    joinedYear: 2023,
    featured: false,
  },
  {
    slug: "swedish-dance-glory",
    name: "Swedish Dance Glory",
    spotifyId: "5dBIFLPEsBVAuAfKWaOmYS",
    bio: "Scandinavian dance-pop project delivering catchy hooks and euphoric melodies.",
    shortBio: "Scandinavian dance-pop & EDM.",
    genres: ["Dance-Pop", "EDM"],
    country: "Sweden",
    joinedYear: 2023,
    featured: false,
  },
  {
    slug: "team-g",
    name: "Team G",
    spotifyId: "",
    bio: "Collaborative music collective fusing diverse genres and cultural influences.",
    shortBio: "Genre-fusing collective.",
    genres: ["Pop", "Hip-Hop"],
    country: "Zimbabwe",
    joinedYear: 2024,
    featured: false,
  },
  {
    slug: "thatgirlvee",
    name: "ThatGirlVee",
    spotifyId: "75iwMKINOSQfQJHkYVkIlZ",
    bio: "Pop and R&B vocalist with a distinctive voice and empowering lyrics.",
    shortBio: "Pop & R&B vocalist.",
    genres: ["Pop", "R&B"],
    country: "South Africa",
    joinedYear: 2024,
    featured: false,
  },
  {
    slug: "tribal-muziq",
    name: "Tribal Muziq",
    spotifyId: "3rYLLfiGp6TaeLiYoEHU7j",
    bio: "Tribal house and Afro-tech duo channeling ancestral rhythms through modern electronic production.",
    shortBio: "Tribal house & Afro-tech.",
    genres: ["Deep House", "Afrobeats"],
    country: "South Africa",
    joinedYear: 2024,
    featured: false,
  },
  {
    slug: "illversemusic",
    name: "illversemusic",
    spotifyId: "3YuAG3E9WBMOGNBIjMBSbE",
    bio: "Eclectic producer exploring the intersection of hip-hop, electronic, and experimental music.",
    shortBio: "Experimental hip-hop & electronic.",
    genres: ["Hip-Hop", "Electronic"],
    country: "South Africa",
    joinedYear: 2024,
    featured: false,
  },
  {
    slug: "retr0",
    name: "retr0",
    spotifyId: "7s6RyGFiUnSj6lhoMFqYdF",
    bio: "Retro-futuristic producer blending synthwave aesthetics with modern dance music production.",
    shortBio: "Synthwave & modern dance.",
    genres: ["Electronic", "Dance-Pop"],
    country: "South Korea",
    joinedYear: 2023,
    featured: false,
  },
];

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

export function getFeaturedArtists(): Artist[] {
  return artists.filter((a) => a.featured);
}

export function getAllGenres(): string[] {
  const genres = new Set<string>();
  artists.forEach((a) => a.genres.forEach((g) => genres.add(g)));
  return Array.from(genres).sort();
}
