"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { albums, singles, topTracks } from "@/data/artist";
import { useAudioPlayer } from "@/components/AudioPlayerContext";
import SpotifyEmbed from "@/components/SpotifyEmbed";
import JsonLd from "@/components/JsonLd";
import { getMusicAlbumSchema } from "@/lib/structured-data";

type FilterType = "all" | "album" | "ep" | "single" | "remix";

const filterButtons: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Albums", value: "album" },
  { label: "EPs", value: "ep" },
  { label: "Singles", value: "single" },
  { label: "Remixes", value: "remix" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface AlbumImages {
  [id: string]: {
    image: string | null;
    name: string;
    tracks: number;
    releaseDate: string;
    label: string;
  };
}

function getAlbumGradient(index: number) {
  const gradients = [
    "from-[#2E86DE] to-[#1A1A2E]",
    "from-[#F39C12] to-[#2E86DE]",
    "from-[#1A1A2E] to-[#F39C12]",
    "from-[#2E86DE] to-[#F39C12]",
    "from-[#F39C12] to-[#1A1A2E]",
  ];
  return gradients[index % gradients.length];
}

export default function MusicPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [albumImages, setAlbumImages] = useState<AlbumImages>({});
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [selectedSingle, setSelectedSingle] = useState<string | null>(null);
  const { playTrack } = useAudioPlayer();

  // Fetch cover art for all albums and singles
  useEffect(() => {
    const allIds = [
      ...albums.map((a) => a.spotifyId),
      ...singles.map((s) => s.spotifyId),
    ].filter(Boolean);
    const uniqueIds = [...new Set(allIds)];

    if (uniqueIds.length === 0) return;

    fetch(`/api/spotify-albums?ids=${uniqueIds.join(",")}`)
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => setAlbumImages(data))
      .catch(() => {});
  }, []);

  const filteredAlbums = albums.filter((album) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "remix") return album.title.toLowerCase().includes("remix");
    if (activeFilter === "single") return false;
    if (activeFilter === "album") return album.type === "album";
    if (activeFilter === "ep") return album.type === "ep";
    return album.type === activeFilter;
  });

  const selectedAlbumData = selectedAlbum
    ? albums.find((a) => a.id === selectedAlbum)
    : null;

  const selectedSingleData = selectedSingle
    ? singles.find((s) => s.spotifyId === selectedSingle)
    : null;

  return (
    <main className="min-h-screen bg-white">
      {/* Structured Data */}
      {albums.map((album) => (
        <JsonLd
          key={`jsonld-${album.id}`}
          data={getMusicAlbumSchema({ title: album.title, year: album.year, tracks: album.tracks })}
        />
      ))}

      {/* Page Header */}
      <section className="bg-[#EAF4FC] py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-[#1A1A2E] mb-4"
          >
            Discography
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[#1A1A2E]/70 max-w-2xl mx-auto"
          >
            Explore the full catalogue of Ebstar&apos;s music — from piano house
            anthems to genre-bending collaborations.
          </motion.p>
        </div>
      </section>

      {/* Featured Spotify Artist Embed */}
      <section className="max-w-3xl mx-auto px-6 pt-10 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SpotifyEmbed uri="artist/4mH71Zjiq36Q3SI7IZIBQK" className="mb-4" />
        </motion.div>
      </section>

      {/* Filter Buttons */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setActiveFilter(btn.value)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === btn.value
                  ? "bg-[#2E86DE] text-white shadow-lg shadow-[#2E86DE]/30"
                  : "bg-[#EAF4FC] text-[#1A1A2E] hover:bg-[#2E86DE]/10"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Albums Grid — Cover Art */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeFilter}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredAlbums.map((album, index) => {
            const coverImage = albumImages[album.spotifyId]?.image;
            return (
              <motion.div
                key={album.id}
                variants={itemVariants}
                className="group cursor-pointer"
                onClick={() => setSelectedAlbum(album.id)}
                whileHover={{ y: -6 }}
              >
                <div className="aspect-square rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300 mb-3">
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt={album.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${getAlbumGradient(index)} flex items-center justify-center`}
                    >
                      <span className="text-white/20 text-6xl font-bold select-none">
                        {album.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-bold text-[#1A1A2E] leading-tight line-clamp-2 group-hover:text-[#2E86DE] transition-colors">
                  {album.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{album.year}</p>
                {album.artist && (
                  <p className="text-xs text-[#F39C12] font-medium">{album.artist}</p>
                )}
                <span className="inline-block mt-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#EAF4FC] text-[#2E86DE] font-medium">
                  {album.type}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredAlbums.length === 0 && activeFilter === "single" && (
          <p className="text-center text-gray-400 py-8">
            Singles are listed in the section below.
          </p>
        )}
      </section>

      {/* Album Detail Modal */}
      <AnimatePresence>
        {selectedAlbumData && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAlbum(null)}
          >
            <motion.div
              className="relative bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedAlbum(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
              >
                <X size={16} />
              </button>

              {/* Cover Art */}
              {albumImages[selectedAlbumData.spotifyId]?.image && (
                <div className="aspect-square relative">
                  <Image
                    src={albumImages[selectedAlbumData.spotifyId].image!}
                    alt={selectedAlbumData.title}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                </div>
              )}

              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">
                  {selectedAlbumData.title}
                </h2>
                {selectedAlbumData.artist && (
                  <p className="text-sm text-[#F39C12] font-medium mb-1">
                    {selectedAlbumData.artist}
                  </p>
                )}
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-1">
                  <span>{selectedAlbumData.year}</span>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#EAF4FC] text-[#2E86DE] font-medium">
                    {selectedAlbumData.type}
                  </span>
                </div>
                {(selectedAlbumData.tracks || selectedAlbumData.duration) && (
                  <p className="text-xs text-gray-400 mb-4">
                    {selectedAlbumData.tracks && `${selectedAlbumData.tracks} tracks`}
                    {selectedAlbumData.tracks && selectedAlbumData.duration && " · "}
                    {selectedAlbumData.duration}
                  </p>
                )}
                {albumImages[selectedAlbumData.spotifyId]?.label && (
                  <p className="text-xs text-gray-400 mb-4">
                    Label: {albumImages[selectedAlbumData.spotifyId].label}
                  </p>
                )}

                {/* Spotify Embed */}
                <div className="mb-4">
                  <SpotifyEmbed
                    uri={`album/${selectedAlbumData.spotifyId}`}
                    type="large"
                    theme="dark"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      playTrack({
                        title: selectedAlbumData.title,
                        artist: selectedAlbumData.artist || "Ebstar",
                        spotifyUri: `album/${selectedAlbumData.spotifyId}`,
                      })
                    }
                    className="flex-1 text-center text-xs font-semibold py-2.5 rounded-lg bg-[#1DB954] text-white hover:bg-[#1DB954]/90 transition-colors"
                  >
                    Listen on Spotify
                  </button>
                  <a
                    href={selectedAlbumData.appleMusicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-xs font-semibold py-2.5 rounded-lg bg-[#FA243C] text-white hover:bg-[#FA243C]/90 transition-colors"
                  >
                    Apple Music
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Singles Section — Cover Art Grid */}
      <section className="bg-[#EAF4FC]/50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-[#1A1A2E] mb-8"
          >
            Singles
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {singles.map((single, index) => {
              const coverImage = albumImages[single.spotifyId]?.image;
              return (
                <motion.div
                  key={single.spotifyId}
                  variants={itemVariants}
                  className="group cursor-pointer"
                  onClick={() => setSelectedSingle(single.spotifyId)}
                  whileHover={{ y: -6 }}
                >
                  <div className="aspect-square rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300 mb-3">
                    {coverImage ? (
                      <Image
                        src={coverImage}
                        alt={single.title}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className={`w-full h-full bg-gradient-to-br ${getAlbumGradient(index)} flex items-center justify-center`}
                      >
                        <span className="text-white/20 text-5xl font-bold select-none">
                          {single.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-[#1A1A2E] leading-tight line-clamp-2 group-hover:text-[#2E86DE] transition-colors">
                    {single.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{single.year}</p>
                  {single.feat && (
                    <p className="text-xs text-[#F39C12] font-medium">
                      feat. {single.feat}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Single Detail Modal */}
      <AnimatePresence>
        {selectedSingleData && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSingle(null)}
          >
            <motion.div
              className="relative bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedSingle(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
              >
                <X size={16} />
              </button>

              {/* Cover Art */}
              {albumImages[selectedSingleData.spotifyId]?.image && (
                <div className="aspect-square relative">
                  <Image
                    src={albumImages[selectedSingleData.spotifyId].image!}
                    alt={selectedSingleData.title}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                </div>
              )}

              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">
                  {selectedSingleData.title}
                </h2>
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-1">
                  <span>{selectedSingleData.year}</span>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#EAF4FC] text-[#2E86DE] font-medium">
                    single
                  </span>
                </div>
                {selectedSingleData.feat && (
                  <p className="text-sm text-[#F39C12] font-medium mb-4">
                    feat. {selectedSingleData.feat}
                  </p>
                )}
                {albumImages[selectedSingleData.spotifyId]?.label && (
                  <p className="text-xs text-gray-400 mb-4">
                    Label: {albumImages[selectedSingleData.spotifyId].label}
                  </p>
                )}

                {/* Spotify Embed */}
                <SpotifyEmbed
                  uri={`${selectedSingleData.spotifyType}/${selectedSingleData.spotifyId}`}
                  type="large"
                  theme="dark"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Tracks Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-[#1A1A2E] mb-8"
          >
            Top Tracks
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {topTracks.map((track, index) => (
              <motion.div
                key={track.title}
                variants={itemVariants}
                className="flex items-center gap-5 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 group"
              >
                <span
                  className={`text-3xl font-black w-12 text-center flex-shrink-0 ${
                    index === 0
                      ? "text-[#F39C12]"
                      : index === 1
                        ? "text-[#2E86DE]"
                        : index === 2
                          ? "text-[#2E86DE]/60"
                          : "text-gray-300"
                  }`}
                >
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#1A1A2E] group-hover:text-[#2E86DE] transition-colors truncate">
                    {track.title}
                  </h3>
                  <p className="text-sm text-gray-400">{track.source}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-[#1A1A2E]">{track.streams}</p>
                  <p className="text-xs text-gray-400">streams</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
