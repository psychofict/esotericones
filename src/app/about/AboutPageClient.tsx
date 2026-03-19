"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { label, labelTimeline, labelGenres, labelStats } from "@/data/label";
import { ArrowRight, Users, Globe, Headphones, Disc3 } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import type { TranslationKeys } from "@/i18n/types";

const statKeys: Record<string, keyof TranslationKeys> = {
  "Artists": "stats.artists",
  "Total Streams": "stats.totalStreams",
  "Countries": "stats.countries",
  "Releases": "stats.releases",
};

const timelineKeys: Record<number, keyof TranslationKeys> = {
  2023: "about.timeline.2023",
  2024: "about.timeline.2024",
  2025: "about.timeline.2025",
};

const statIcons: Record<string, React.ReactNode> = {
  users: <Users className="w-5 h-5" />,
  headphones: <Headphones className="w-5 h-5" />,
  globe: <Globe className="w-5 h-5" />,
  disc: <Disc3 className="w-5 h-5" />,
};

export default function AboutPageClient() {
  const { t } = useTranslation();
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
            className="glass-card rounded-2xl p-8 md:p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">{t("about.theFounder")}</h2>
            <p className="text-text-secondary leading-relaxed max-w-3xl mb-6">
              {t("about.founderBio").replace("{displayName}", label.displayName).replace("{founded}", String(label.founded))}
            </p>
            <Link
              href="/artists/ebstar"
              className="inline-flex items-center gap-2 text-sm text-[#E8385D] hover:text-[#FF4D73] transition-colors"
            >
              {t("about.viewArtistProfile")} <ArrowRight size={14} />
            </Link>
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
