"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { fadeUp, stagger } from "@/lib/animations";
import SectionDivider from "@/components/SectionDivider";

const containerVariants = stagger(0.15);
const itemVariants = fadeUp;

export default function TourPage() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    // Create the Songkick anchor element
    const anchor = document.createElement("a");
    anchor.href = "https://www.songkick.com/artists/10171965";
    anchor.className = "songkick-widget";
    anchor.dataset.theme = "dark";
    anchor.dataset.trackButton = "on";
    anchor.dataset.detectStyle = "off";
    anchor.dataset.backgroundColor = "rgb(0,0,0,1)";
    anchor.dataset.fontColor = "rgb(255,255,255,1)";
    anchor.dataset.buttonBgColor = "rgb(255,255,255,1)";
    anchor.dataset.buttonTextColor = "rgb(0,0,0,1)";
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

    // Load the Songkick widget script
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
    <main id="main-content" className="min-h-screen bg-white text-[#1A1A2E]">
      {/* Hero */}
      <section className="relative overflow-hidden py-28 px-6 text-center bg-[#EAF4FC]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2E86DE]/10 via-transparent to-transparent" />
        <div className="noise-overlay absolute inset-0" />

        <motion.div
          className="relative z-10 max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-white/60 flex items-center justify-center"
            variants={itemVariants}
          >
            <MapPin className="w-10 h-10 text-[#2E86DE]" />
          </motion.div>

          <motion.p
            className="text-[#F39C12] uppercase tracking-[0.35em] text-sm font-medium mb-4"
            variants={itemVariants}
          >
            Live Shows
          </motion.p>

          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
            variants={itemVariants}
          >
            Tour Dates
          </motion.h1>

          <motion.p
            className="text-[#1A1A2E]/50 text-lg max-w-md mx-auto"
            variants={itemVariants}
          >
            Upcoming performances and live events
          </motion.p>
        </motion.div>
      </section>

      <SectionDivider variant="wave" direction="tint-to-light" />

      {/* Songkick Widget */}
      <motion.section
        className="max-w-4xl mx-auto px-6 section-padding"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div ref={widgetRef} className="min-h-[200px]" />
      </motion.section>

      <SectionDivider variant="gradient" direction="light-to-dark" />

      {/* Terminal CTA — Book Now */}
      <section className="relative bg-[#1A1A2E] overflow-hidden">
        <div className="noise-overlay absolute inset-0" />
        <div className="relative z-10 section-padding px-6 text-center">
          <motion.div
            className="max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.p
              variants={itemVariants}
              className="text-[#F39C12] uppercase tracking-[0.3em] text-sm font-medium mb-4"
            >
              Book Now
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              Book Ebstar for Your Event
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-white/50 text-lg mb-10 max-w-lg mx-auto"
            >
              Available for concerts, festivals, corporate events, and private bookings worldwide.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link href="/contact">
                <motion.button
                  className="btn-glow inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#1A1A2E] font-semibold text-lg hover:bg-white/90 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get in Touch
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
