"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { useTranslation } from "@/i18n/useTranslation";

const merchPreviews = [
  { src: "/images/merch/merch-1.jpg", alt: "ESOTERIC Ones merchandise" },
  { src: "/images/merch/merch-2.jpg", alt: "ESOTERIC Ones merchandise" },
  { src: "/images/merch/merch-3.jpg", alt: "ESOTERIC Ones merchandise" },
  { src: "/images/merch/merch-4.jpg", alt: "ESOTERIC Ones merchandise" },
];

export default function MerchPageClient() {
  const { t } = useTranslation();
  return (
    <main id="main-content" className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-[#E8385D]/5 blur-3xl animate-float" />

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <motion.div
            className="mx-auto mb-8 w-24 h-24 rounded-2xl overflow-hidden shadow-2xl shadow-[#E8385D]/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Image
              src="/images/esoteric-blk.jpg"
              alt="The ESOTERIC Ones"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-[#E8385D]/10 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ShoppingBag className="w-8 h-8 text-[#E8385D]" />
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
            {t("merch.title")}
          </motion.h1>

          <motion.p
            className="text-text-secondary text-lg mb-10 leading-relaxed max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {t("merch.description")}
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
              {t("common.notifyMe")} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Merch Preview Grid */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <motion.p
            className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-muted mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Preview
          </motion.p>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {merchPreviews.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="aspect-square rounded-2xl overflow-hidden relative group"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
