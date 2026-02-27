import { client } from "./sanity";

export async function getAlbums() {
  return client.fetch(
    `*[_type == "album"] | order(year desc) {
      _id,
      title,
      slug,
      artwork,
      year,
      tracks,
      duration,
      type,
      tracklist[] {
        trackNumber,
        title,
        duration,
        featuredArtists
      },
      streamingLinks {
        spotify,
        appleMusic,
        soundcloud,
        youtube
      },
      credits,
      featuredArtists
    }`
  );
}

export async function getSingles() {
  return client.fetch(
    `*[_type == "album" && type == "single"] | order(year desc) {
      _id,
      title,
      slug,
      artwork,
      year,
      tracks,
      duration,
      type,
      streamingLinks {
        spotify,
        appleMusic,
        soundcloud,
        youtube
      },
      featuredArtists
    }`
  );
}


export async function getVideos() {
  return client.fetch(
    `*[_type == "video"] | order(publishDate desc) {
      _id,
      title,
      embedUrl,
      thumbnail,
      type,
      album-> {
        _id,
        title,
        slug
      },
      publishDate
    }`
  );
}

export async function getMacroInfluencer() {
  return client.fetch(
    `*[_type == "macroInfluencer"] | order(year desc) {
      _id,
      organization,
      role,
      year,
      logo,
      description,
      photo
    }`
  );
}

export async function getPressItems() {
  return client.fetch(
    `*[_type == "press"] | order(date desc) {
      _id,
      title,
      outlet,
      url,
      date,
      pullQuote
    }`
  );
}

export async function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings"] | order(_updatedAt desc) [0] {
      _id,
      latestReleaseTitle,
      latestReleaseUrl,
      announcementBanner,
      socialLinks {
        spotify,
        appleMusic,
        soundcloud,
        instagram,
        facebook,
        twitter,
        youtube
      }
    }`
  );
}

export async function getEPKAssets() {
  return client.fetch(
    `*[_type == "epkAsset"] | order(title asc) {
      _id,
      title,
      type,
      "fileUrl": file.asset->url,
      description
    }`
  );
}
