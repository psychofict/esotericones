"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { macroInfluencer, brandPartnerships, eventAppearances } from "@/data/artist";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const pressItems = [
  {
    outlet: "Yonhap News Agency (연합뉴스)",
    title: "Our Africa: Ebstar — Zimbabwean Artist & Influencer in South Korea",
    date: "2025",
    excerpt:
      "South Korea's leading wire service interviews Ebstar as part of their 'Our Africa' series, exploring his journey as a Zimbabwean musician, brand influencer, and record label founder based in Seoul.",
    url: "https://www.yna.co.kr/view/AKR20251002123900898?section=ubuntu/continent/our-africa",
  },
  {
    outlet: "More coverage",
    title: "Coming Soon",
    date: "",
    excerpt: "Additional press features and interviews will be added here.",
  },
];

// Group macro influencer roles by year
const grouped = macroInfluencer.reduce(
  (acc, item) => {
    const key = item.year;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  },
  {} as Record<string, typeof macroInfluencer>
);

const sortedYears = Object.keys(grouped).sort((a, b) => {
  const aStart = parseInt(a);
  const bStart = parseInt(b);
  return bStart - aStart;
});

// Map org names to logo paths (shared across events & roles)
const orgLogos: Record<string, string> = {
  "Seoul Tourism Organisation": "/images/brands/seoul-tourism.svg",
  "South Korea National Assembly": "/images/brands/korea-national-assembly.png",
  "Forbes BLK": "/images/brands/forbes-blk.png",
  "Korea-Africa Summit": "/images/brands/korea-africa-summit.jpg",
  "Gyeonggi Provincial Government": "/images/brands/gyeonggi.svg",
  "KOFICE / Ministry of Culture, Sports and Tourism": "/images/brands/korea-mcst.svg",
  "Korea Ministry of Foreign Affairs": "/images/brands/korea-mofa.svg",
  "Busan Metropolitan Government": "/images/brands/busan.svg",
  "Ministry of Foreign Affairs / Busan Metropolitan Govt": "/images/brands/korea-mofa.svg",
  "UNESCO Korea / KOCIS": "/images/brands/unesco-korea.png",
  "Hello World Korea": "/images/brands/hello-world-korea.svg",
  "Jeonnam Provincial Government": "/images/brands/jeonnam.svg",
  "Geumsan County": "/images/brands/geumsan-county.png",
  "DDP Seoul": "/images/brands/ddp-seoul.svg",
  "Jeonju City": "/images/brands/jeonju-city.png",
  "Korea Blockchain Week": "/images/brands/korea-blockchain-week.svg",
  "Korea Fashion Week": "/images/brands/seoul-fashion-week.png",
  "Seoul Africa Festival": "/images/brands/seoul-africa-festival.svg",
  "GINCON National Assembly Ceremony": "/images/brands/gincon-national-assembly.png",
  "Geumsan Insam Festival": "/images/brands/geumsan-county.png",
  "DDP Seoul Light": "/images/brands/ddp-seoul.svg",
  "Gumi City": "/images/brands/gumi-city.png",
  "Samcheok City": "/images/brands/samcheok-city.png",
  "Cheorwon-gun": "/images/brands/cheorwon-gun.svg",
  "Daegu City": "/images/brands/daegu-city.svg",
  "Yeongwol-gun": "/images/brands/yeongwol-gun.png",
  "Korea-Africa Startup Forum": "/images/brands/korea-africa-summit.jpg",
  "Zimbabwean Community in South Korea (ZCSK)": "/images/brands/zcsk.jpg",
  "The Esoteric Ones Records": "/images/brands/the-esoteric-ones.jpg",
};

function OrgLogo({ name, size = 40 }: { name: string; size?: number }) {
  const logo = orgLogos[name];
  if (!logo) return null;
  return (
    <div className="flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      {logo.endsWith(".svg") ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={logo} alt={name} className="max-w-full max-h-full object-contain" />
      ) : (
        <Image src={logo} alt={name} width={size} height={size} className="max-w-full max-h-full object-contain" />
      )}
    </div>
  );
}

const eventTypeColors: Record<string, string> = {
  Tech: "bg-[#2E86DE]/10 text-[#2E86DE]",
  Fashion: "bg-[#E1306C]/10 text-[#E1306C]",
  Culture: "bg-[#F39C12]/10 text-[#F39C12]",
  Government: "bg-[#1B5E8A]/10 text-[#1B5E8A]",
  Travel: "bg-[#27AE60]/10 text-[#27AE60]",
};

