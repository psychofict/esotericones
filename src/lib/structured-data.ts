export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ebstar",
    alternateName: "Ebenezer Tarubinga",
    url: "https://ebstar.com",
    image: "https://ebstar.com/images/ebstar-avatar.svg",
    sameAs: [
      "https://open.spotify.com/artist/4mH71Zjiq36Q3SI7IZIBQK",
      "https://music.apple.com/us/artist/ebstar/1518342850",
      "https://instagram.com/ebstarmusic",
      "https://twitter.com/psychofict",
      "https://facebook.com/ebstar.simz",
      "https://soundcloud.com/ebstarsimz",
      "https://www.imdb.com/name/nm14467036/",
      "https://en.wikipedia.org/wiki/Ebstar",
    ],
    jobTitle: ["Music Producer", "AI Research Engineer", "Brand Influencer"],
    nationality: "Zimbabwean",
  };
}

export function getMusicGroupSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "Ebstar",
    url: "https://ebstar.com",
    genre: ["Piano House", "Dance-Pop", "Deep House", "Progressive House", "Future Bass", "Amapiano", "Pop", "Big Room", "Hip-Hop"],
    sameAs: [
      "https://open.spotify.com/artist/4mH71Zjiq36Q3SI7IZIBQK",
      "https://music.apple.com/us/artist/ebstar/1518342850",
    ],
    member: {
      "@type": "Person",
      name: "Ebenezer Tarubinga",
    },
  };
}

export function getMusicAlbumSchema(album: { title: string; year: number; tracks?: number }) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    name: album.title,
    datePublished: `${album.year}`,
    byArtist: { "@type": "MusicGroup", name: "Ebstar" },
    numTracks: album.tracks,
    albumProductionType: "StudioAlbum",
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EBSTAR",
    url: "https://ebstar.com",
    description: "Official website of Ebstar — South Korea-based Zimbabwean music producer, AI research engineer, brand influencer, and record label founder.",
    author: { "@type": "Person", name: "Ebstar" },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
