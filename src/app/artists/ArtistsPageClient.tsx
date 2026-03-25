"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { artists, getAllGenres } from "@/data/artists";
import { Music, MapPin } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

const allGenres = getAllGenres();

export default function ArtistsPageClient() {
  const { t } = useTranslation();
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const filtered = activeGenre
    ? artists.filter((a) => a.genres.includes(activeGenre))
    : artists;

  return (
    <main id="main-content" className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.p
            className="text-[#E8385D] text-xs font-semibold uppercase tracking-[0.3em] mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {t("artists.ourRoster")}
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t("artists.title")}
          </motion.h1>
          <motion.p
            className="text-lg text-text-secondary max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t("artists.description")}
          </motion.p>
        </div>
      </section>

      {/* Genre Filter */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveGenre(null)}
              aria-pressed={!activeGenre}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !activeGenre
                  ? "bg-[#E8385D] text-white shadow-lg shadow-[#E8385D]/20"
                  : "bg-subtle/5 text-text-secondary hover:bg-subtle/10 hover:text-foreground"
              }`}
            >
              {t("common.all")}
            </button>
            {allGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre === activeGenre ? null : genre)}
                aria-pressed={activeGenre === genre}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeGenre === genre
                    ? "bg-[#E8385D] text-white shadow-lg shadow-[#E8385D]/20"
                    : "bg-subtle/5 text-text-secondary hover:bg-subtle/10 hover:text-foreground"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
          {activeGenre && (
            <div className="flex items-center gap-4 mt-3">
              <span className="text-sm text-text-secondary">
                {t("common.showingResults").replace("{count}", String(filtered.length)).replace("{total}", String(artists.length))}
              </span>
              <button
                onClick={() => setActiveGenre(null)}
                className="text-sm text-[#E8385D] hover:text-[#FF4D73] transition-colors font-medium"
              >
                {t("common.resetFilters")}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Artist Grid */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={stagger(0.05)}
            initial="hidden"
            animate="visible"
            key={activeGenre || "all"}
          >
            {filtered.map((artist) => (
                <motion.div key={artist.slug} variants={fadeUp}>
                  <Link
                    href={`/artists/${artist.slug}`}
                    className="group block glass-card rounded-2xl overflow-hidden card-hover h-full"
                  >
                    {/* Artist image */}
                    <div className="aspect-square overflow-hidden relative">
                      {artist.image ? (
                        <Image
                          src={artist.image}
                          alt={artist.name}
                          width={300}
                          height={300}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#E8385D]/20 via-surface to-[#FF4D73]/10 flex items-center justify-center">
                          <Music className="w-16 h-16 text-[#E8385D]/40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                      {/* Country badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/60 backdrop-blur-sm text-xs text-foreground/80">
                        <MapPin size={10} />
                        {Array.isArray(artist.country) ? artist.country.join(", ") : artist.country}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-[#E8385D] transition-colors">
                        {artist.name}
                      </h3>
                      <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                        {artist.shortBio}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {artist.genres.slice(0, 2).map((genre) => (
                          <span
                            key={genre}
                            className="text-xs px-2 py-0.5 rounded-full bg-[#E8385D]/10 text-[#E8385D]/80"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-muted py-16">
              {t("artists.noResults")}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
