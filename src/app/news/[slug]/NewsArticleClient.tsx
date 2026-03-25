"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { NewsPost } from "@/data/news";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import type { TranslationKeys } from "@/i18n/types";

const categoryTranslationKeys: Record<string, keyof TranslationKeys> = {
  release: "news.category.release",
  label: "news.category.label",
  artist: "news.category.artist",
  event: "news.category.event",
};

const localeMap: Record<string, string> = {
  en: "en-US",
  ko: "ko-KR",
  fr: "fr-FR",
};

interface NewsArticleClientProps {
  post: NewsPost;
  relatedPosts: NewsPost[];
}

export default function NewsArticleClient({ post, relatedPosts }: NewsArticleClientProps) {
  const { t, locale } = useTranslation();

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <article className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-[#E8385D] transition-colors mb-8"
          >
            <ArrowLeft size={16} /> {t("news.backToNews")}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-xs text-[#E8385D] uppercase tracking-wider font-semibold">
              {t(categoryTranslationKeys[post.category])}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              {post.title}
            </h1>
            <p className="text-sm text-muted mb-8">
              {new Date(post.date).toLocaleDateString(localeMap[locale] || "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-subtle/5 text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div
              className="prose prose-p:text-text-secondary prose-strong:text-foreground prose-headings:text-foreground prose-a:text-[#E8385D] prose-a:no-underline hover:prose-a:underline max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-bold text-foreground mb-6">{t("news.moreNews")}</h2>
            <div className="space-y-4">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/news/${rp.slug}`}
                  className="group flex items-center justify-between glass-card rounded-xl p-4 card-hover"
                >
                  <div>
                    <span className="text-xs text-[#E8385D] uppercase tracking-wider">
                      {t(categoryTranslationKeys[rp.category])}
                    </span>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-[#E8385D] transition-colors mt-1">
                      {rp.title}
                    </h3>
                  </div>
                  <ArrowRight size={16} className="text-muted group-hover:text-[#E8385D] transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
