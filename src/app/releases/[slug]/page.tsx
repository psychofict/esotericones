"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { getReleaseBySlug } from "@/data/releases";
import SpotifyEmbed from "@/components/SpotifyEmbed";
import { ArrowLeft, Disc3, Calendar, Users, Music } from "lucide-react";

export default function ReleasePage() {
  const params = useParams();
  const slug = params.slug as string;
  const release = getReleaseBySlug(slug);

  if (!release) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Release Not Found</h1>
          <Link href="/releases" className="text-[#E8385D] hover:text-[#FF4D73]">
            Back to Releases
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen bg-[#0A0A0A]">
      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/releases"
            className="inline-flex items-center gap-2 text-sm text-[#A0A0A0] hover:text-[#E8385D] transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to Releases
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Artwork */}
            <motion.div
              className="aspect-square rounded-2xl overflow-hidden relative shadow-2xl shadow-[#E8385D]/10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {release.artwork ? (
                <Image
                  src={release.artwork}
                  alt={release.title}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#E8385D]/20 via-[#141414] to-[#FF4D73]/10 flex items-center justify-center">
                  <Disc3 className="w-32 h-32 text-[#E8385D]/30" />
                </div>
              )}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
            </motion.div>

            {/* Info */}
            <motion.div
              variants={stagger()}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeUp}>
                <span className="inline-block text-xs text-[#E8385D] uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-[#E8385D]/10 mb-3">
                  {release.type === "ep" ? "EP" : release.type.charAt(0).toUpperCase() + release.type.slice(1)}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
                  {release.title}
                </h1>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-6">
                <span className="flex items-center gap-2 text-sm text-[#A0A0A0] bg-white/5 px-3 py-1.5 rounded-full">
                  <Users size={14} /> {release.artistNames.join(", ")}
                </span>
                <span className="flex items-center gap-2 text-sm text-[#A0A0A0] bg-white/5 px-3 py-1.5 rounded-full">
                  <Calendar size={14} /> {release.year}
                </span>
              </motion.div>

              {/* Genres */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-8">
                {release.genres.map((genre) => (
                  <span
                    key={genre}
                    className="text-xs px-3 py-1 rounded-full bg-[#E8385D]/10 text-[#E8385D]"
                  >
                    {genre}
                  </span>
                ))}
              </motion.div>

              {/* Stream links */}
              <motion.div variants={fadeUp} className="flex gap-3 mb-8">
                <a
                  href={`https://open.spotify.com/${release.spotifyUri}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1DB954] text-white rounded-full text-sm font-semibold hover:bg-[#1ed760] transition-all hover:shadow-lg hover:shadow-[#1DB954]/20"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                  Listen on Spotify
                </a>
              </motion.div>

              {/* Spotify Embed */}
              <motion.div variants={fadeUp}>
                <SpotifyEmbed uri={release.spotifyUri} theme="dark" />
              </motion.div>

              {/* Tracklist */}
              {release.tracklist && release.tracklist.length > 0 && (
                <motion.div variants={fadeUp} className="mt-8">
                  <h2 className="text-lg font-bold text-white mb-4">Tracklist</h2>
                  <div className="space-y-1">
                    {release.tracklist.map((track) => (
                      <div
                        key={track.number}
                        className="flex items-center gap-4 py-2.5 px-4 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <span className="text-sm text-[#666666] w-6 text-right group-hover:text-[#E8385D] transition-colors">
                          {track.number}
                        </span>
                        <Music size={14} className="text-[#E8385D]/50 group-hover:text-[#E8385D] transition-colors" />
                        <span className="text-sm text-white flex-1">
                          {track.title}
                          {track.feat && (
                            <span className="text-[#A0A0A0]"> (feat. {track.feat})</span>
                          )}
                        </span>
                        {track.duration && (
                          <span className="text-xs text-[#666666]">{track.duration}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Credits */}
              {release.credits && release.credits.length > 0 && (
                <motion.div variants={fadeUp} className="mt-8">
                  <h2 className="text-lg font-bold text-white mb-4">Credits</h2>
                  <div className="space-y-2">
                    {release.credits.map((credit, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <span className="text-sm text-[#666666] min-w-[80px]">{credit.role}</span>
                        <span className="text-sm text-white">{credit.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
