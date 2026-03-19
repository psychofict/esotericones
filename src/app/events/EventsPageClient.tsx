"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

export default function EventsPageClient() {
  const { t } = useTranslation();
  return (
    <main id="main-content" className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-[#E8385D]/5 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-[10%] w-48 h-48 rounded-full bg-[#E8385D]/3 blur-3xl animate-float-slow" />

      <motion.div
        className="text-center px-6 max-w-lg relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-[#E8385D]/10 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Calendar className="w-8 h-8 text-[#E8385D]" />
        </motion.div>

        <motion.p
          className="text-[#E8385D] text-xs font-semibold uppercase tracking-[0.3em] mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t("common.comingSoon")}
        </motion.p>

        <motion.h1
          className="text-5xl md:text-6xl font-bold text-foreground tracking-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {t("events.title")}
        </motion.h1>

        <motion.p
          className="text-text-secondary text-lg mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {t("events.description")}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/"
            className="px-8 py-3.5 border border-border text-foreground rounded-full font-semibold hover:bg-subtle/5 hover:border-subtle/20 transition-all"
          >
            {t("common.backToHome")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#E8385D] text-white rounded-full font-semibold hover:bg-[#FF4D73] transition-all hover:shadow-lg hover:shadow-[#E8385D]/25 btn-glow"
          >
            {t("events.bookAnArtist")} <ArrowRight size={16} />
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
