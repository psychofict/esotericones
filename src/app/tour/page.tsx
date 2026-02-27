"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

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
        <div className="absolute top-16 left-[10%] w-36 h-36 rounded-full bg-[#2E86DE]/5 blur-2xl" />
        <div className="absolute bottom-20 right-[12%] w-44 h-44 rounded-full bg-[#F39C12]/5 blur-2xl" />

        <motion.div
          className="relative z-10 max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.div
            className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-white/60 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MapPin className="w-10 h-10 text-[#2E86DE]" />
          </motion.div>

          <motion.p
            className="text-[#F39C12] uppercase tracking-[0.35em] text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Live Shows
          </motion.p>

          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Tour Dates
          </motion.h1>

          <motion.p
            className="text-[#1A1A2E]/50 text-lg max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Upcoming performances and live events
          </motion.p>
        </motion.div>
      </section>

      {/* Songkick Widget */}
      <motion.section
        className="max-w-4xl mx-auto px-6 py-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div ref={widgetRef} className="min-h-[200px]" />
      </motion.section>
    </main>
  );
}
