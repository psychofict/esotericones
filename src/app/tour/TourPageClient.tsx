"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { fadeUp, stagger } from "@/lib/animations";
import { useTranslation } from "@/i18n/useTranslation";

const pastEventPhotos = [
  { src: "/images/gallery/festival-night.jpg", alt: "EDC Korea 2025", caption: "EDC Korea 2025" },
  { src: "/images/gallery/four-seasons-speech.jpg", alt: "Korea Africa Summit 2025", caption: "Korea Africa Summit 2025" },
  { src: "/images/gallery/korea-africa-forum.jpg", alt: "Korea-Africa Youth Forum 2025", caption: "Korea-Africa Youth Forum 2025" },
  { src: "/images/gallery/southern-africa-tour-2024.jpg", alt: "Southern Africa Tour", caption: "Southern Africa Tour 2024" },
  { src: "/images/gallery/tripadvisor-seoul-event.jpg", alt: "Global Seoulmate 2025", caption: "Global Seoulmate 2025" },
  { src: "/images/gallery/thailand-tour-poster.jpg", alt: "Thailand Tour 2024", caption: "Thailand Tour 2024" },
];

export default function TourPageClient() {
  const { t } = useTranslation();
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    const anchor = document.createElement("a");
    anchor.href = "https://www.songkick.com/artists/10171965";
    anchor.className = "songkick-widget";
    anchor.dataset.theme = "dark";
    anchor.dataset.trackButton = "on";
    anchor.dataset.detectStyle = "off";
    anchor.dataset.backgroundColor = "rgb(10,10,10,1)";
    anchor.dataset.fontColor = "rgb(245,245,245,1)";
    anchor.dataset.buttonBgColor = "rgb(232,56,93,1)";
    anchor.dataset.buttonTextColor = "rgb(255,255,255,1)";
    anchor.dataset.locale = "en";
    anchor.dataset.otherArtists = "on";
    anchor.dataset.shareButton = "on";
    anchor.dataset.countryFilter = "on";
    anchor.dataset.rsvp = "on";
    anchor.dataset.requestShow = "on";
    anchor.dataset.pastEvents = "off";
    anchor.dataset.pastEventsOfftour = "off";
    anchor.dataset.remindMe = "off";
    anchor.style.display = "none";
    widgetRef.current.appendChild(anchor);

    const script = document.createElement("script");
    script.src = "https://widget-app.songkick.com/injector/10171965";
    script.async = true;
    widgetRef.current.appendChild(script);

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <main id="main-content" className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 px-6">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-1/3 left-[15%] w-64 h-64 rounded-full bg-[#E8385D]/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-[10%] w-48 h-48 rounded-full bg-[#E8385D]/3 blur-3xl animate-float-slow" />

        <motion.div
          className="relative z-10 max-w-7xl mx-auto"
          variants={stagger(0.15)}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="mb-6 w-16 h-16 rounded-2xl bg-[#E8385D]/10 flex items-center justify-center"
            variants={fadeUp}
          >
            <MapPin className="w-8 h-8 text-[#E8385D]" />
          </motion.div>

          <motion.p
            className="text-[#E8385D] text-xs font-semibold uppercase tracking-[0.3em] mb-3"
            variants={fadeUp}
          >
            {t("tour.liveShows")}
          </motion.p>

          <motion.h1
            className="text-4xl md:text-6xl font-bold text-foreground mb-4"
            variants={fadeUp}
          >
            {t("tour.title")}
          </motion.h1>

          <motion.p
            className="text-lg text-text-secondary max-w-2xl"
            variants={fadeUp}
          >
            {t("tour.description")}
          </motion.p>
        </motion.div>
      </section>

      {/* Songkick Widget */}
      <section className="section-padding px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            ref={widgetRef}
            className="min-h-[200px] glass-card rounded-2xl p-4 md:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </section>

      {/* Past Events Gallery */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Past Events</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {pastEventPhotos.map((photo, i) => (
                <motion.div
                  key={photo.src}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-3 text-white text-sm font-medium">{photo.caption}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Book CTA */}
      <section className="section-padding px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="glass-card rounded-2xl p-5 md:p-12 border border-[#E8385D]/20 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#E8385D]/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#E8385D]/5 blur-3xl" />

            <p className="text-[#E8385D] text-xs font-semibold uppercase tracking-[0.3em] mb-3 relative">
              {t("tour.bookNow")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 relative">
              {t("tour.bookHeading")}
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-lg mx-auto relative">
              {t("tour.bookDescription")}
            </p>
            <Link
              href="/contact"
              className="relative inline-flex items-center gap-2 px-8 py-3.5 bg-[#E8385D] text-white rounded-full font-semibold hover:bg-[#FF4D73] transition-all hover:shadow-lg hover:shadow-[#E8385D]/25 btn-glow"
            >
              {t("about.getInTouch")} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
