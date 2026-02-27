"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { roleCards, albums } from "@/data/artist";
import { InstagramFeed } from "@/components/InstagramEmbed";
import SectionDivider from "@/components/SectionDivider";
import { fadeUp, stagger } from "@/lib/animations";

const roleCardImages: Record<string, string> = {
  "Record Producer": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=640&q=80",
  "AI/ML Engineer": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=640&q=80",
  "Macro Influencer": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=640&q=80",
  "Record Label Founder": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=640&q=80",
};

const stats = [
  { value: "5M+", label: "Total Streams" },
  { value: "150K+", label: "Followers" },
  { value: "50+", label: "Brand Partnerships" },
  { value: "2", label: "Publications" },
];

const latestAlbum = albums[albums.length - 1];
const featuredHighlight = {
  title: "Forbes BLK Member & Korea-Africa Summit",
  excerpt: "Inducted into Forbes BLK in 2024 and met the Zimbabwean President at the Korea-Africa Summit — bridging worlds at the highest level.",
  href: "/macro-influencer",
};

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main id="main-content">
      {/* ─── Hero Section ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-end justify-center overflow-hidden"
      >
        {/* Parallax background image */}
        <motion.div
          className="absolute inset-0"
          style={{ y: heroImageY, scale: heroImageScale }}
        >
          <Image
            src="/images/ebstar-hero.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>

        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/30 via-transparent to-[#1A1A2E]/30" />

        {/* Noise overlay */}
        <div className="noise-overlay absolute inset-0" />

        <motion.div
          className="relative z-10 text-center px-6 pb-20 max-w-4xl mx-auto"
          style={{ opacity: heroContentOpacity }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {/* Pre-title */}
          <motion.p
            className="text-[#F39C12] uppercase tracking-[0.3em] text-sm font-medium mb-4"
            variants={fadeUp}
          >
            Seoul, South Korea
          </motion.p>

          <motion.h1
            className="text-5xl sm:text-7xl md:text-[10rem] font-bold tracking-tight text-white leading-none"
            variants={fadeUp}
          >
            EBSTAR
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-2xl text-white/80 font-medium"
            variants={fadeUp}
          >
            AI by Profession. Music by Obsession. Travel by Instinct.
          </motion.p>

          {/* Pill badges instead of pipe-separated list */}
          <motion.div
            className="mt-4 flex flex-wrap items-center justify-center gap-2"
            variants={fadeUp}
          >
            {["Music", "AI Research", "Macro Influencer", "Record Label"].map((role) => (
              <span
                key={role}
                className="rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-1.5 text-sm text-white/70"
              >
                {role}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeUp}
          >
            <motion.a
              href="#roles"
              className="group w-full sm:w-auto rounded-full bg-[#2E86DE] px-8 py-4 sm:py-3 text-white font-semibold shadow-lg shadow-[#2E86DE]/30 hover:bg-[#2575C5] transition-all inline-flex items-center justify-center gap-2 btn-glow"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore My Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto rounded-full border border-white/30 px-8 py-4 sm:py-3 text-white font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-16 flex flex-col items-center gap-2"
            variants={fadeUp}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={24} className="text-white/40" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Role Cards ─── */}
      <section id="roles" className="bg-white section-padding">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-[#1A1A2E] text-center mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            What I Do
          </motion.h2>
          <motion.p
            className="text-center text-[#1A1A2E]/60 mb-12 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            AI by profession. Music by obsession. Travel by instinct — producing music, engineering AI, building brands, and running a record label.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger(0.15)}
          >
            {roleCards.map((card) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                whileTap={{ scale: 0.98 }}
                className="group relative h-72 md:h-80 rounded-3xl overflow-hidden cursor-pointer"
              >
                {/* Background image */}
                {roleCardImages[card.title] && (
                  <Image
                    src={roleCardImages[card.title]}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/90 via-[#1A1A2E]/40 to-transparent" />

                {/* Content pinned at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3"
                    style={{ backgroundColor: card.color }}
                  >
                    {card.subtitle}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed mb-3 line-clamp-2">
                    {card.description}
                  </p>
                  <Link
                    href={card.href}
                    className="group/link inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-[#F39C12] transition-colors"
                  >
                    Learn More
                    <ArrowRight size={14} className="group-hover/link:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Featured Highlights ─── */}
      <section className="bg-[#F8FBFF] section-padding">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-[#1A1A2E] text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            Featured Highlights
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger(0.15)}
          >
            {/* Latest Release */}
            <motion.div
              variants={fadeUp}
              whileTap={{ scale: 0.98 }}
              className="rounded-2xl overflow-hidden bg-white shadow-md card-hover"
            >
              <div className="aspect-square relative">
                <Image
                  src="/images/maknaebe-cover.jpg"
                  alt={latestAlbum.title}
                  width={640}
                  height={640}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-[#2E86DE] uppercase tracking-wider">Latest Release</span>
                <h3 className="mt-2 text-xl font-bold text-[#1A1A2E]">{latestAlbum.title}</h3>
                <p className="mt-1 text-sm text-[#1A1A2E]/50">
                  {latestAlbum.year}{latestAlbum.artist ? ` · ${latestAlbum.artist}` : ""}
                </p>
                <p className="mt-2 text-sm text-[#1A1A2E]/60 leading-relaxed">
                  Ebstar&apos;s 3rd album — an emotional and reflective journey with a happy ending.
                </p>
                <Link
                  href="/music"
                  className="mt-4 inline-block rounded-full bg-[#2E86DE] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1B5E8A] transition-colors"
                >
                  Listen Now
                </Link>
              </div>
            </motion.div>

            {/* Featured Highlight — Forbes BLK */}
            <motion.div
              variants={fadeUp}
              whileTap={{ scale: 0.98 }}
              className="rounded-2xl overflow-hidden bg-white shadow-md card-hover"
            >
              <div className="aspect-square relative overflow-hidden">
                <iframe
                  src="https://www.instagram.com/p/C8Ubeh0Btpe/embed/"
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Forbes BLK Instagram Post"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-[#F39C12] uppercase tracking-wider">Featured Highlight</span>
                <h3 className="mt-2 text-xl font-bold text-[#1A1A2E]">{featuredHighlight.title}</h3>
                <p className="mt-1 text-sm text-[#1A1A2E]/50 line-clamp-2">
                  {featuredHighlight.excerpt}
                </p>
                <Link
                  href={featuredHighlight.href}
                  className="mt-4 inline-block rounded-full bg-[#F39C12] px-5 py-2 text-sm font-semibold text-white hover:bg-[#d4860f] transition-colors"
                >
                  See More
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="gradient" direction="tint-to-light" />

      {/* ─── Stats Bar ─── */}
      <section className="relative section-padding overflow-hidden noise-overlay">
        <div className="absolute inset-0 bg-[#1A1A2E]" />
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger(0.15)}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
              >
                <p className="text-3xl sm:text-4xl md:text-6xl font-bold text-gradient">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs md:text-sm text-white/50 uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Instagram Section ─── */}
      <section className="bg-white section-padding">
        <div className="mx-auto max-w-4xl px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-[#1A1A2E] text-center mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            Follow on Instagram
          </motion.h2>
          <motion.p
            className="text-center text-[#1A1A2E]/60 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            Behind the scenes, daily life in Seoul, and more
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <InstagramFeed />
          </motion.div>
          <motion.div
            className="mt-10 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <a
              href="https://instagram.com/ebstarmusic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-gradient-to-r from-[#E1306C] to-[#F39C12] px-8 py-3 text-white font-semibold shadow-lg hover:opacity-90 transition-opacity"
            >
              Follow @ebstarmusic
            </a>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="gradient" direction="light-to-tint" />

      {/* ─── CTA Section ─── */}
      <section className="relative section-padding overflow-hidden noise-overlay">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/images/ebstar-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#1A1A2E]/85" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <motion.p
            className="text-[#F39C12] uppercase tracking-[0.3em] text-sm font-medium mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            Collaborate
          </motion.p>
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            Let&apos;s Build Something Together
          </motion.h2>
          <motion.p
            className="text-white/70 text-lg mb-8 max-w-xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            Whether it&apos;s music production, AI research collaboration, brand partnerships,
            or event appearances — let&apos;s create something extraordinary across disciplines.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                href="/contact"
                className="inline-block rounded-full bg-white px-10 py-4 text-[#2E86DE] font-bold text-lg shadow-xl hover:bg-[#EAF4FC] transition-colors"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
