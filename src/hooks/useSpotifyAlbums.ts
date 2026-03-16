"use client";

import { useState, useEffect } from "react";
import { releases } from "@/data/releases";

interface SpotifyAlbumData {
  name: string;
  image: string | null;
  releaseDate: string | null;
  tracks: number | null;
  label: string | null;
}

let cache: Record<string, SpotifyAlbumData> | null = null;

export function useSpotifyAlbums() {
  const [data, setData] = useState<Record<string, SpotifyAlbumData>>(cache || {});
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    if (cache) return;

    const ids = releases
      .filter((r) => r.spotifyId)
      .map((r) => r.spotifyId);

    if (ids.length === 0) {
      setLoading(false);
      return;
    }

    // Build a map from spotifyId -> title for reverse lookup
    const idToTitle: Record<string, string> = {};
    releases.forEach((r) => {
      if (r.spotifyId) idToTitle[r.spotifyId] = r.title;
    });

    fetch(`/api/spotify-albums?ids=${ids.join(",")}`)
      .then((r) => (r.ok ? r.json() : {}))
      .then((raw: Record<string, SpotifyAlbumData>) => {
        // Re-key from spotifyId to release title
        const byTitle: Record<string, SpotifyAlbumData> = {};
        for (const [id, albumData] of Object.entries(raw)) {
          const title = idToTitle[id];
          if (title) byTitle[title] = albumData;
        }
        cache = byTitle;
        setData(byTitle);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { albums: data, loading };
}
