"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { label, labelTimeline, labelGenres, labelStats } from "@/data/label";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import type { TranslationKeys } from "@/i18n/types";
import { statKeys, statIcons } from "@/lib/statConfig";

const timelineKeys: Record<number, keyof TranslationKeys> = {
  2023: "about.timeline.2023",
  2024: "about.timeline.2024",
  2025: "about.timeline.2025",
};

export default function AboutPageClient() {
  const { t } = useTranslation();
  return (
    <main id="main-content" className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/ebstar-hero.jpg"
            alt="The ESOTERIC Ones background"
            width={1920}
            height={600}
            className="w-full h-full object-cover blur-2xl opacity-15 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/90 to-background" />
        </div>
        <div className="mx-auto max-w-7xl relative">
          <motion.p
            className="text-[#E8385D] text-xs font-semibold uppercase tracking-[0.3em] mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {t("about.ourStory")}
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t("about.aboutTheLabel")}
          </motion.h1>
          <motion.p
            className="text-lg text-text-secondary max-w-3xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t("about.aboutDesc").replace("{displayName}", label.displayName).replace("{founded}", String(label.founded)).replace("{founder}", label.founder).replace("{founderRealName}", label.founderRealName)}
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="glass-card rounded-2xl p-5 md:p-12 border border-[#E8385D]/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/images/esoteric-blk.jpg"
                alt="The ESOTERIC Ones"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <h2 className="text-2xl font-bold text-foreground">{t("about.ourMission")}</h2>
            </div>
            <p className="text-text-secondary leading-relaxed max-w-3xl">
              {t("about.missionText")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
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
              <motion.div key={stat.label} variants={fadeUp} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E8385D]/10 text-[#E8385D] mb-3">
                  {statIcons[stat.icon]}
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</p>
                <p className="text-sm text-muted mt-1 uppercase tracking-wider">{t(statKeys[stat.label])}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={stagger()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-foreground mb-10">
              {t("about.timeline")}
            </motion.h2>
            <div className="space-y-8 relative">
              {/* Vertical line */}
              <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" />

              {labelTimeline.map((item) => (
                <motion.div
                  key={item.year}
                  variants={fadeUp}
                  className="flex gap-6 relative"
                >
                  <div className="w-10 h-10 rounded-full bg-[#E8385D]/10 border-2 border-[#E8385D] flex items-center justify-center flex-shrink-0 z-10">
                    <span className="text-xs font-bold text-[#E8385D]">{item.year}</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-text-secondary leading-relaxed">{t(timelineKeys[item.year])}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Genres */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">{t("about.ourSound")}</h2>
            <div className="flex flex-wrap gap-3">
              {labelGenres.map((genre) => (
                <span
                  key={genre}
                  className="px-5 py-2.5 rounded-full bg-subtle/5 text-sm text-text-secondary border border-border"
                >
                  {genre}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Spotlight */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="glass-card rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src="/images/gallery/four-seasons-speech.jpg"
                  alt="Ebstar speaking at an event"
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-foreground mb-4">{t("about.theFounder")}</h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {t("about.founderBio").replace("{displayName}", label.displayName).replace("{founded}", String(label.founded))}
                </p>
                <Link
                  href="/artists/ebstar"
                  className="inline-flex items-center gap-2 text-sm text-[#E8385D] hover:text-[#FF4D73] transition-colors"
                >
                  {t("about.viewArtistProfile")} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { src: "/images/gallery/festival-night.jpg", alt: "Festival performance" },
                { src: "/images/gallery/korea-africa-forum.jpg", alt: "Korea-Africa Forum" },
                { src: "/images/gallery/han-river-seoul.jpg", alt: "Han River, Seoul" },
                { src: "/images/gallery/cherry-blossoms.jpg", alt: "Cherry blossoms in Seoul" },
                { src: "/images/gallery/southern-africa-tour-2024.jpg", alt: "Southern Africa Tour 2024" },
                { src: "/images/gallery/forbes-blk-cover.jpg", alt: "Forbes BLK feature" },
                { src: "/images/gallery/graduation-portrait.jpg", alt: "Graduation portrait" },
                { src: "/images/gallery/tokyo-night.jpg", alt: "Tokyo at night" },
                { src: "/images/gallery/london-big-ben.jpg", alt: "London, Big Ben" },
                { src: "/images/gallery/jeju-coast.jpg", alt: "Jeju Island coast" },
                { src: "/images/gallery/maya-bay-thailand.jpg", alt: "Maya Bay, Thailand" },
                { src: "/images/gallery/global-influencer-award.jpg", alt: "Global Influencer Award" },
                { src: "/images/gallery/abu-dhabi-desert.jpg", alt: "Abu Dhabi desert" },
                { src: "/images/gallery/with-lion.jpg", alt: "With a lion" },
                { src: "/images/gallery/graduation-campus.jpg", alt: "Graduation campus" },
                { src: "/images/gallery/spotify-wrapped.jpg", alt: "Spotify Wrapped highlights" },
                { src: "/images/gallery/forbes-blk-certificate.jpg", alt: "Forbes BLK certificate" },
                { src: "/images/gallery/street-portrait-korea.jpg", alt: "Street portrait, Korea" },
                { src: "/images/gallery/echoes-of-love-streams-milestone.jpg", alt: "Echoes of Love streaming milestone" },
                { src: "/images/gallery/southern-africa-tour-2025.jpg", alt: "Southern Africa Tour 2025" },
              ].map((photo, i) => (
                <motion.div
                  key={photo.src}
                  className="aspect-square rounded-xl overflow-hidden relative group"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners & Collaborators */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Partners &amp; Collaborators</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 items-center">
              {[
                { src: "/images/brands/forbes-blk.png", alt: "Forbes BLK" },
                { src: "/images/brands/seoul-tourism.svg", alt: "Seoul Tourism" },
                { src: "/images/brands/korea-blockchain-week.svg", alt: "Korea Blockchain Week" },
                { src: "/images/brands/seoul-fashion-week.png", alt: "Seoul Fashion Week" },
                { src: "/images/brands/unesco-korea.png", alt: "UNESCO Korea" },
                { src: "/images/brands/korea-africa-summit.jpg", alt: "Korea-Africa Summit" },
                { src: "/images/brands/korea-mofa.svg", alt: "Ministry of Foreign Affairs" },
                { src: "/images/brands/korea-mcst.svg", alt: "Ministry of Culture" },
                { src: "/images/brands/seoul-africa-festival.svg", alt: "Seoul Africa Festival" },
                { src: "/images/brands/korea-national-assembly.png", alt: "National Assembly of Korea" },
                { src: "/images/brands/undercover-korea.png", alt: "Undercover Korea" },
                { src: "/images/brands/gyeonggi.svg", alt: "Gyeonggi Province" },
                { src: "/images/brands/jetpac.png", alt: "Jetpac" },
                { src: "/images/brands/mobifren.png", alt: "Mobifren" },
                { src: "/images/brands/busan.svg", alt: "Busan" },
                { src: "/images/brands/jeonju-city.png", alt: "Jeonju City" },
                { src: "/images/brands/gumi-city.png", alt: "Gumi City" },
                { src: "/images/brands/samcheok-city.png", alt: "Samcheok City" },
              ].map((brand) => (
                <div key={brand.alt} className="flex items-center justify-center p-3 rounded-xl bg-subtle/5 aspect-[3/2]">
                  <Image
                    src={brand.src}
                    alt={brand.alt}
                    width={120}
                    height={60}
                    className="w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("about.wantToBePart")}</h2>
            <p className="text-text-secondary mb-8">
              {t("about.lookingForArtists")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demos"
                className="px-8 py-3.5 bg-[#E8385D] text-white rounded-full font-semibold hover:bg-[#FF4D73] transition-colors btn-glow"
              >
                {t("about.submitADemo")}
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 border border-border text-foreground rounded-full font-semibold hover:bg-subtle/5 transition-colors"
              >
                {t("about.getInTouch")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
