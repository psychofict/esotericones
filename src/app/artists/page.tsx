"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { artists, getAllGenres } from "@/data/artists";
import { Music, MapPin } from "lucide-react";

const allGenres = getAllGenres();

export default function ArtistsPage() {
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const filtered = activeGenre
    ? artists.filter((a) => a.genres.includes(activeGenre))
    : artists;

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
            Our Roster
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Artists
          </motion.h1>
          <motion.p
            className="text-lg text-[#A0A0A0] max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            24+ artists across 6 countries. Piano house, Amapiano, hip-hop, electronic &mdash; meet the roster behind the ESOTERIC sound.
          </motion.p>
        </div>
      </section>

      {/* Genre Filter */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveGenre(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !activeGenre
                  ? "bg-[#E8385D] text-white shadow-lg shadow-[#E8385D]/20"
                  : "bg-white/5 text-[#A0A0A0] hover:bg-white/10 hover:text-white"
              }`}
            >
              All
            </button>
            {allGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre === activeGenre ? null : genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeGenre === genre
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
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#E8385D]/20 via-[#141414] to-[#FF4D73]/10 flex items-center justify-center">
                          <Music className="w-16 h-16 text-[#E8385D]/40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
                      {/* Country badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs text-white/80">
                        <MapPin size={10} />
                        {Array.isArray(artist.country) ? artist.country.join(", ") : artist.country}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#E8385D] transition-colors">
                        {artist.name}
                      </h3>
                      <p className="text-sm text-[#A0A0A0] mt-1 line-clamp-2">
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
            <p className="text-center text-[#666666] py-16">
              No artists found for this genre.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
