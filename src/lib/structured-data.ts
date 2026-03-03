export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://ebstar.co/#person",
    name: "Ebstar",
    alternateName: ["Ebenezer Tarubinga", "엡스타", "Ebenezer Simbarashe Tarubinga"],
    givenName: "Ebenezer",
    familyName: "Tarubinga",
    additionalName: "Simbarashe",
    url: "https://ebstar.co",
    image: {
      "@type": "ImageObject",
      url: "https://ebstar.co/images/og-image.jpg",
      width: 1200,
      height: 630,
      caption: "Ebstar — Music Producer, AI Engineer & Macro Influencer",
    },
    description:
      "Ebstar (Ebenezer Tarubinga) is a Zimbabwean-born, Seoul-based music producer, AI/ML research engineer, macro influencer, and founder of The ESØTËRIC Ones record label. 5M+ streams, published AI researcher at Korea University, and one of South Korea's most recognized foreign public figures.",
    birthDate: "2001-11-29",
    birthPlace: {
      "@type": "Place",
      name: "Bulawayo, Zimbabwe",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bulawayo",
        addressCountry: "ZW",
      },
    },
    nationality: {
      "@type": "Country",
      name: "Zimbabwe",
    },
    homeLocation: {
      "@type": "Place",
      name: "Seoul, South Korea",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Seoul",
        addressCountry: "KR",
      },
    },
    sameAs: [
      "https://open.spotify.com/artist/4mH71Zjiq36Q3SI7IZIBQK",
      "https://music.apple.com/us/artist/ebstar/1518342850",
      "https://www.instagram.com/ebstarmusic",
      "https://twitter.com/psychofict",
      "https://www.facebook.com/ebstar.simz",
      "https://soundcloud.com/ebstarsimz",
      "https://www.imdb.com/name/nm14467036/",
      "https://en.wikipedia.org/wiki/Ebstar",
      "https://www.linkedin.com/in/ebstar",
      "https://scholar.google.com/citations?user=W818y-gAAAAJ",
      "https://github.com/psychofict",
      "https://www.beatport.com/artist/ebstar/1011858",
      "https://www.shazam.com/artist/ebstar/1518342850",
      "https://search.naver.com/search.naver?query=ebstar&pkid=1&os=35201638",
    ],
    jobTitle: ["Music Producer", "AI/ML Research Engineer", "Macro Influencer", "Record Label Founder"],
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Music Producer",
        occupationLocation: { "@type": "Place", name: "Seoul, South Korea" },
        description: "Electronic music producer with 5M+ streams across piano house, dance-pop, and Amapiano.",
      },
      {
        "@type": "Occupation",
        name: "AI Research Engineer",
        occupationLocation: { "@type": "Place", name: "Seoul, South Korea" },
        description: "Computer vision and deep learning researcher specializing in semantic segmentation.",
      },
      {
        "@type": "Occupation",
        name: "Macro Influencer",
        occupationLocation: { "@type": "Place", name: "Seoul, South Korea" },
        description: "One of South Korea's most recognized foreign influencers with 150K+ followers and 50+ brand partnerships.",
      },
    ],
    worksFor: [
      {
        "@type": "Organization",
        "@id": "https://ebstar.co/#label",
        name: "The ESØTËRIC Ones",
        url: "https://ebstar.co/label",
      },
      {
        "@type": "Organization",
        name: "Gractor",
        description: "AI/ML company building smart city solutions",
      },
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Korea University",
      url: "https://www.korea.ac.kr",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Seoul",
        addressCountry: "KR",
      },
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      educationalLevel: "Master of Science",
      name: "MSc in Artificial Intelligence",
      recognizedBy: {
        "@type": "CollegeOrUniversity",
        name: "Korea University",
      },
    },
    award: [
      "Forbes BLK Member (2024)",
      "GINCON Committee Member — South Korea National Assembly (2025)",
      "#290 SkioMusic World Producer Chart (2023)",
      "Seoul Tourism Organisation Global SeoulMates (2023–2025)",
      "Korea Ministry of Foreign Affairs Korea Allimi (2023)",
    ],
    memberOf: [
      {
        "@type": "Organization",
        name: "GINCON",
        description: "Committee of the South Korea National Assembly",
      },
      {
        "@type": "Organization",
        name: "Seoul Tourism Organisation",
        roleName: "Global SeoulMates",
      },
      {
        "@type": "Organization",
        name: "Forbes BLK",
      },
    ],
    knowsAbout: [
      "Music Production",
      "Computer Vision",
      "Semantic Segmentation",
      "Deep Learning",
      "Artificial Intelligence",
      "Influencer Marketing",
      "Record Label Management",
    ],
    knowsLanguage: [
      { "@type": "Language", name: "English", alternateName: "en" },
      { "@type": "Language", name: "Korean", alternateName: "ko" },
    ],
    gender: "Male",
    performerIn: [
      { "@type": "Event", name: "Korea-Africa Summit", startDate: "2024", location: { "@type": "Place", name: "Seoul, South Korea" } },
      { "@type": "Event", name: "Korea Blockchain Week", startDate: "2024", location: { "@type": "Place", name: "Seoul, South Korea" } },
      { "@type": "Event", name: "Korea Fashion Week", startDate: "2024", location: { "@type": "Place", name: "Seoul, South Korea" } },
      { "@type": "Event", name: "Seoul Africa Festival", startDate: "2025", location: { "@type": "Place", name: "Seoul, South Korea" } },
      { "@type": "Event", name: "GINCON National Assembly Ceremony", startDate: "2025", location: { "@type": "Place", name: "Seoul, South Korea" } },
    ],
  };
}

