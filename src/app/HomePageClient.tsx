"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { fadeUp, stagger } from "@/lib/animations";
import StatsBar from "@/components/StatsBar";
import { useTranslation } from "@/i18n/useTranslation";
import { getFeaturedArtists, artists } from "@/data/artists";
import { getFeaturedReleases, releases } from "@/data/releases";
import SpotifyEmbed from "@/components/SpotifyEmbed";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const featuredArtists = getFeaturedArtists();
const featuredReleases = getFeaturedReleases();
const artistsWithImages = artists.filter((a) => a.image);
const releasesWithArtwork = releases.filter((r) => r.artwork).slice(0, 12);

// Build seamless scroll columns (2 copies for infinite loop)
const half = Math.floor(artistsWithImages.length / 2);
const rightBase = [...artistsWithImages.slice(half), ...artistsWithImages.slice(0, half)];
const leftCol = [...artistsWithImages, ...artistsWithImages];
const rightCol = [...rightBase, ...rightBase];

export default function HomePageClient() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const logoSrc = theme === "light" ? "/images/esoteric-white.jpg" : "/images/esoteric-blk.jpg";

  return (
    <main id="main-content">
      <style>{`
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .anim-scroll-up   { animation: scrollUp   28s linear infinite; }
        .anim-scroll-down { animation: scrollDown 28s linear infinite; }
        .anim-marquee     { animation: marqueeLeft  35s linear infinite; }
        .anim-marquee-rev { animation: marqueeRight 40s linear infinite; }
      `}</style>

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        {/* Glow blobs */}
        <div className="absolute top-1/3 left-[22%] w-80 h-80 rounded-full bg-[#E8385D]/8 blur-[80px] animate-float" />
        <div className="absolute bottom-1/3 right-[22%] w-96 h-96 rounded-full bg-[#E8385D]/6 blur-[100px] animate-float-slow" />

        {/* ── Left scrolling artist column (lg+) ── */}
        <div className="absolute left-0 top-0 bottom-0 w-36 xl:w-44 hidden lg:block overflow-hidden pointer-events-none">
          <div className="flex flex-col gap-3 anim-scroll-up">
            {leftCol.map((artist, i) => (
              <div key={i} className="relative flex-shrink-0 h-44 mx-3 rounded-2xl overflow-hidden">
                <Image src={artist.image!} alt="" fill className="object-cover" sizes="176px" />
                <div className="absolute inset-0 bg-background/40" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Right scrolling artist column (lg+) ── */}
        <div className="absolute right-0 top-0 bottom-0 w-36 xl:w-44 hidden lg:block overflow-hidden pointer-events-none">
          <div className="flex flex-col gap-3 anim-scroll-down">
            {rightCol.map((artist, i) => (
              <div key={i} className="relative flex-shrink-0 h-44 mx-3 rounded-2xl overflow-hidden">
                <Image src={artist.image!} alt="" fill className="object-cover" sizes="176px" />
                <div className="absolute inset-0 bg-background/40" />
              </div>
            ))}
          </div>
        </div>

        {/* Column edge fades */}
        <div className="absolute inset-y-0 left-0 w-72 bg-gradient-to-r from-background to-transparent z-[1] hidden lg:block pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-72 bg-gradient-to-l from-background to-transparent z-[1] hidden lg:block pointer-events-none" />
        {/* Top + bottom fades */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-background to-transparent z-[1] pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />

        {/* ── Center content ── */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-6"
          >
            <div className="relative mx-auto w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden shadow-2xl shadow-[#E8385D]/20 ring-1 ring-white/10">
              <Image src={logoSrc} alt="The ESOTERIC Ones" fill className="object-cover" priority />
            </div>
          </motion.div>

          {/* Live pulse + eyebrow */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8385D] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8385D]" />
            </span>
            <span className="text-[#E8385D] text-xs font-bold uppercase tracking-[0.4em]">
              Global Music Label · Est. 2023
            </span>
          </motion.div>

          {/* Giant title */}
          <motion.h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[7rem] font-black tracking-tighter text-foreground mb-5 leading-[0.88]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{ fontFamily: "var(--font-display)" }}
          >
            THE{" "}
            <span className="text-gradient">ES&#216;T&#203;RIC</span>
            {" "}ONES
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-text-secondary max-w-xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {t("home.hero.description")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <Link
              href="/artists"
              className="px-8 py-4 bg-[#E8385D] text-white rounded-full font-bold hover:bg-[#FF4D73] transition-all hover:shadow-xl hover:shadow-[#E8385D]/30 btn-glow text-sm uppercase tracking-widest"
            >
              {t("home.hero.meetArtists")}
            </Link>
            <Link
              href="/releases"
              className="px-8 py-4 border border-border text-foreground rounded-full font-bold hover:bg-subtle/5 hover:border-[#E8385D]/40 transition-all text-sm uppercase tracking-widest"
            >
              {t("home.hero.browseReleases")}
            </Link>
          </motion.div>

          {/* Quick stats row */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {[
              { num: "24+", label: "Artists" },
              { num: "5M+", label: "Streams" },
              { num: "6",   label: "Countries" },
              { num: "88+", label: "Releases" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-foreground">{num}</div>
                <div className="text-[10px] text-muted uppercase tracking-widest mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-subtle/20 flex items-start justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#E8385D]"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* ─── ARTIST NAME MARQUEE ───────────────────────────────── */}
      <div className="bg-[#E8385D] py-4 overflow-hidden">
        <div className="flex items-center anim-marquee">
          {[...artistsWithImages, ...artistsWithImages].map((artist, i) => (
            <div key={i} className="flex-shrink-0 inline-flex items-center gap-3 px-6">
              <div className="w-8 h-8 rounded-full overflow-hidden relative ring-2 ring-white/30 flex-shrink-0">
                <Image src={artist.image!} alt={artist.name} fill className="object-cover" sizes="32px" />
              </div>
              <span className="text-white font-bold text-sm uppercase tracking-widest whitespace-nowrap">
                {artist.name}
              </span>
              <span className="text-white/40 ml-2 text-base select-none">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── RELEASES WALL ─────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={stagger()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[#E8385D] text-xs font-bold uppercase tracking-[0.3em] mb-2">
                  The Catalog
                </p>
                <h2 className="text-3xl md:text-5xl font-black text-foreground leading-none">
                  Our Releases
                </h2>
              </div>
              <Link
                href="/releases"
                className="flex-shrink-0 ml-4 text-sm text-text-secondary hover:text-[#E8385D] transition-colors flex items-center gap-1"
              >
                All {releases.length}+ releases <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* Bento grid */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
              style={{ gridAutoRows: "180px" }}
            >
              {/* Large featured tile */}
              {releasesWithArtwork[0] && (
                <Link
                  href={`/releases/${releasesWithArtwork[0].slug}`}
                  className="col-span-2 row-span-2 group relative rounded-2xl overflow-hidden"
                >
                  <Image
                    src={releasesWithArtwork[0].artwork!}
                    alt={releasesWithArtwork[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8385D] mb-1 block">
                      {releasesWithArtwork[0].type}
                    </span>
                    <p className="text-white font-black text-lg md:text-2xl leading-tight">
                      {releasesWithArtwork[0].title}
                    </p>
                    <p className="text-white/60 text-sm mt-1">
                      {releasesWithArtwork[0].artistNames.join(", ")}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:bg-[#E8385D]">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </Link>
              )}

              {/* Smaller tiles */}
              {releasesWithArtwork.slice(1, 11).map((release) => (
                <Link
                  key={release.slug}
                  href={`/releases/${release.slug}`}
                  className="group relative rounded-xl overflow-hidden"
                >
                  <Image
                    src={release.artwork!}
                    alt={release.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-semibold text-xs leading-snug line-clamp-2">
                      {release.title}
                    </p>
                    <p className="text-white/50 text-[10px] mt-0.5 truncate">
                      {release.artistNames.join(", ")}
                    </p>
                  </div>
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── LATEST RELEASE SPOTLIGHT ──────────────────────────── */}
      {featuredReleases[0] && (
        <section className="py-16 md:py-24 bg-surface border-y border-border">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              variants={stagger()}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p variants={fadeUp} className="text-[#E8385D] text-xs font-bold uppercase tracking-[0.3em] mb-6">
                {t("home.latestRelease")}
              </motion.p>
              <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div>
                  {/* Artwork — mobile only */}
                  {featuredReleases[0].artwork && (
                    <div className="md:hidden relative aspect-square rounded-2xl overflow-hidden mb-6 max-w-xs">
                      <Image
                        src={featuredReleases[0].artwork}
                        alt={featuredReleases[0].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h2 className="text-3xl md:text-5xl font-black text-foreground leading-none mb-3">
                    {featuredReleases[0].title}
                  </h2>
                  <p className="text-text-secondary mb-4">
                    {featuredReleases[0].artistNames.join(", ")}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-7">
                    {featuredReleases[0].genres.slice(0, 3).map((g) => (
                      <span key={g} className="text-xs px-3 py-1 rounded-full bg-[#E8385D]/10 text-[#E8385D] font-semibold">
                        {g}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/releases/${featuredReleases[0].slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8385D] text-white rounded-full font-bold text-sm hover:bg-[#FF4D73] transition-all hover:shadow-lg hover:shadow-[#E8385D]/25 btn-glow"
                  >
                    View Full Release <ArrowRight size={14} />
                  </Link>
                </div>
                <div>
                  <SpotifyEmbed uri={featuredReleases[0].spotifyUri} theme="dark" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── STATS ─────────────────────────────────────────────── */}
      <StatsBar />

      {/* ─── FEATURED ARTISTS (full-bleed portrait cards) ──────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={stagger()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[#E8385D] text-xs font-bold uppercase tracking-[0.3em] mb-2">
                  {t("home.ourRoster")}
                </p>
                <h2 className="text-3xl md:text-5xl font-black text-foreground leading-none">
                  {t("home.featuredArtists")}
                </h2>
              </div>
              <Link
                href="/artists"
                className="flex-shrink-0 ml-4 text-sm text-text-secondary hover:text-[#E8385D] transition-colors flex items-center gap-1"
              >
                {t("common.viewAll")} <ArrowRight size={14} />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {featuredArtists.map((artist) => (
                <motion.div key={artist.slug} variants={fadeUp}>
                  <Link
                    href={`/artists/${artist.slug}`}
                    className="group block relative rounded-2xl overflow-hidden"
                    style={{ aspectRatio: "3/4" }}
                  >
                    {artist.image ? (
                      <Image
                        src={artist.image}
                        alt={artist.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#E8385D]/30 via-surface to-[#1A1A1A]" />
                    )}

                    {/* Permanent bottom gradient for text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                    {/* Hover pink tint */}
                    <div className="absolute inset-0 bg-[#E8385D]/0 group-hover:bg-[#E8385D]/12 transition-all duration-500" />

                    {/* Genre chips */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                      {artist.genres.slice(0, 2).map((genre) => (
                        <span
                          key={genre}
                          className="text-[10px] px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white/90 font-medium"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>

                    {/* Arrow button */}
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-[#E8385D]">
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>

                    {/* Name + bio */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-[#FF4D73] transition-colors leading-tight mb-1">
                        {artist.name}
                      </h3>
                      <p className="text-white/50 text-xs mb-2">
                        {Array.isArray(artist.country)
                          ? artist.country.join(" · ")
                          : artist.country}
                      </p>
                      <p className="text-white/50 text-xs line-clamp-2 leading-relaxed">
                        {artist.shortBio}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── PARTNERS MARQUEE ──────────────────────────────────── */}
      <section className="py-12 bg-surface border-y border-border overflow-hidden">
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-muted mb-8">
          {t("home.featuredInPartners")}
        </p>
        <div className="relative overflow-hidden">
          <div className="flex items-center anim-marquee-rev">
            {[...Array(2)].flatMap((_, outerIdx) =>
              [
                { src: "/images/brands/forbes-blk.png",              alt: "Forbes BLK" },
                { src: "/images/brands/seoul-tourism.svg",            alt: "Seoul Tourism" },
                { src: "/images/brands/korea-blockchain-week.svg",    alt: "Korea Blockchain Week" },
                { src: "/images/brands/seoul-fashion-week.png",       alt: "Seoul Fashion Week" },
                { src: "/images/brands/unesco-korea.png",             alt: "UNESCO Korea" },
                { src: "/images/brands/korea-africa-summit.jpg",      alt: "Korea-Africa Summit" },
                { src: "/images/brands/korea-mofa.svg",               alt: "Ministry of Foreign Affairs" },
                { src: "/images/brands/seoul-africa-festival.svg",    alt: "Seoul Africa Festival" },
                { src: "/images/brands/korea-mcst.svg",               alt: "Ministry of Culture" },
                { src: "/images/brands/korea-national-assembly.png",  alt: "National Assembly of Korea" },
                { src: "/images/brands/undercover-korea.png",         alt: "Undercover Korea" },
                { src: "/images/brands/mobifren.png",                 alt: "Mobifren" },
              ].map((brand, i) => (
                <div key={`${outerIdx}-${i}`} className="flex-shrink-0 px-8">
                  <Image
                    src={brand.src}
                    alt={brand.alt}
                    width={100}
                    height={40}
                    className="h-8 w-auto object-contain opacity-50 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ─── NEWS + DEMO CTA ───────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* News */}
            <motion.div
              className="glass-card rounded-2xl p-8 md:p-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[#E8385D] text-xs font-bold uppercase tracking-[0.3em] mb-3">
                {t("home.stayConnected")}
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                {t("home.joinCircle")}
              </h2>
              <p className="text-text-secondary mb-6">
                {t("home.joinCircleDesc")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/news"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#E8385D] text-sm font-semibold text-white hover:bg-[#FF4D73] transition-all hover:shadow-lg hover:shadow-[#E8385D]/20"
                >
                  {t("news.title")} <ArrowRight size={14} />
                </Link>
                <a
                  href="https://open.spotify.com/user/31ddejxhfzv5bf7hka2mfmdbmb5a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-subtle/5 transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  {t("common.openInSpotify")}
                </a>
              </div>
            </motion.div>

            {/* Demo */}
            <motion.div
              className="glass-card rounded-2xl p-8 md:p-10 border border-[#E8385D]/20 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#E8385D]/8 blur-3xl pointer-events-none" />
              <p className="text-[#E8385D] text-xs font-bold uppercase tracking-[0.3em] mb-3 relative">
                {t("home.gotMusic")}
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4 relative">
                {t("home.submitYourDemo")}
              </h2>
              <p className="text-text-secondary mb-6 relative">
                {t("home.submitDemoDesc")}
              </p>
              <Link
                href="/demos"
                className="relative inline-flex items-center gap-2 px-8 py-3.5 bg-[#E8385D] text-white rounded-full font-bold hover:bg-[#FF4D73] transition-all hover:shadow-lg hover:shadow-[#E8385D]/25 btn-glow"
              >
                {t("home.submitADemo")} <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
