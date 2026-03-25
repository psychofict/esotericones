"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { newsPosts } from "@/data/news";
import { ArrowRight, Newspaper } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { useLocale } from "@/i18n";
import type { TranslationKeys } from "@/i18n/types";

const localeMap: Record<string, string> = {
  en: "en-US",
  ko: "ko-KR",
  fr: "fr-FR",
};

const categoryTranslationKeys: Record<string, keyof TranslationKeys> = {
  release: "news.category.release",
  label: "news.category.label",
  artist: "news.category.artist",
  event: "news.category.event",
};

const categoryColors: Record<string, string> = {
  release: "bg-[#E8385D]/10 text-[#E8385D]",
  label: "bg-blue-500/10 text-blue-400",
  artist: "bg-purple-500/10 text-purple-400",
  event: "bg-emerald-500/10 text-emerald-400",
};

const sortedPosts = [...newsPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export default function NewsPageClient() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const dateLocale = localeMap[locale] || "en-US";
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
            {t("news.title")}
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t("news.title")}
          </motion.h1>
          <motion.p
            className="text-lg text-text-secondary max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t("news.description")}
          </motion.p>
        </div>
      </section>

      {/* Featured Post */}
      {sortedPosts[0] && (
        <section className="px-6 pb-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href={`/news/${sortedPosts[0].slug}`}
                className="group grid grid-cols-1 md:grid-cols-2 gap-6 glass-card rounded-2xl overflow-hidden card-hover"
              >
                {sortedPosts[0].image && (
                  <div className="aspect-[16/10] md:aspect-auto relative overflow-hidden">
                    <Image
                      src={sortedPosts[0].image}
                      alt={sortedPosts[0].title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[sortedPosts[0].category]}`}>
                      {t(categoryTranslationKeys[sortedPosts[0].category])}
                    </span>
                    <span className="text-xs text-muted">
                      {new Date(sortedPosts[0].date).toLocaleDateString(dateLocale, { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-[#E8385D] transition-colors mb-3">
                    {sortedPosts[0].title}
                  </h2>
                  <p className="text-text-secondary line-clamp-3 mb-4">
                    {sortedPosts[0].excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-[#E8385D] font-medium">
                    {t("news.readMore")} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger(0.1)}
            initial="hidden"
            animate="visible"
          >
            {sortedPosts.slice(1).map((post) => (
              <motion.div key={post.slug} variants={fadeUp}>
                <Link
                  href={`/news/${post.slug}`}
                  className="group block glass-card rounded-2xl overflow-hidden card-hover h-full"
                >
                  {post.image ? (
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={250}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-gradient-to-br from-[#E8385D]/10 to-surface flex items-center justify-center">
                      <Newspaper className="w-10 h-10 text-[#E8385D]/30" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[post.category]}`}>
                        {t(categoryTranslationKeys[post.category])}
                      </span>
                      <span className="text-xs text-muted">
                        {new Date(post.date).toLocaleDateString(dateLocale, { year: "numeric", month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-[#E8385D] transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
