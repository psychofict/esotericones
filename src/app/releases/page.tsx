"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { releases, getAllReleaseYears, getAllReleaseGenres } from "@/data/releases";
import { Disc3, Calendar, Users } from "lucide-react";

const years = getAllReleaseYears();
const genres = getAllReleaseGenres();

export default function ReleasesPage() {
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
    <main id="main-content" className="min-h-screen bg-[#0A0A0A]">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.p
            className="text-[#E8385D] text-xs font-semibold uppercase tracking-[0.3em] mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Catalog
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Releases
          </motion.h1>
          <motion.p
            className="text-lg text-[#A0A0A0] max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Every album, EP, and single from The ESOTERIC Ones catalog.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-7xl space-y-4">
          {/* Type filters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-[#666666] uppercase tracking-wider self-center mr-2">Type</span>
            {["album", "ep", "single"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(filterType === type ? null : type)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filterType === type
                    ? "bg-[#E8385D] text-white"
                    : "bg-white/5 text-[#A0A0A0] hover:bg-white/10"
                }`}
              >
                {type === "ep" ? "EP" : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Year filters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-[#666666] uppercase tracking-wider self-center mr-2">Year</span>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setFilterYear(filterYear === year ? null : year)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filterYear === year
                    ? "bg-[#E8385D] text-white"
                    : "bg-white/5 text-[#A0A0A0] hover:bg-white/10"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Genre filters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-[#666666] uppercase tracking-wider self-center mr-2">Genre</span>
            {genres.slice(0, 8).map((genre) => (
              <button
                key={genre}
                onClick={() => setFilterGenre(filterGenre === genre ? null : genre)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filterGenre === genre
                    ? "bg-[#E8385D] text-white"
                    : "bg-white/5 text-[#A0A0A0] hover:bg-white/10"
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={stagger(0.05)}
            initial="hidden"
            animate="visible"
            key={`${filterType}-${filterYear}-${filterGenre}`}
          >
            {filtered.map((release) => (
              <motion.div key={release.slug} variants={fadeUp}>
                <Link
                  href={`/releases/${release.slug}`}
                  className="group block glass-card rounded-2xl overflow-hidden card-hover h-full"
                >
                  {/* Artwork placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-[#E8385D]/20 via-[#141414] to-[#FF4D73]/10 flex items-center justify-center">
                    <Disc3 className="w-16 h-16 text-[#E8385D]/40 group-hover:text-[#E8385D]/60 transition-colors" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-white group-hover:text-[#E8385D] transition-colors truncate">
                      {release.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Users size={12} className="text-[#666666]" />
                      <p className="text-xs text-[#A0A0A0] truncate">
                        {release.artistNames.join(", ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={12} className="text-[#666666]" />
                      <p className="text-xs text-[#666666]">
                        {release.year} &middot; {release.type === "ep" ? "EP" : release.type.charAt(0).toUpperCase() + release.type.slice(1)}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-[#666666] py-16">
              No releases match your filters.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
