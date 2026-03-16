"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
            Every album, EP, and single from The ES&#216;T&#203;RIC Ones &mdash; from piano house anthems to Amapiano crossovers.
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
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filterType === type
                    ? "bg-[#E8385D] text-white shadow-lg shadow-[#E8385D]/20"
                    : "bg-white/5 text-[#A0A0A0] hover:bg-white/10 hover:text-white"
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
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filterYear === year
                    ? "bg-[#E8385D] text-white shadow-lg shadow-[#E8385D]/20"
                    : "bg-white/5 text-[#A0A0A0] hover:bg-white/10 hover:text-white"
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
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filterGenre === genre
                    ? "bg-[#E8385D] text-white shadow-lg shadow-[#E8385D]/20"
                    : "bg-white/5 text-[#A0A0A0] hover:bg-white/10 hover:text-white"
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
                    <div className="aspect-square rounded-xl overflow-hidden relative mb-3 ring-1 ring-white/5 group-hover:ring-[#E8385D]/30 transition-all">
                      {release.artwork ? (
                        <Image
                          src={release.artwork!}
                          alt={release.title}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#E8385D]/20 via-[#141414] to-[#FF4D73]/10 flex items-center justify-center">
                          <Disc3 className="w-12 h-12 text-[#E8385D]/40 group-hover:text-[#E8385D]/60 transition-colors" />
                        </div>
                      )}
                      {/* Type badge */}
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-black/70 backdrop-blur-sm text-white/80">
                        {release.type === "ep" ? "EP" : release.type}
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#E8385D] transition-colors truncate">
                      {release.title}
                    </h3>
                    <p className="text-xs text-[#A0A0A0] truncate mt-0.5">
                      {release.artistNames.join(", ")}
                    </p>
                    <p className="text-xs text-[#666666] mt-0.5">
                      {release.year}
                    </p>
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
