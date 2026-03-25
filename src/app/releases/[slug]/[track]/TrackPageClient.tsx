"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import type { Release } from "@/data/releases";
import SpotifyEmbed from "@/components/SpotifyEmbed";
import { ArrowLeft, Disc3, Music } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

interface TrackPageClientProps {
  release: Release;
  track: NonNullable<Release["tracklist"]>[number];
}

export default function TrackPageClient({ release, track }: TrackPageClientProps) {
  const { t } = useTranslation();

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-5xl">
          <Link
            href={`/releases/${release.slug}`}
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-[#E8385D] transition-colors mb-8"
          >
            <ArrowLeft size={16} /> {release.title}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Sidebar: artwork + track info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden relative shadow-2xl shadow-[#E8385D]/10 mb-6">
                {release.artwork ? (
                  <Image
                    src={release.artwork}
                    alt={release.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#E8385D]/20 via-surface to-[#FF4D73]/10 flex items-center justify-center">
                    <Disc3 className="w-24 h-24 text-[#E8385D]/30" />
                  </div>
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-subtle/10 rounded-2xl" />
              </div>

              <p className="text-xs text-muted uppercase tracking-wider mb-1">
                {t("release.trackOfTotal").replace("{current}", String(track.number)).replace("{total}", String(release.tracklist?.length ?? 0))}
              </p>
              <p className="text-sm text-text-secondary">
                {release.title} &middot; {release.year}
              </p>
              <p className="text-sm text-text-secondary mt-1">
                {release.artistNames.join(", ")}
              </p>

              {/* Spotify embed */}
              <div className="mt-6">
                <SpotifyEmbed uri={release.spotifyUri} theme="dark" type="compact" />
              </div>

              {/* Other tracks */}
              {release.tracklist && release.tracklist.length > 1 && (
                <div className="mt-8">
                  <h3 className="text-xs text-muted uppercase tracking-wider mb-3">
                    {t("release.tracklist")}
                  </h3>
                  <div className="space-y-1 max-h-64 overflow-y-auto">
                    {release.tracklist.map((t2) => (
                      <div key={t2.number}>
                        {t2.slug && t2.lyrics ? (
                          <Link
                            href={`/releases/${release.slug}/${t2.slug}`}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs transition-colors ${
                              t2.slug === track.slug
                                ? "bg-[#E8385D]/10 text-[#E8385D]"
                                : "text-text-secondary hover:text-foreground hover:bg-subtle/5"
                            }`}
                          >
                            <span className="w-5 text-right opacity-50">{t2.number}</span>
                            <span className="truncate">{t2.title}</span>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-2 px-3 py-2.5 text-xs text-muted">
                            <span className="w-5 text-right opacity-50">{t2.number}</span>
                            <span className="truncate">{t2.title}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Lyrics */}
            <motion.div
              className="lg:col-span-2"
              variants={stagger()}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeUp}>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {track.title}
                </h1>
                {track.feat && (
                  <p className="text-lg text-text-secondary mb-6">
                    {t("release.featuring")} {track.feat}
                  </p>
                )}
              </motion.div>

              <motion.div variants={fadeUp}>
                <div className="glass-card rounded-2xl p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Music size={16} className="text-[#E8385D]" />
                    <span className="text-xs text-muted uppercase tracking-wider font-semibold">{t("release.lyrics")}</span>
                  </div>
                  <div className="text-text-secondary leading-relaxed whitespace-pre-line text-sm md:text-base">
                    {track.lyrics}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
