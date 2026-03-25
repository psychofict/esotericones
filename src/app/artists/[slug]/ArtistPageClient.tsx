"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import type { Artist } from "@/data/artists";
import type { Release } from "@/data/releases";
import SpotifyEmbed from "@/components/SpotifyEmbed";
import { Music, MapPin, Calendar, ArrowLeft, ExternalLink, Disc3 } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { socialIcons } from "@/lib/socialIcons";

interface ArtistPageClientProps {
  artist: Artist;
  artistReleases: Release[];
  relatedArtists: Artist[];
}

export default function ArtistPageClient({ artist, artistReleases, relatedArtists }: ArtistPageClientProps) {
  const { t } = useTranslation();
  const artistImage = artist.image;

  return (
    <main id="main-content" className="min-h-screen bg-background">
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
              sizes="100vw"
              loading="lazy"
              className="w-full h-full object-cover scale-110 blur-3xl opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          </div>
        )}

        <div className="mx-auto max-w-7xl relative">
          <Link
            href="/artists"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-[#E8385D] transition-colors mb-8"
          >
            <ArrowLeft size={16} /> {t("artist.backToArtists")}
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
                className="text-4xl md:text-5xl font-bold text-foreground mb-3"
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
                <span className="flex items-center gap-1.5 text-sm text-text-secondary bg-subtle/5 px-3 py-1.5 rounded-full">
                  <MapPin size={14} /> {Array.isArray(artist.country) ? artist.country.join(", ") : artist.country}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-text-secondary bg-subtle/5 px-3 py-1.5 rounded-full">
                  <Calendar size={14} /> {t("artist.joined")} {artist.joinedYear}
                </span>
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
                className="text-text-secondary leading-relaxed max-w-2xl"
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
                  {artist.socials.map((social) => {
                    const icon = socialIcons[social.platform.toLowerCase()];
                    return (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.platform}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-subtle/5 text-sm text-foreground/70 hover:text-[#E8385D] hover:bg-[#E8385D]/10 transition-all"
                      >
                        {icon || <ExternalLink size={14} />}
                        {social.platform}
                      </a>
                    );
                  })}
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
              <h2 className="text-xl font-bold text-foreground mb-4">{t("artist.listen")}</h2>
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
              <motion.h2 variants={fadeUp} className="text-xl font-bold text-foreground mb-6">
                {t("artist.discography")}
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {artistReleases.map((release) => (
                    <motion.div key={release.slug} variants={fadeUp}>
                      <Link
                        href={`/releases/${release.slug}`}
                        className="group flex items-center gap-4 glass-card rounded-xl p-3 card-hover"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          {release.artwork ? (
                            <Image
                              src={release.artwork}
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
                          <h3 className="text-sm font-semibold text-foreground group-hover:text-[#E8385D] transition-colors truncate">
                            {release.title}
                          </h3>
                          <p className="text-xs text-muted">
                            {release.year} &middot; {release.type === "album" ? t("common.album") : release.type === "ep" ? t("common.ep") : t("common.single")}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Photo Gallery */}
      {artist.gallery && artist.gallery.length > 0 && (
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-bold text-foreground mb-6">{t("artist.gallery")}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {artist.gallery.map((photo, i) => (
                  <motion.div
                    key={photo.src}
                    className="aspect-square rounded-xl overflow-hidden relative group"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={300}
                      height={300}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                  </motion.div>
                ))}
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
              <motion.h2 variants={fadeUp} className="text-xl font-bold text-foreground mb-6">
                {t("artist.relatedArtists")}
              </motion.h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedArtists.map((ra) => (
                  <motion.div key={ra.slug} variants={fadeUp}>
                    <Link
                      href={`/artists/${ra.slug}`}
                      className="group block glass-card rounded-xl p-4 text-center card-hover"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-[#E8385D]/20 to-[#FF4D73]/10 flex items-center justify-center mx-auto mb-2">
                        {ra.image ? (
                          <Image src={ra.image} alt={ra.name} width={48} height={48} className="w-full h-full object-cover" />
                        ) : (
                          <Music className="w-5 h-5 text-[#E8385D]" />
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-[#E8385D] transition-colors">
                        {ra.name}
                      </h3>
                      <p className="text-xs text-muted mt-1">{ra.genres[0]}</p>
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