export default function MacroInfluencerPage() {
  let globalIndex = 0;

  return (
    <main className="min-h-screen bg-white text-[#1A1A2E]">
      {/* Hero */}
      <section className="relative overflow-hidden py-28 px-6 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/macro-influencer-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#EAF4FC]/65" />
        <div className="animate-float absolute top-[20%] left-[8%] h-48 w-48 rounded-full bg-[#F39C12] opacity-[0.07]" />
        <div className="animate-float-slow absolute bottom-[15%] right-[10%] h-64 w-64 rounded-full bg-[#2E86DE] opacity-[0.07]" />

        <motion.div
          className="relative z-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.p
            className="text-[#F39C12] uppercase tracking-[0.35em] text-sm font-medium mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Macro Influencer
          </motion.p>
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Partnerships, Events & Influence
          </motion.h1>
          <motion.p
            className="text-lg text-[#1A1A2E]/60 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            One of South Korea&apos;s most recognized foreign macro influencers and socialites — collaborating with
            global brands, headlining major events, and advising at the highest levels of government.
            A dynamic African public figure who thrives in the spotlight, radiating charisma and
            transforming every gathering into a memorable celebration.
          </motion.p>
        </motion.div>
      </section>

      {/* Stats Banner */}
      <section className="bg-white py-16">
        <motion.div
          className="max-w-5xl mx-auto px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "150K+", label: "Followers" },
              { value: "10M+", label: "Social Views" },
              { value: "50+", label: "Brand Partners" },
              { value: `${macroInfluencer.length}+`, label: "Gov. Appointments" },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <p className="text-4xl md:text-5xl font-bold text-[#F39C12]">{stat.value}</p>
                <p className="mt-2 text-sm text-[#1A1A2E]/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Brand Partnerships */}
      <section className="bg-[#F8FBFF] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-center mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Brand Partnerships
          </motion.h2>
          <motion.p
            className="text-center text-[#1A1A2E]/50 mb-12 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Working with leading brands across travel, tech, and government to create impactful campaigns.
          </motion.p>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {brandPartnerships.map((brand, i) => (
              <motion.div
                key={brand.name}
                variants={cardVariant}
                custom={i}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 text-center hover:shadow-md hover:border-[#F39C12]/40 transition-all flex flex-col items-center"
              >
                {brand.logo && (
                  <div className="w-12 h-12 mb-3 flex items-center justify-center">
                    {brand.logo.endsWith(".svg") ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={48}
                        height={48}
                        className="max-w-full max-h-full object-contain"
                      />
                    )}
                  </div>
                )}
                <p className="font-semibold text-[#1A1A2E]">{brand.name}</p>
                <p className="mt-1 text-xs text-[#1A1A2E]/40">{brand.category}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Event Appearances */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-center mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Event Appearances
          </motion.h2>
          <motion.p
            className="text-center text-[#1A1A2E]/50 mb-12 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            VIP guest and speaker at South Korea&apos;s biggest events across tech, fashion, and culture.
          </motion.p>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {eventAppearances.map((event, i) => (
              <motion.div
                key={event.name}
                variants={cardVariant}
                custom={i}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 hover:shadow-md hover:border-[#F39C12]/40 transition-all flex flex-col items-center text-center"
                whileHover={{ scale: 1.03 }}
              >
                <OrgLogo name={event.name} size={44} />
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider mt-3 mb-2 ${eventTypeColors[event.type] || "bg-gray-100 text-gray-600"}`}>
                  {event.type}
                </span>
                <h3 className="text-lg font-semibold leading-snug">{event.name}</h3>
                <p className="mt-1 text-sm text-[#1A1A2E]/40">{event.year}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Government & Official Roles */}
      <section className="bg-[#F8FBFF] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-center mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Government & Official Roles
          </motion.h2>
          <motion.p
            className="text-center text-[#1A1A2E]/50 mb-12 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Appointed to official roles by the Korean government, provincial bodies, and international organizations.
          </motion.p>

          {sortedYears.map((year) => {
            const items = grouped[year];
            return (
              <div key={year} className="mb-12 last:mb-0">
                <motion.h3
                  className="text-xl font-bold mb-6 text-[#F39C12]"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {year}
                </motion.h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((amb) => {
                    const idx = globalIndex++;
                    return (
                      <motion.div
                        key={`${amb.org}-${amb.role}`}
                        className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 hover:border-[#F39C12]/40 hover:shadow-md transition-all cursor-default flex items-start gap-4"
                        custom={idx}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={cardVariant}
                        whileHover={{ scale: 1.03 }}
                      >
                        <OrgLogo name={amb.org} size={36} />
                        <div>
                          <h4 className="text-lg font-semibold mb-1 leading-snug">
                            {amb.role}
                          </h4>
                          <p className="text-sm text-[#1A1A2E]/50">{amb.org}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Press Coverage */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            In the Press
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {pressItems.map((article, i) => {
              const Wrapper = article.url ? "a" : "div";
              const linkProps = article.url
                ? { href: article.url, target: "_blank" as const, rel: "noopener noreferrer" }
                : {};
              return (
                <motion.div
                  key={article.title}
                  className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:border-[#F39C12]/40 hover:shadow-md transition-all"
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariant}
                  whileHover={{ scale: 1.03 }}
                >
                  <Wrapper {...linkProps} className={article.url ? "block" : ""}>
                    <div className="h-32 relative overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1504711434473-57c8cd4e5de7?w=640&q=80"
                        alt="Press coverage"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#EAF4FC]/40 to-[#2E86DE]/10" />
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-[#F39C12] font-medium mb-2">
                        {article.outlet} &middot; {article.date}
                      </p>
                      <h3 className="font-semibold leading-snug mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-[#1A1A2E]/50 leading-relaxed">
                        {article.excerpt}
                      </p>
                      {article.url && (
                        <p className="text-xs text-[#2E86DE] font-medium mt-3">
                          Read article &rarr;
                        </p>
                      )}
                    </div>
                  </Wrapper>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540575467063-ba8db27f82e5?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-[#EAF4FC]/65" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Let&apos;s Work Together
          </motion.h2>
          <motion.p
            className="text-[#1A1A2E]/60 text-lg mb-8 max-w-xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Open to brand partnerships, event appearances, campaign collaborations,
            and macro influencer opportunities.
          </motion.p>
          <motion.a
            href="/contact"
            className="inline-block rounded-full bg-[#F39C12] px-10 py-4 text-white font-bold text-lg shadow-lg hover:bg-[#d4860f] transition-colors"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Get in Touch
          </motion.a>
        </div>
      </section>
    </main>
  );
}
