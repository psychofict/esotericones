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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const debug = searchParams.get("debug") === "1";

  // Return in-memory cache if valid
  if (artistCache && Date.now() < artistCache.expiry && !debug) {
    return NextResponse.json(artistCache.data, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=172800" },
    });
  }

  const token = await getAccessToken();
  if (!token) {
    return NextResponse.json({
      error: "Spotify credentials not configured",
      hasClientId: !!process.env.SPOTIFY_CLIENT_ID,
      hasClientSecret: !!process.env.SPOTIFY_CLIENT_SECRET,
    }, { status: 500 });
  }

  const roster = artists.filter((a) => a.spotifyId);

  if (debug) {
    // Test the batch endpoint directly
    const testIds = roster.slice(0, 3).map((a) => a.spotifyId).join(",");
    const testRes = await fetch(
      `https://api.spotify.com/v1/artists?ids=${testIds}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const testBody = await testRes.text();
    return NextResponse.json({
      tokenOk: true,
      batchUrl: `https://api.spotify.com/v1/artists?ids=${testIds}`,
      batchStatus: testRes.status,
      batchBody: testBody.substring(0, 500),
      rosterCount: roster.length,
      firstIds: roster.slice(0, 3).map((a) => ({ name: a.name, id: a.spotifyId })),
    });
  }
  const results: Record<string, SpotifyArtistResult> = {};

  // Use Spotify batch endpoint — up to 50 artists per call
  const ids = roster.map((a) => a.spotifyId);
  for (let i = 0; i < ids.length; i += 50) {
    const batchIds = ids.slice(i, i + 50).join(",");
    const res = await fetch(
      `https://api.spotify.com/v1/artists?ids=${batchIds}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!res.ok) continue;

    const data = await res.json();
    for (const artist of data.artists || []) {
      if (!artist) continue;
      // Find matching roster entry by Spotify ID
      const rosterEntry = roster.find((a) => a.spotifyId === artist.id);
      if (rosterEntry) {
        results[rosterEntry.name] = {
          name: artist.name || rosterEntry.name,
          image: artist.images?.[0]?.url || null,
          url: artist.external_urls?.spotify || null,
        };
      }
    }
  }

  // Fill in any missing artists
  for (const a of roster) {
    if (!results[a.name]) {
      results[a.name] = { name: a.name, image: null, url: null };
    }
  }

  // Only cache if we got at least some images
  const hasImages = Object.values(results).some((r) => r.image);
  if (hasImages) {
    artistCache = { data: results, expiry: Date.now() + CACHE_DURATION };
  }

  return NextResponse.json(results, {
    headers: {
      "Cache-Control": hasImages
        ? "public, s-maxage=86400, stale-while-revalidate=172800"
        : "no-cache, no-store",
    },
  });
}
