"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Music, Cpu, Globe, Disc } from "lucide-react";
import { artist, timeline, unifiedBio } from "@/data/artist";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const iconMap = {
  music: Music,
  cpu: Cpu,
  globe: Globe,
  disc: Disc,
} as const;

const epkCards = [
  {
    title: "Press Photos",
    description: "High-resolution promotional images",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
      </svg>
    ),
  },
  {
    title: "One Sheet",
    description: "Artist biography and key facts",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    title: "Logo Assets",
    description: "Logos and branding guidelines",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V15m0 0-2.25 1.313M3 16.5v-2.25m0 0 2.25 1.313M3 14.25l2.25-1.313m0 0L12 9.75l6.75 3.188M21 16.5v-2.25m0 0-2.25 1.313m2.25-1.313-2.25-1.313" />
      </svg>
    ),
  },
  {
    title: "Technical Rider",
    description: "Stage and equipment requirements",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  const bioParagraphs = unifiedBio.intro.split("\n\n");

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#EAF4FC] py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/ebstar-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#EAF4FC]/65" />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-[#1A1A2E] mb-4"
          >
            About{" "}
            <span className="text-[#2E86DE]">Ebstar</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[#1A1A2E]/60 max-w-xl mx-auto"
          >
            {artist.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 text-sm text-[#1A1A2E]/40"
          >
            {artist.from} &middot; Based in {artist.basedIn}
          </motion.div>
        </div>
      </section>

      {/* Role Highlights */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-[#1A1A2E] mb-10 text-center"
          >
            What I Do
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {unifiedBio.roles.map((role) => {
              const Icon = iconMap[role.icon];
              return (
                <motion.div
                  key={role.title}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100 bg-white shadow-sm"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#EAF4FC] text-[#2E86DE] flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A2E] text-lg">{role.title}</h3>
                    <p className="mt-1 text-sm text-[#1A1A2E]/60 leading-relaxed">{role.summary}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_380px] gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-[#1A1A2E] mb-8">
              The Story
            </h2>
            <div className="space-y-6">
              {bioParagraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-[#1A1A2E]/80 text-lg leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="sticky top-24 rounded-2xl overflow-hidden shadow-lg aspect-[3/4]">
              <Image
                src="/images/ebstar-hero.jpg"
                alt="Ebstar"
                fill
                className="object-cover"
                sizes="380px"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Genre Tags */}
      <section className="pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl font-bold text-[#1A1A2E] mb-5"
          >
            Genres
          </motion.h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            {artist.genres.map((genre) => (
              <motion.span
                key={genre}
                variants={itemVariants}
                className="px-4 py-2 rounded-full border-2 border-[#2E86DE] text-[#2E86DE] text-sm font-semibold hover:bg-[#2E86DE] hover:text-white transition-colors duration-300 cursor-default"
              >
                {genre}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-[#EAF4FC]/70" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-[#1A1A2E] mb-12 text-center"
          >
            Timeline
          </motion.h2>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:block relative">
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-[#2E86DE]/20" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-6 gap-4 relative"
            >
              {timeline.map((item) => (
                <motion.div
                  key={item.year}
                  variants={itemVariants}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-4 h-4 rounded-full bg-[#2E86DE] border-4 border-[#EAF4FC] shadow-sm z-10 mb-4" />
                  <span className="text-2xl font-black text-[#2E86DE] mb-2">
                    {item.year}
                  </span>
                  <p className="text-sm text-[#1A1A2E]/70 leading-snug">
                    {item.event}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="md:hidden relative">
            <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-[#2E86DE]/20" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-10 relative"
            >
              {timeline.map((item) => (
                <motion.div
                  key={item.year}
                  variants={itemVariants}
                  className="flex items-start gap-6"
                >
                  <div className="w-3 h-3 rounded-full bg-[#2E86DE] border-4 border-white shadow-sm flex-shrink-0 mt-2 relative left-[2px]" />
                  <div>
                    <span className="text-2xl font-black text-[#2E86DE] block mb-1">
                      {item.year}
                    </span>
                    <p className="text-sm text-[#1A1A2E]/70 leading-relaxed">
                      {item.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* EPK Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-[#1A1A2E] mb-3"
          >
            Electronic Press Kit
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#1A1A2E]/60 mb-10"
          >
            Download assets for press, events, and promotions.
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {epkCards.map((card) => (
              <motion.div
                key={card.title}
                variants={itemVariants}
                className="relative flex items-start gap-4 p-6 rounded-2xl border border-gray-100 bg-white opacity-60 cursor-default"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#EAF4FC] text-[#2E86DE]/50 flex items-center justify-center">
                  {card.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#1A1A2E] mb-1">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {card.description}
                  </p>
                </div>
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F39C12]/10 text-[#F39C12] uppercase tracking-wider">
                  Coming Soon
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
