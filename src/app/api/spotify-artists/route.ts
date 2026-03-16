import { NextResponse } from "next/server";
import { artists } from "@/data/artists";

interface SpotifyArtistResult {
  name: string;
  image: string | null;
  url: string | null;
}

let tokenCache: { token: string; expiry: number } | null = null;
let artistCache: { data: Record<string, SpotifyArtistResult>; expiry: number } | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000;

async function getAccessToken(): Promise<string | null> {
  if (tokenCache && Date.now() < tokenCache.expiry) {
    return tokenCache.token;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) return null;

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) return null;

  const data = await res.json();
  tokenCache = { token: data.access_token, expiry: Date.now() + (data.expires_in - 60) * 1000 };
  return data.access_token;
}

async function fetchArtistById(token: string, id: string, name: string): Promise<SpotifyArtistResult> {
  if (!id) return { name, image: null, url: null };

  const res = await fetch(
    `https://api.spotify.com/v1/artists/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!res.ok) return { name, image: null, url: null };

  const data = await res.json();
  return {
    name: data.name || name,
    image: data.images?.[0]?.url || null,
    url: data.external_urls?.spotify || null,
  };
}

export async function GET() {
  if (artistCache && Date.now() < artistCache.expiry) {
    return NextResponse.json(artistCache.data, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=172800" },
    });
  }

  const token = await getAccessToken();
  if (!token) {
    return NextResponse.json({ error: "Spotify credentials not configured" }, { status: 500 });
  }

  const roster = artists.filter((a) => a.spotifyId);
  const results: Record<string, SpotifyArtistResult> = {};

  for (let i = 0; i < roster.length; i += 5) {
    const batch = roster.slice(i, i + 5);
    const batchResults = await Promise.all(
      batch.map((a) => fetchArtistById(token, a.spotifyId, a.name))
    );
    batch.forEach((a, j) => {
      results[a.name] = batchResults[j];
    });
  }

  artistCache = { data: results, expiry: Date.now() + CACHE_DURATION };

  return NextResponse.json(results, {
    headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=172800" },
  });
}
