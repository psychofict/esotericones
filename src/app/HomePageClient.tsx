"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { fadeUp, stagger, scaleIn } from "@/lib/animations";
import { labelStats } from "@/data/label";
import { useTranslation } from "@/i18n/useTranslation";
import { getFeaturedArtists } from "@/data/artists";
import { getFeaturedReleases } from "@/data/releases";
import SpotifyEmbed from "@/components/SpotifyEmbed";
import { useFormSubmit } from "@/lib/useFormSubmit";
import { statKeys, statIcons } from "@/lib/statConfig";
import { Disc3, ArrowRight, Music, Loader2 } from "lucide-react";

const featuredArtists = getFeaturedArtists();
const featuredReleases = getFeaturedReleases();

export default function HomePageClient() {
  const { t } = useTranslation();
  const [nlEmail, setNlEmail] = useState("");
  const { loading: nlLoading, success: nlSuccess, error: nlError, submitForm: nlSubmit, reset: nlReset } = useFormSubmit("/api/newsletter");

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlEmail) return;
    await nlSubmit({ email: nlEmail });
    if (!nlError) setNlEmail("");
  };

  return (
    <main id="main-content">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

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
              <div className="absolute inset-0 ring-1 ring-inset ring-subtle/10 rounded-2xl" />
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6"
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
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t("home.hero.description")}
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
              {t("home.hero.meetArtists")}
            </Link>
            <Link
              href="/releases"
              className="px-8 py-3.5 border border-border text-foreground rounded-full font-semibold hover:bg-subtle/5 hover:border-subtle/20 transition-all"
            >
              {t("home.hero.browseReleases")}
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-subtle/20 flex items-start justify-center pt-2">
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
        <section className="section-padding bg-background">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              variants={stagger()}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p variants={fadeUp} className="text-[#E8385D] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
                {t("home.latestRelease")}
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                {featuredReleases[0].title}
              </motion.h2>
              <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Album artwork */}
                <div className="aspect-square rounded-2xl overflow-hidden relative max-w-md">
                  {featuredReleases[0].artwork ? (
                    <Image
                      src={featuredReleases[0].artwork}
                      alt={featuredReleases[0].title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#E8385D]/20 via-surface to-[#FF4D73]/10 flex items-center justify-center">
                      <Disc3 className="w-24 h-24 text-[#E8385D]/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 ring-1 ring-inset ring-subtle/10 rounded-2xl" />
                </div>
                <div>
                  <SpotifyEmbed uri={featuredReleases[0].spotifyUri} theme="dark" />
                  <div className="mt-4 flex items-center gap-4">
                    <span className="text-sm text-text-secondary">
                      {featuredReleases[0].artistNames.join(", ")}
                    </span>
                    <Link
                      href={`/releases/${featuredReleases[0].slug}`}
                      className="text-sm text-[#E8385D] hover:text-[#FF4D73] transition-colors flex items-center gap-1"
                    >
                      {t("home.viewDetails")} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Stats Banner */}
      <section className="py-16 bg-surface border-y border-border">
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
                <p className="text-sm text-muted mt-1 uppercase tracking-wider">{t(statKeys[stat.label])}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="section-padding bg-background">
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
                  {t("home.ourRoster")}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  {t("home.featuredArtists")}
                </h2>
              </div>
              <Link
                href="/artists"
                className="text-sm text-text-secondary hover:text-[#E8385D] transition-colors flex items-center gap-1"
              >
                {t("common.viewAll")} <ArrowRight size={14} />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArtists.map((artist) => (
                  <motion.div key={artist.slug} variants={fadeUp}>
                    <Link
                      href={`/artists/${artist.slug}`}
                      className="group block glass-card rounded-2xl p-6 card-hover"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#E8385D]/20 group-hover:ring-[#E8385D]/50 transition-all">
                          {artist.image ? (
                            <Image
                              src={artist.image}
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
                          <h3 className="text-lg font-bold text-foreground group-hover:text-[#E8385D] transition-colors truncate">
                            {artist.name}
                          </h3>
                          <p className="text-xs text-muted">{Array.isArray(artist.country) ? artist.country.join(", ") : artist.country}</p>
                        </div>
                      </div>
                      <p className="text-sm text-text-secondary line-clamp-2">{artist.shortBio}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {artist.genres.slice(0, 2).map((genre) => (
                          <span
                            key={genre}
                            className="text-xs px-2.5 py-1 rounded-full bg-subtle/5 text-muted"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Highlights */}
      <section className="section-padding bg-background">
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
                  Behind the Scenes
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Life at the Label
                </h2>
              </div>
              <Link
                href="/about"
                className="text-sm text-text-secondary hover:text-[#E8385D] transition-colors flex items-center gap-1"
              >
                {t("common.viewAll")} <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { src: "/images/gallery/festival-night.jpg", alt: "Festival performance", span: "col-span-2 row-span-2" },
                { src: "/images/gallery/korea-africa-forum.jpg", alt: "Korea-Africa Youth Forum 2025", span: "" },
                { src: "/images/gallery/cherry-blossoms.jpg", alt: "Cherry blossoms in Seoul", span: "" },
                { src: "/images/gallery/seaside-laughing.jpg", alt: "On tour", span: "" },
                { src: "/images/gallery/abu-dhabi-desert.jpg", alt: "Abu Dhabi desert", span: "" },
              ].map((photo) => (
                <div
                  key={photo.src}
                  className={`${photo.span} aspect-square rounded-xl overflow-hidden relative group`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.span ? 600 : 300}
                    height={photo.span ? 600 : 300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-muted mb-8">
              Featured In &amp; Partnered With
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-8 items-center">
              {[
                { src: "/images/brands/forbes-blk.png", alt: "Forbes BLK" },
                { src: "/images/brands/seoul-tourism.svg", alt: "Seoul Tourism" },
                { src: "/images/brands/korea-blockchain-week.svg", alt: "Korea Blockchain Week" },
                { src: "/images/brands/seoul-fashion-week.png", alt: "Seoul Fashion Week" },
                { src: "/images/brands/unesco-korea.png", alt: "UNESCO Korea" },
                { src: "/images/brands/korea-africa-summit.jpg", alt: "Korea-Africa Summit" },
                { src: "/images/brands/korea-mofa.svg", alt: "Ministry of Foreign Affairs" },
                { src: "/images/brands/seoul-africa-festival.svg", alt: "EDC Korea" },
                { src: "/images/brands/korea-mcst.svg", alt: "Ministry of Culture" },
                { src: "/images/brands/korea-national-assembly.png", alt: "National Assembly of Korea" },
                { src: "/images/brands/undercover-korea.png", alt: "Undercover Korea" },
                { src: "/images/brands/mobifren.png", alt: "Mobifren" },
              ].map((brand) => (
                <div key={brand.alt} className="flex items-center justify-center p-2">
                  <Image
                    src={brand.src}
                    alt={brand.alt}
                    width={100}
                    height={50}
                    className="w-full h-auto max-h-10 object-contain opacity-40 hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter + Demo CTA */}
      <section className="section-padding bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Newsletter CTA */}
            <motion.div
              className="glass-card rounded-2xl p-5 md:p-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[#E8385D] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
                {t("home.stayConnected")}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t("home.joinCircle")}
              </h2>
              <p className="text-text-secondary mb-6">
                {t("home.joinCircleDesc")}
              </p>
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={nlEmail}
                  onChange={(e) => { setNlEmail(e.target.value); if (nlError) nlReset(); }}
                  placeholder="your@email.com"
                  required
                  className="flex-1 rounded-lg bg-subtle/5 border border-border px-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none focus:border-[#E8385D] transition-colors"
                />
                <button
                  type="submit"
                  disabled={nlLoading}
                  className="rounded-lg bg-[#E8385D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#FF4D73] transition-all hover:shadow-lg hover:shadow-[#E8385D]/20 whitespace-nowrap disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {nlLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {nlSuccess ? t("common.subscribed") : t("common.subscribe")}
                </button>
              </form>
            </motion.div>

            {/* Demo CTA */}
            <motion.div
              className="glass-card rounded-2xl p-5 md:p-10 border border-[#E8385D]/20 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#E8385D]/5 blur-3xl" />
              <p className="text-[#E8385D] text-xs font-semibold uppercase tracking-[0.3em] mb-3 relative">
                {t("home.gotMusic")}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 relative">
                {t("home.submitYourDemo")}
              </h2>
              <p className="text-text-secondary mb-6 relative">
                {t("home.submitDemoDesc")}
              </p>
              <Link
                href="/demos"
                className="relative inline-flex items-center gap-2 px-8 py-3.5 bg-[#E8385D] text-white rounded-full font-semibold hover:bg-[#FF4D73] transition-all hover:shadow-lg hover:shadow-[#E8385D]/25 btn-glow"
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
