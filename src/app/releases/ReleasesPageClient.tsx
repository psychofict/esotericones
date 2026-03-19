"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { releases, getAllReleaseYears, getAllReleaseGenres } from "@/data/releases";
import { Disc3, Calendar, Users } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import type { TranslationKeys } from "@/i18n/types";

const years = getAllReleaseYears();
const genres = getAllReleaseGenres();

const typeLabels: Record<string, keyof TranslationKeys> = {
  album: "common.album",
  ep: "common.ep",
  single: "common.single",
};

export default function ReleasesPageClient() {
  const { t } = useTranslation();
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterYear, setFilterYear] = useState<number | null>(null);
  const [filterGenre, setFilterGenre] = useState<string | null>(null);
  const filtered = releases.filter((r) => {
    if (filterType && r.type !== filterType) return false;
    if (filterYear && r.year !== filterYear) return false;
    if (filterGenre && !r.genres.includes(filterGenre)) return false;
    return true;
  });

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
            {t("releases.catalog")}
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t("releases.title")}
          </motion.h1>
          <motion.p
            className="text-lg text-text-secondary max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t("releases.description")}
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-7xl space-y-4">
          {/* Type filters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted uppercase tracking-wider self-center mr-2">{t("common.type")}</span>
            {["album", "ep", "single"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(filterType === type ? null : type)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filterType === type
                    ? "bg-[#E8385D] text-white shadow-lg shadow-[#E8385D]/20"
                    : "bg-subtle/5 text-text-secondary hover:bg-subtle/10 hover:text-foreground"
                }`}
              >
                {t(typeLabels[type])}
              </button>
            ))}
          </div>

          {/* Year filters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted uppercase tracking-wider self-center mr-2">{t("common.year")}</span>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setFilterYear(filterYear === year ? null : year)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filterYear === year
                    ? "bg-[#E8385D] text-white shadow-lg shadow-[#E8385D]/20"
                    : "bg-subtle/5 text-text-secondary hover:bg-subtle/10 hover:text-foreground"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Genre filters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted uppercase tracking-wider self-center mr-2">{t("common.genre")}</span>
            {genres.slice(0, 8).map((genre) => (
              <button
                key={genre}
                onClick={() => setFilterGenre(filterGenre === genre ? null : genre)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filterGenre === genre
                    ? "bg-[#E8385D] text-white shadow-lg shadow-[#E8385D]/20"
                    : "bg-subtle/5 text-text-secondary hover:bg-subtle/10 hover:text-foreground"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Release Grid */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
            variants={stagger(0.05)}
            initial="hidden"
            animate="visible"
            key={`${filterType}-${filterYear}-${filterGenre}`}
          >
            {filtered.map((release) => (
                <motion.div key={release.slug} variants={fadeUp}>
                  <Link
                    href={`/releases/${release.slug}`}
                    className="group block card-hover h-full"
                  >
                    {/* Artwork */}
                    <div className="aspect-square rounded-xl overflow-hidden relative mb-3 ring-1 ring-subtle/5 group-hover:ring-[#E8385D]/30 transition-all">
                      {release.artwork ? (
                        <Image
                          src={release.artwork!}
                          alt={release.title}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#E8385D]/20 via-surface to-[#FF4D73]/10 flex items-center justify-center">
                          <Disc3 className="w-12 h-12 text-[#E8385D]/40 group-hover:text-[#E8385D]/60 transition-colors" />
                        </div>
                      )}
                      {/* Type badge */}
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-background/70 backdrop-blur-sm text-foreground/80">
                        {release.type === "ep" ? "EP" : release.type}
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-foreground group-hover:text-[#E8385D] transition-colors truncate">
                      {release.title}
                    </h3>
                    <p className="text-xs text-text-secondary truncate mt-0.5">
                      {release.artistNames.join(", ")}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      {release.year}
                    </p>
                  </Link>
                </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-muted py-16">
              {t("releases.noResults")}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
