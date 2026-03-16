"use client";

import { useState, useEffect } from "react";

interface SpotifyArtistData {
  name: string;
  image: string | null;
  url: string | null;
}

let cache: Record<string, SpotifyArtistData> | null = null;

export function useSpotifyArtists() {
  const [data, setData] = useState<Record<string, SpotifyArtistData>>(cache || {});
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    if (cache) return;
    fetch("/api/spotify-artists")
      .then((r) => (r.ok ? r.json() : {}))
      .then((d) => {
        cache = d;
        setData(d);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { artists: data, loading };
}
