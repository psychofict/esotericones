"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import { useAudioPlayer } from "./AudioPlayerContext";
import SpotifyEmbed from "./SpotifyEmbed";

export default function AudioPlayer() {
  const { currentTrack, isVisible, closePlayer } = useAudioPlayer();
  const [expanded, setExpanded] = useState(false);

  return (
    <AnimatePresence>
      {isVisible && currentTrack && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
        >
          {/* Expanded Spotify embed */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-white/95 backdrop-blur-xl border-t border-gray-200 overflow-hidden"
              >
                <div className="max-w-2xl mx-auto px-4 py-4">
                  <SpotifyEmbed uri={currentTrack.spotifyUri} type="normal" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Compact player bar */}
          <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-4 h-20 flex items-center gap-4">
              {/* Track info */}
              <div className="flex items-center gap-3 min-w-0 flex-shrink-0 w-48">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2E86DE] to-[#1A1A2E] flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#1A1A2E] truncate">
                    {currentTrack.title}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {currentTrack.artist}
                  </p>
                </div>
              </div>

              {/* Spotify compact embed in center */}
              <div className="flex-1 hidden sm:block">
                <SpotifyEmbed
                  uri={currentTrack.spotifyUri}
                  type="compact"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-[#2E86DE]"
                  aria-label={expanded ? "Collapse player" : "Expand player"}
                >
                  {expanded ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronUp className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={closePlayer}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-red-500"
                  aria-label="Close player"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