export function getMusicGroupSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "@id": "https://ebstar.co/#musicgroup",
    name: "Ebstar",
    alternateName: "엡스타",
    url: "https://ebstar.co/music",
    image: "https://ebstar.co/images/og-image.jpg",
    description:
      "Seoul-based music producer with 5M+ streams across piano house, dance-pop, and Amapiano. Known for hits like 'After The Storm, You'll See The Sun' and 'Seoul Love'.",
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
      "https://www.beatport.com/artist/ebstar/1011858",
      "https://search.naver.com/search.naver?query=ebstar&pkid=1&os=35201638",
    ],
    member: {
      "@type": "Person",
      "@id": "https://ebstar.co/#person",
      name: "Ebenezer Tarubinga",
    },
    foundingDate: "2020",
    foundingLocation: {
      "@type": "Place",
      name: "Seoul, South Korea",
    },
    album: [
      { "@type": "MusicAlbum", name: "Life Is Beautiful", datePublished: "2022", url: "https://open.spotify.com/album/3ZHNSXWQZJ31leN1hYl4Un", numTracks: 10 },
      { "@type": "MusicAlbum", name: "With Love, Ebstar :)", datePublished: "2023", url: "https://open.spotify.com/album/75iwN0MtpZoBmneKAUZiUF" },
      { "@type": "MusicAlbum", name: "ECHOES OF LOVE I (Deluxe Version)", datePublished: "2024", url: "https://open.spotify.com/album/6lJzDeHVkGbsLAYG5SohwR" },
      { "@type": "MusicAlbum", name: "Maknaebe (Deluxe Version)", datePublished: "2024", url: "https://open.spotify.com/album/4xa01k8vEIqumeDMHegoP2", numTracks: 23 },
    ],
    track: [
      { "@type": "MusicRecording", name: "After The Storm, You'll See The Sun", url: "https://open.spotify.com/track/1o1Aqx9YlgfWkn0xuEhTLJ" },
      { "@type": "MusicRecording", name: "Seoul Love", url: "https://open.spotify.com/track/4O4NYJVGHNGKAIuiUHavlP" },
      { "@type": "MusicRecording", name: "COMING BACK FOR MORE", url: "https://open.spotify.com/track/7HCJa4MeuAT14CsX6BxulP" },
    ],
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: { "@type": "ListenAction" },
      userInteractionCount: "5000000",
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
    "@id": "https://ebstar.co/#website",
    name: "EBSTAR",
    alternateName: "엡스타",
    url: "https://ebstar.co",
    description:
      "Official website of Ebstar — Seoul-based music producer, AI/ML engineer, macro influencer, and record label founder.",
    publisher: { "@type": "Person", "@id": "https://ebstar.co/#person" },
    inLanguage: ["en", "ko"],
    potentialAction: {
      "@type": "SearchAction",
      target: "https://ebstar.co/music?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

export function getSiteNavigationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Site Navigation",
    itemListElement: [
      { "@type": "SiteNavigationElement", position: 1, name: "Music", url: "https://ebstar.co/music" },
      { "@type": "SiteNavigationElement", position: 2, name: "Record Label", url: "https://ebstar.co/label" },
      { "@type": "SiteNavigationElement", position: 3, name: "AI/ML Engineer", url: "https://ebstar.co/ai" },
      { "@type": "SiteNavigationElement", position: 4, name: "Macro Influencer", url: "https://ebstar.co/macro-influencer" },
      { "@type": "SiteNavigationElement", position: 5, name: "About", url: "https://ebstar.co/about" },
      { "@type": "SiteNavigationElement", position: 6, name: "Tour", url: "https://ebstar.co/tour" },
      { "@type": "SiteNavigationElement", position: 7, name: "Contact", url: "https://ebstar.co/contact" },
    ],
  };
}

export function getMusicRecordingSchema(track: {
  title: string;
  source: string;
  spotifyUrl: string;
  streams?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    name: track.title,
    url: track.spotifyUrl,
    inAlbum: {
      "@type": "MusicAlbum",
      name: track.source,
    },
    byArtist: {
      "@type": "MusicGroup",
      name: "Ebstar",
      url: "https://ebstar.co",
    },
    ...(track.streams
      ? {
          interactionStatistic: {
            "@type": "InteractionCounter",
            interactionType: { "@type": "ListenAction" },
            userInteractionCount: track.streams.replace(/,/g, ""),
          },
        }
      : {}),
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
    "@id": "https://ebstar.co/#label",
    name: "The ESØTËRIC Ones",
    alternateName: ["The Esoteric Ones Records", "The Esoteric Ones", "ESØTËRIC Ones"],
    url: "https://ebstar.co/label",
    logo: {
      "@type": "ImageObject",
      url: "https://ebstar.co/images/brands/the-esoteric-ones.jpg",
      caption: "The ESØTËRIC Ones — Independent Record Label",
    },
    foundingDate: "2023",
    foundingLocation: {
      "@type": "Place",
      name: "Seoul, South Korea",
    },
    founder: {
      "@type": "Person",
      "@id": "https://ebstar.co/#person",
      name: "Ebstar",
      url: "https://ebstar.co",
    },
    description:
      "International independent record label founded in Seoul by Ebstar. 15+ artists from 6 countries, 30+ singles, and 2M+ streams.",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 15,
      unitText: "artists",
    },
    sameAs: [
      "https://open.spotify.com/artist/4mH71Zjiq36Q3SI7IZIBQK",
    ],
  };
}
