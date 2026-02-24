"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Music, Cpu, Globe, Disc } from "lucide-react";
import { roleCards, albums } from "@/data/artist";
import { InstagramFeed } from "@/components/InstagramEmbed";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const iconMap = {
  music: Music,
  cpu: Cpu,
  globe: Globe,
  disc: Disc,
} as const;

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
  href: "/ambassadorships",
};

export default function HomePage() {
  return (
    <main>
      {/* ─── Hero Section ─── */}
      <section className="hero-gradient relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="animate-float absolute top-[15%] left-[10%] h-64 w-64 rounded-full bg-[#2E86DE] opacity-10" />
        <div className="animate-float-slow absolute bottom-[20%] right-[10%] h-80 w-80 rounded-full bg-[#F39C12] opacity-10" />
        <div className="animate-float-slow absolute top-[40%] right-[25%] h-40 w-40 rounded-full bg-[#2E86DE] opacity-[0.07]" />
        <div className="animate-float absolute bottom-[35%] left-[20%] h-48 w-48 rounded-full bg-[#F39C12] opacity-[0.06]" />

        <motion.div
          className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 px-6 max-w-6xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {/* Hero Image */}
          <motion.div
            className="flex-shrink-0"
            variants={fadeUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/50">
              <Image
                src="/images/ebstar-hero.jpg"
                alt="Ebstar"
                width={590}
                height={404}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Hero Text */}
          <div className="text-center md:text-left">
            <motion.h1
              className="text-7xl md:text-9xl font-bold tracking-tight text-[#1A1A2E]"
              variants={fadeUp}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              EBSTAR
            </motion.h1>

            <motion.p
              className="mt-4 text-lg md:text-2xl text-[#1A1A2E]/70 font-medium"
              variants={fadeUp}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              From Bulawayo to Seoul
            </motion.p>

            <motion.p
              className="mt-3 text-sm md:text-base text-[#1A1A2E]/50 tracking-widest uppercase"
              variants={fadeUp}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Music &nbsp;|&nbsp; AI Research &nbsp;|&nbsp; Brand Influencer &nbsp;|&nbsp; Record Label
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4"
              variants={fadeUp}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <a
                href="#roles"
                className="rounded-full bg-[#2E86DE] px-8 py-3 text-white font-semibold shadow-lg hover:bg-[#1B5E8A] transition-colors"
              >
                Explore My Work
              </a>
              <Link
                href="/contact"
                className="rounded-full border-2 border-[#1A1A2E] px-8 py-3 text-[#1A1A2E] font-semibold hover:bg-[#1A1A2E] hover:text-white transition-colors"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── Role Cards ─── */}
      <section id="roles" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-[#1A1A2E] text-center mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            What I Do
          </motion.h2>
          <motion.p
            className="text-center text-[#1A1A2E]/60 mb-12 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            From Bulawayo to Seoul — producing music, engineering AI, building brands, and running a record label.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {roleCards.map((card) => {
              const Icon = iconMap[card.icon];
              return (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="group relative rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                >
                  {/* Color accent bar */}
                  <div
                    className="h-1.5 w-full"
                    style={{ backgroundColor: card.color }}
                  />
                  <div className="p-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${card.color}15` }}
                    >
                      <Icon size={24} style={{ color: card.color }} />
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1A2E]">
                      {card.title}
                    </h3>
                    <span
                      className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: card.color }}
                    >
                      {card.subtitle}
                    </span>
                    <p className="mt-3 text-sm text-[#1A1A2E]/60 leading-relaxed">
                      {card.description}
                    </p>
                    <Link
                      href={card.href}
                      className="mt-4 inline-block text-sm font-semibold transition-colors hover:underline"
                      style={{ color: card.color }}
                    >
                      Learn More &rarr;
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Featured Highlights ─── */}
      <section className="bg-[#F8FBFF] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-[#1A1A2E] text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            Featured Highlights
          </motion.h2>

          {/* Two-column: Latest Release + Latest Achievement */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {/* Latest Release */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow"
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
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow"
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

          {/* Quick-link cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {[
              { label: "Record Label", href: "/label", gradient: "from-[#1B5E8A] to-[#1A1A2E]" },
              { label: "Blog", href: "/blog", gradient: "from-[#F39C12] to-[#2E86DE]" },
              { label: "AI Research", href: "/ai", gradient: "from-[#2E86DE] to-[#1B5E8A]" },
            ].map((item) => (
              <motion.div key={item.label} variants={fadeUp} transition={{ duration: 0.6 }}>
                <Link
                  href={item.href}
                  className={`block rounded-2xl bg-gradient-to-br ${item.gradient} p-6 text-center text-white font-semibold text-lg shadow-md hover:shadow-xl transition-shadow`}
                >
                  {item.label} &rarr;
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="bg-[#EAF4FC] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <p className="text-4xl md:text-5xl font-bold text-[#2E86DE]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm md:text-base text-[#1A1A2E]/60">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Instagram Section ─── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-[#1A1A2E] text-center mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            Follow on Instagram
          </motion.h2>
          <motion.p
            className="text-center text-[#1A1A2E]/60 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Behind the scenes, daily life in Seoul, and more
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <InstagramFeed />
          </motion.div>
          <motion.div
            className="mt-10 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
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

      {/* ─── CTA Section ─── */}
      <section className="bg-[#2E86DE] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            Let&apos;s Build Something Together
          </motion.h2>
          <motion.p
            className="text-white/80 text-lg mb-8 max-w-xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Whether it&apos;s music production, AI research collaboration, brand partnerships,
            or event appearances — let&apos;s create something extraordinary across disciplines.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/contact"
              className="inline-block rounded-full bg-white px-10 py-4 text-[#2E86DE] font-bold text-lg shadow-lg hover:bg-[#EAF4FC] transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
