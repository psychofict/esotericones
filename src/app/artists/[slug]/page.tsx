"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { getArtistBySlug, artists } from "@/data/artists";
import { getReleasesByArtist } from "@/data/releases";
import SpotifyEmbed from "@/components/SpotifyEmbed";
import { useSpotifyAlbums } from "@/hooks/useSpotifyAlbums";
import { Music, MapPin, Calendar, ArrowLeft, ExternalLink, Disc3 } from "lucide-react";

interface SpotifyArtistDetail {
  image: string | null;
  followers: number;
  genres: string[];
}

export default function ArtistPage() {
  const params = useParams();
  const slug = params.slug as string;
  const artist = getArtistBySlug(slug);
  const [spotifyDetail, setSpotifyDetail] = useState<SpotifyArtistDetail | null>(null);
  const { albums: spotifyAlbums } = useSpotifyAlbums();

  useEffect(() => {
    if (!artist?.spotifyId) return;
    fetch(`/api/spotify-artist/${artist.spotifyId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setSpotifyDetail(d))
      .catch(() => {});
  }, [artist?.spotifyId]);

  if (!artist) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Artist Not Found</h1>
          <Link href="/artists" className="text-[#E8385D] hover:text-[#FF4D73]">
            Back to Artists
          </Link>
        </div>
      </main>
    );
  }

  const artistReleases = getReleasesByArtist(slug);
  const relatedArtists = artists
    .filter((a) => a.slug !== slug && a.genres.some((g) => artist.genres.includes(g)))
    .slice(0, 4);
  const artistImage = spotifyDetail?.image;

  return (
    <main id="main-content" className="min-h-screen bg-[#0A0A0A]">
      {/* Hero with background blur */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* Blurred background image */}
        {artistImage && (
          <div className="absolute inset-0">
            <Image
              src={artistImage}
              alt=""
              width={1200}
              height={600}
              className="w-full h-full object-cover scale-110 blur-3xl opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/80 to-[#0A0A0A]" />
          </div>
        )}

        <div className="mx-auto max-w-7xl relative">
          <Link
            href="/artists"
            className="inline-flex items-center gap-2 text-sm text-[#A0A0A0] hover:text-[#E8385D] transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to Artists
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Artist avatar */}
            <motion.div
              className="w-32 h-32 md:w-44 md:h-44 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ring-[#E8385D]/20 shadow-2xl shadow-[#E8385D]/10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {artistImage ? (
                <Image
                  src={artistImage}
                  alt={artist.name}
                  width={176}
                  height={176}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#E8385D]/20 to-[#FF4D73]/10 flex items-center justify-center">
                  <Music className="w-16 h-16 text-[#E8385D]" />
                </div>
              )}
            </motion.div>

            <div>
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-white mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {artist.name}
              </motion.h1>

              <motion.div
                className="flex flex-wrap items-center gap-3 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <span className="flex items-center gap-1.5 text-sm text-[#A0A0A0] bg-white/5 px-3 py-1.5 rounded-full">
                  <MapPin size={14} /> {Array.isArray(artist.country) ? artist.country.join(", ") : artist.country}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-[#A0A0A0] bg-white/5 px-3 py-1.5 rounded-full">
                  <Calendar size={14} /> Joined {artist.joinedYear}
                </span>
                {spotifyDetail?.followers ? (
                  <span className="text-sm text-[#A0A0A0] bg-white/5 px-3 py-1.5 rounded-full">
                    {spotifyDetail.followers.toLocaleString()} followers
                  </span>
                ) : null}
                {artist.genres.map((genre) => (
                  <span
                    key={genre}
                    className="text-xs px-3 py-1.5 rounded-full bg-[#E8385D]/10 text-[#E8385D]"
                  >
                    {genre}
                  </span>
                ))}
              </motion.div>

              <motion.p
                className="text-[#A0A0A0] leading-relaxed max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {artist.bio}
              </motion.p>

              {/* Social links */}
              {artist.socials && artist.socials.length > 0 && (
                <motion.div
                  className="flex gap-3 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {artist.socials.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-sm text-white/70 hover:text-[#E8385D] hover:bg-[#E8385D]/10 transition-all"
                    >
                      <ExternalLink size={14} />
                      {social.platform}
                    </a>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Spotify Embed */}
      {artist.spotifyId && (
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-bold text-white mb-4">Listen</h2>
              <SpotifyEmbed uri={`artist/${artist.spotifyId}`} theme="dark" />
            </motion.div>
          </div>
        </section>
      )}

      {/* Discography */}
      {artistReleases.length > 0 && (
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={stagger()}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={fadeUp} className="text-xl font-bold text-white mb-6">
                Discography
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {artistReleases.map((release) => {
                  const albumArt = spotifyAlbums[release.title]?.image;
                  return (
                    <motion.div key={release.slug} variants={fadeUp}>
                      <Link
                        href={`/releases/${release.slug}`}
                        className="group flex items-center gap-4 glass-card rounded-xl p-3 card-hover"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          {albumArt ? (
                            <Image
                              src={albumArt}
                              alt={release.title}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#E8385D]/20 to-[#FF4D73]/10 flex items-center justify-center">
                              <Disc3 className="w-6 h-6 text-[#E8385D]" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-white group-hover:text-[#E8385D] transition-colors truncate">
                            {release.title}
                          </h3>
                          <p className="text-xs text-[#666666]">
                            {release.year} &middot; {release.type === "ep" ? "EP" : release.type.charAt(0).toUpperCase() + release.type.slice(1)}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Related Artists */}
      {relatedArtists.length > 0 && (
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={stagger()}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={fadeUp} className="text-xl font-bold text-white mb-6">
                Related Label Artists
              </motion.h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedArtists.map((ra) => (
                  <motion.div key={ra.slug} variants={fadeUp}>
                    <Link
                      href={`/artists/${ra.slug}`}
                      className="group block glass-card rounded-xl p-4 text-center card-hover"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E8385D]/20 to-[#FF4D73]/10 flex items-center justify-center mx-auto mb-2">
                        <Music className="w-5 h-5 text-[#E8385D]" />
                      </div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-[#E8385D] transition-colors">
                        {ra.name}
                      </h3>
                      <p className="text-xs text-[#666666] mt-1">{ra.genres[0]}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </main>
  );
}
