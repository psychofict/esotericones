export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ebstar",
    alternateName: ["Ebenezer Tarubinga", "엡스타"],
    url: "https://ebstar.co",
    image: "https://ebstar.co/images/og-image.jpg",
    sameAs: [
      "https://open.spotify.com/artist/4mH71Zjiq36Q3SI7IZIBQK",
      "https://music.apple.com/us/artist/ebstar/1518342850",
      "https://instagram.com/ebstarmusic",
      "https://twitter.com/psychofict",
      "https://facebook.com/ebstar.simz",
      "https://soundcloud.com/ebstarsimz",
      "https://www.imdb.com/name/nm14467036/",
      "https://en.wikipedia.org/wiki/Ebstar",
      "https://www.linkedin.com/in/ebstar",
      "https://search.naver.com/search.naver?query=ebstar&pkid=1&os=35201638",
    ],
    jobTitle: ["Music Producer", "AI/ML Research Engineer", "Macro Influencer"],
    worksFor: {
      "@type": "Organization",
      name: "The ESØTËRIC Ones",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Korea University",
    },
    knowsLanguage: ["en", "ko"],
    nationality: "Zimbabwean",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Seoul",
      addressCountry: "KR",
    },
  };
}

export function getMusicGroupSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "Ebstar",
    alternateName: "엡스타",
    url: "https://ebstar.co",
    image: "https://ebstar.co/images/og-image.jpg",
    description:
      "Seoul-based music producer with 5M+ streams across piano house, dance-pop, and Amapiano.",
    genre: [
      "Piano House",
      "Dance-Pop",
      "Deep House",
      "Progressive House",
      "Future Bass",
      "Amapiano",
      "Pop",
      "Big Room",
      "Hip-Hop",
    ],
    sameAs: [
      "https://open.spotify.com/artist/4mH71Zjiq36Q3SI7IZIBQK",
      "https://music.apple.com/us/artist/ebstar/1518342850",
      "https://soundcloud.com/ebstarsimz",
      "https://search.naver.com/search.naver?query=ebstar&pkid=1&os=35201638",
    ],
    member: {
      "@type": "Person",
      name: "Ebenezer Tarubinga",
    },
    foundingLocation: {
      "@type": "Place",
      name: "Seoul, South Korea",
    },
  };
}

export function getMusicAlbumSchema(album: {
  title: string;
  year: number;
  tracks?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    name: album.title,
    datePublished: `${album.year}`,
    byArtist: {
      "@type": "MusicGroup",
      name: "Ebstar",
      url: "https://ebstar.co",
    },
    numTracks: album.tracks,
    albumProductionType: "StudioAlbum",
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EBSTAR",
    alternateName: "엡스타",
    url: "https://ebstar.co",
    description:
      "Official website of Ebstar — Seoul-based music producer, AI/ML engineer, macro influencer, and record label founder.",
    author: { "@type": "Person", name: "Ebstar" },
    inLanguage: ["en", "ko"],
    potentialAction: {
      "@type": "SearchAction",
      target: "https://ebstar.co/music?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
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

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The ESØTËRIC Ones",
    alternateName: "The Esoteric Ones Records",
    url: "https://ebstar.co/label",
    logo: "https://ebstar.co/images/brands/the-esoteric-ones.jpg",
    foundingDate: "2023",
    founder: {
      "@type": "Person",
      name: "Ebstar",
      url: "https://ebstar.co",
    },
    description:
      "International independent record label founded in Seoul. 15+ artists from 6 countries.",
    sameAs: [
      "https://open.spotify.com/artist/4mH71Zjiq36Q3SI7IZIBQK",
    ],
  };
}
