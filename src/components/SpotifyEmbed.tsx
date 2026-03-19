"use client";

import { useState } from "react";

interface SpotifyEmbedProps {
  uri: string;
  type?: "compact" | "normal" | "large";
  theme?: "light" | "dark";
  className?: string;
}

export default function SpotifyEmbed({ uri, type = "normal", theme = "dark", className = "" }: SpotifyEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const height = type === "compact" ? 80 : type === "large" ? 352 : 352;
  const themeParam = theme === "dark" ? "&theme=0" : "";

  if (error) {
    return (
      <div className={`rounded-xl border border-[#E8385D]/20 bg-subtle/5 p-8 flex flex-col items-center gap-3 ${className}`}>
        <svg className="w-10 h-10 text-[#1DB954]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
        <a
          href={`https://open.spotify.com/${uri}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#1DB954] hover:underline font-medium"
        >
          Open in Spotify
        </a>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {!loaded && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#1DB954]/10 to-[#191414]/30 animate-pulse" />
      )}
      <iframe
        src={`https://open.spotify.com/embed/${uri}?utm_source=generator${themeParam}`}
        width="100%"
        height={height}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className={`rounded-xl transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        title="Spotify Player"
      />
    </div>
  );
}
