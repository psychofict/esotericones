import { artists } from "@/data/artists";
import { releases } from "@/data/releases";

export function getRecordLabelSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://esotericones.com/#label",
    name: "The ESOTERIC Ones",
    alternateName: ["The Esoteric Ones Records", "ESOTERIC Ones", "The ES\u00D8T\u00CBRIC Ones"],
    url: "https://esotericones.com",
    logo: {
      "@type": "ImageObject",
      url: "https://esotericones.com/images/label-logo.svg",
      caption: "The ESOTERIC Ones \u2014 Independent Record Label",
    },
    foundingDate: "2023",
    foundingLocation: {
      "@type": "Place",
      name: "Seoul, South Korea",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Seoul",
        addressCountry: "KR",
      },
    },
    founder: {
      "@type": "Person",
      name: "Ebstar",
      alternateName: "Ebenezer Tarubinga",
      url: "https://esotericones.com/artists/ebstar",
    },
    description:
      "International independent record label founded in Seoul by Ebstar. 18+ artists from 6 countries, 5M+ streams across piano house, Amapiano, dance-pop, hip-hop, and electronic music.",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 18,
      unitText: "artists",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@esotericones.com",
      contactType: "customer service",
    },
    sameAs: [
      "https://open.spotify.com/artist/4mH71Zjiq36Q3SI7IZIBQK",
      "https://instagram.com/esotericones",
      "https://twitter.com/esotericones",
    ],
    member: artists.filter((a) => a.featured).map((a) => ({
      "@type": "Person",
      name: a.name,
      url: `https://esotericones.com/artists/${a.slug}`,
    })),
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://esotericones.com/#website",
    name: "The ESOTERIC Ones",
    url: "https://esotericones.com",
    description:
      "Official website of The ESOTERIC Ones \u2014 international independent record label founded in Seoul.",
    publisher: { "@type": "Organization", "@id": "https://esotericones.com/#label" },
    inLanguage: "en",
  };
}

export function getSiteNavigationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Site Navigation",
    itemListElement: [
      { "@type": "SiteNavigationElement", position: 1, name: "Artists", url: "https://esotericones.com/artists" },
      { "@type": "SiteNavigationElement", position: 2, name: "Releases", url: "https://esotericones.com/releases" },
      { "@type": "SiteNavigationElement", position: 3, name: "News", url: "https://esotericones.com/news" },
      { "@type": "SiteNavigationElement", position: 4, name: "Events", url: "https://esotericones.com/events" },
      { "@type": "SiteNavigationElement", position: 5, name: "About", url: "https://esotericones.com/about" },
      { "@type": "SiteNavigationElement", position: 6, name: "Contact", url: "https://esotericones.com/contact" },
      { "@type": "SiteNavigationElement", position: 7, name: "Submit Demo", url: "https://esotericones.com/demos" },
    ],
  };
}

export function getArtistSchema(artistSlug: string) {
  const artist = artists.find((a) => a.slug === artistSlug);
  if (!artist) return null;

  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: artist.name,
    url: `https://esotericones.com/artists/${artist.slug}`,
    genre: artist.genres,
    description: artist.bio,
    memberOf: {
      "@type": "Organization",
      "@id": "https://esotericones.com/#label",
      name: "The ESOTERIC Ones",
    },
    ...(artist.spotifyId
      ? { sameAs: [`https://open.spotify.com/artist/${artist.spotifyId}`] }
      : {}),
  };
}

export function getReleaseSchema(releaseSlug: string) {
  const release = releases.find((r) => r.slug === releaseSlug);
  if (!release) return null;

  return {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    name: release.title,
    url: `https://esotericones.com/releases/${release.slug}`,
    datePublished: release.date,
    genre: release.genres,
    albumProductionType: "StudioAlbum",
    byArtist: release.artistNames.map((name) => ({
      "@type": "MusicGroup",
      name,
    })),
    sameAs: [`https://open.spotify.com/${release.spotifyUri}`],
    recordLabel: {
      "@type": "Organization",
      "@id": "https://esotericones.com/#label",
      name: "The ESOTERIC Ones",
    },
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
