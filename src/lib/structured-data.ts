import { artists } from "@/data/artists";
import { releases } from "@/data/releases";
import type { NewsPost } from "@/data/news";

const BASE_URL = "https://esotericones.com";

export function getRecordLabelSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#label`,
    name: "The ESOTERIC Ones",
    alternateName: ["The Esoteric Ones Records", "ESOTERIC Ones", "The ES\u00D8T\u00CBRIC Ones"],
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/label-logo.svg`,
      caption: "The ESOTERIC Ones \u2014 Record Label",
    },
    foundingDate: "2023",
    areaServed: [
      { "@type": "Country", name: "South Africa" },
      { "@type": "Country", name: "Zimbabwe" },
      { "@type": "Country", name: "South Korea" },
    ],
    founder: {
      "@type": "Person",
      name: "Ebstar",
      alternateName: "Ebenezer Tarubinga",
      url: `${BASE_URL}/artists/ebstar`,
    },
    description:
      "Global record label founded by Ebstar, operating across South Africa, Zimbabwe, and South Korea. 24+ artists from 6 countries, 5M+ streams across electronic, house, Amapiano, hip-hop, and pop.",
    knowsLanguage: ["en", "ko", "fr"],
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@esotericones.com",
      contactType: "customer service",
      availableLanguage: ["English", "Korean", "French"],
    },
    sameAs: [
      "https://open.spotify.com/artist/4mH71Zjiq36Q3SI7IZIBQK",
      "https://instagram.com/esotericones_",
      "https://twitter.com/esotericones",
      "https://soundcloud.com/esotericones",
      "https://youtube.com/@esotericones",
    ],
    member: artists.filter((a) => a.featured).map((a) => ({
      "@type": "Person",
      name: a.name,
      url: `${BASE_URL}/artists/${a.slug}`,
    })),
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: "The ESOTERIC Ones",
    url: BASE_URL,
    description:
      "Official website of The ESOTERIC Ones \u2014 global record label operating across South Africa, Zimbabwe, and South Korea.",
    publisher: { "@type": "Organization", "@id": `${BASE_URL}/#label` },
    inLanguage: ["en", "ko", "fr"],
  };
}

export function getSiteNavigationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Site Navigation",
    itemListElement: [
      { "@type": "SiteNavigationElement", position: 1, name: "Artists", url: `${BASE_URL}/artists` },
      { "@type": "SiteNavigationElement", position: 2, name: "Releases", url: `${BASE_URL}/releases` },
      { "@type": "SiteNavigationElement", position: 3, name: "News", url: `${BASE_URL}/news` },
      { "@type": "SiteNavigationElement", position: 4, name: "Events", url: `${BASE_URL}/events` },
      { "@type": "SiteNavigationElement", position: 5, name: "About", url: `${BASE_URL}/about` },
      { "@type": "SiteNavigationElement", position: 6, name: "Contact", url: `${BASE_URL}/contact` },
      { "@type": "SiteNavigationElement", position: 7, name: "Submit Demo", url: `${BASE_URL}/demos` },
    ],
  };
}

export function getArtistSchema(artistSlug: string) {
  const artist = artists.find((a) => a.slug === artistSlug);
  if (!artist) return null;

  const sameAs: string[] = [];
  if (artist.spotifyId) {
    sameAs.push(`https://open.spotify.com/artist/${artist.spotifyId}`);
  }
  if (artist.socials) {
    for (const social of artist.socials) {
      if (!sameAs.includes(social.url)) {
        sameAs.push(social.url);
      }
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: artist.name,
    url: `${BASE_URL}/artists/${artist.slug}`,
    ...(artist.image ? { image: `${BASE_URL}${artist.image}` } : {}),
    genre: artist.genres,
    description: artist.bio,
    foundingDate: String(artist.joinedYear),
    memberOf: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#label`,
      name: "The ESOTERIC Ones",
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function getReleaseSchema(releaseSlug: string) {
  const release = releases.find((r) => r.slug === releaseSlug);
  if (!release) return null;

  const albumReleaseType =
    release.type === "single" ? "SingleRelease" :
    release.type === "ep" ? "EPRelease" : "AlbumRelease";

  const byArtist = release.artistSlugs.map((slug, i) => {
    const artist = artists.find((a) => a.slug === slug);
    return {
      "@type": "MusicGroup" as const,
      name: release.artistNames[i],
      ...(artist ? { url: `${BASE_URL}/artists/${slug}` } : {}),
    };
  });

  const track = release.tracklist?.map((t) => ({
    "@type": "MusicRecording" as const,
    name: t.title,
    position: t.number,
    ...(t.duration ? { duration: parseDuration(t.duration) } : {}),
  }));

  return {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    name: release.title,
    url: `${BASE_URL}/releases/${release.slug}`,
    ...(release.artwork ? { image: `${BASE_URL}${release.artwork}` } : {}),
    datePublished: release.date,
    genre: release.genres,
    albumProductionType: "StudioAlbum",
    albumReleaseType,
    ...(release.tracklist ? { numTracks: release.tracklist.length } : {}),
    byArtist,
    ...(track && track.length > 0 ? { track: { "@type": "ItemList", itemListElement: track } } : {}),
    albumRelease: {
      "@type": "MusicRelease",
      musicReleaseFormat: "DigitalRelease",
      recordLabel: {
        "@type": "Organization",
        "@id": `${BASE_URL}/#label`,
        name: "The ESOTERIC Ones",
      },
    },
    sameAs: [`https://open.spotify.com/${release.spotifyUri}`],
    recordLabel: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#label`,
      name: "The ESOTERIC Ones",
    },
  };
}

export function getTrackSchema(releaseSlug: string, trackSlug: string) {
  const release = releases.find((r) => r.slug === releaseSlug);
  if (!release) return null;

  const track = release.tracklist?.find((t) => t.slug === trackSlug);
  if (!track) return null;

  const byArtist = release.artistSlugs.map((slug, i) => {
    const artist = artists.find((a) => a.slug === slug);
    return {
      "@type": "MusicGroup" as const,
      name: release.artistNames[i],
      ...(artist ? { url: `${BASE_URL}/artists/${slug}` } : {}),
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    name: track.title,
    url: `${BASE_URL}/releases/${releaseSlug}/${trackSlug}`,
    position: track.number,
    ...(track.duration ? { duration: parseDuration(track.duration) } : {}),
    ...(release.artwork ? { image: `${BASE_URL}${release.artwork}` } : {}),
    byArtist,
    inAlbum: {
      "@type": "MusicAlbum",
      name: release.title,
      url: `${BASE_URL}/releases/${releaseSlug}`,
    },
    recordLabel: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#label`,
      name: "The ESOTERIC Ones",
    },
  };
}

export function getNewsArticleSchema(post: NewsPost) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    url: `${BASE_URL}/news/${post.slug}`,
    ...(post.image ? { image: `${BASE_URL}${post.image}` } : {}),
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#label`,
      name: "The ESOTERIC Ones",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#label`,
      name: "The ESOTERIC Ones",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/label-logo.svg`,
      },
    },
    keywords: post.tags,
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

/** Convert "3:45" to ISO 8601 duration "PT3M45S" */
function parseDuration(dur: string): string {
  const parts = dur.split(":");
  if (parts.length === 2) {
    return `PT${parts[0]}M${parts[1]}S`;
  }
  return dur;
}
