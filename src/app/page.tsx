"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { fadeUp, stagger, scaleIn } from "@/lib/animations";
import { label, labelStats } from "@/data/label";
import { getFeaturedArtists } from "@/data/artists";
import { getFeaturedReleases } from "@/data/releases";
import { getRecentPosts } from "@/data/news";
import SpotifyEmbed from "@/components/SpotifyEmbed";
import { useSpotifyArtists } from "@/hooks/useSpotifyArtists";
import { useSpotifyAlbums } from "@/hooks/useSpotifyAlbums";
import { Disc3, Users, Globe, Headphones, ArrowRight, Music } from "lucide-react";

const statIcons: Record<string, React.ReactNode> = {
  users: <Users className="w-6 h-6" />,
  headphones: <Headphones className="w-6 h-6" />,
  globe: <Globe className="w-6 h-6" />,
  disc: <Disc3 className="w-6 h-6" />,
};

const featuredArtists = getFeaturedArtists();
const featuredReleases = getFeaturedReleases();
const recentPosts = getRecentPosts(3);

export default function HomePage() {
  const { artists: spotifyArtists } = useSpotifyArtists();
  const { albums: spotifyAlbums } = useSpotifyAlbums();

  return (
    <main id="main-content">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A]" />

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-[#E8385D]/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-[10%] w-96 h-96 rounded-full bg-[#E8385D]/3 blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E8385D]/[0.02] blur-[100px]" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <div className="relative mx-auto w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl shadow-[#E8385D]/10">
              <Image
                src="/images/esoteric-blk.jpg"
                alt="The ESOTERIC Ones"
                width={224}
                height={224}
                className="w-full h-full object-cover"
                priority
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{ fontFamily: "var(--font-display)" }}
          >
            THE{" "}
            <span className="text-gradient">ES&#216;T&#203;RIC</span>
            {" "}ONES
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-[#A0A0A0] max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {label.description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/artists"
              className="px-8 py-3.5 bg-[#E8385D] text-white rounded-full font-semibold hover:bg-[#FF4D73] transition-all hover:shadow-lg hover:shadow-[#E8385D]/25 btn-glow"
            >
              Meet Our Artists
            </Link>
            <Link
              href="/releases"
              className="px-8 py-3.5 border border-[#2A2A2A] text-white rounded-full font-semibold hover:bg-white/5 hover:border-white/20 transition-all"
            >
              Browse Releases
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#E8385D]"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest Release Spotlight */}
      {featuredReleases[0] && (
        <section className="section-padding bg-[#0A0A0A]">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              variants={stagger()}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p variants={fadeUp} className="text-[#E8385D] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
                Latest Release
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-8">
                {featuredReleases[0].title}
              </motion.h2>
              <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Album artwork */}
                <div className="aspect-square rounded-2xl overflow-hidden relative max-w-md">
                  {spotifyAlbums[featuredReleases[0].title]?.image ? (
                    <Image
                      src={spotifyAlbums[featuredReleases[0].title].image!}
                      alt={featuredReleases[0].title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#E8385D]/20 via-[#141414] to-[#FF4D73]/10 flex items-center justify-center">
                      <Disc3 className="w-24 h-24 text-[#E8385D]/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
                </div>
                <div>
                  <SpotifyEmbed uri={featuredReleases[0].spotifyUri} theme="dark" />
                  <div className="mt-4 flex items-center gap-4">
                    <span className="text-sm text-[#A0A0A0]">
                      {featuredReleases[0].artistNames.join(", ")}
                    </span>
                    <Link
                      href={`/releases/${featuredReleases[0].slug}`}
                      className="text-sm text-[#E8385D] hover:text-[#FF4D73] transition-colors flex items-center gap-1"
                    >
                      View Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Stats Banner */}
      <section className="py-16 bg-[#141414] border-y border-[#2A2A2A]">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {labelStats.map((stat) => (
              <motion.div key={stat.label} variants={scaleIn} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E8385D]/10 text-[#E8385D] mb-3">
                  {statIcons[stat.icon]}
                </div>
                <p className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</p>
                <p className="text-sm text-[#666666] mt-1 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="section-padding bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={stagger()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[#E8385D] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
                  Our Roster
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Featured Artists
                </h2>
              </div>
              <Link
                href="/artists"
                className="text-sm text-[#A0A0A0] hover:text-[#E8385D] transition-colors flex items-center gap-1"
              >
                View All <ArrowRight size={14} />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArtists.map((artist) => {
                const spotifyData = spotifyArtists[artist.name];
                return (
                  <motion.div key={artist.slug} variants={fadeUp}>
                    <Link
                      href={`/artists/${artist.slug}`}
                      className="group block glass-card rounded-2xl p-6 card-hover"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#E8385D]/20 group-hover:ring-[#E8385D]/50 transition-all">
                          {spotifyData?.image ? (
                            <Image
                              src={spotifyData.image}
                              alt={artist.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#E8385D]/20 to-[#FF4D73]/10 flex items-center justify-center">
                              <Music className="w-6 h-6 text-[#E8385D]" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg font-bold text-white group-hover:text-[#E8385D] transition-colors truncate">
                            {artist.name}
                          </h3>
                          <p className="text-xs text-[#666666]">{Array.isArray(artist.country) ? artist.country.join(", ") : artist.country}</p>
                        </div>
                      </div>
                      <p className="text-sm text-[#A0A0A0]">{artist.shortBio}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {artist.genres.slice(0, 2).map((genre) => (
                          <span
                            key={genre}
                            className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-[#666666]"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recent News */}
      {recentPosts.length > 0 && (
        <section className="section-padding bg-[#141414]">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              variants={stagger()}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUp} className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-[#E8385D] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
                    Latest
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    News & Updates
                  </h2>
                </div>
                <Link
                  href="/news"
                  className="text-sm text-[#A0A0A0] hover:text-[#E8385D] transition-colors flex items-center gap-1"
                >
                  All News <ArrowRight size={14} />
                </Link>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentPosts.map((post) => (
                  <motion.div key={post.slug} variants={fadeUp}>
                    <Link
                      href={`/news/${post.slug}`}
                      className="group block glass-card rounded-2xl p-6 card-hover h-full"
                    >
                      <span className="inline-block text-xs text-[#E8385D] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full bg-[#E8385D]/10 mb-3">
                        {post.category}
                      </span>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#E8385D] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-[#A0A0A0] mt-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <p className="text-xs text-[#666666] mt-4">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Newsletter + Demo CTA */}
      <section className="section-padding bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Newsletter CTA */}
            <motion.div
              className="glass-card rounded-2xl p-8 md:p-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[#E8385D] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
                Stay Connected
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Join the ESOTERIC Circle
              </h2>
              <p className="text-[#A0A0A0] mb-6">
                Be the first to hear about new releases, artist signings, and exclusive content.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-lg bg-white/5 border border-[#2A2A2A] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#E8385D] transition-colors"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#E8385D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#FF4D73] transition-all hover:shadow-lg hover:shadow-[#E8385D]/20 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>

            {/* Demo CTA */}
            <motion.div
              className="glass-card rounded-2xl p-8 md:p-10 border border-[#E8385D]/20 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#E8385D]/5 blur-3xl" />
              <p className="text-[#E8385D] text-xs font-semibold uppercase tracking-[0.3em] mb-3 relative">
                Got Music?
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 relative">
                Submit Your Demo
              </h2>
              <p className="text-[#A0A0A0] mb-6 relative">
                We&apos;re always looking for fresh talent. If your sound is bold, emotional, and unapologetic, we want to hear it.
              </p>
              <Link
                href="/demos"
                className="relative inline-flex items-center gap-2 px-8 py-3.5 bg-[#E8385D] text-white rounded-full font-semibold hover:bg-[#FF4D73] transition-all hover:shadow-lg hover:shadow-[#E8385D]/25 btn-glow"
              >
                Submit a Demo <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
