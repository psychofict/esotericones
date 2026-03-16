"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { newsPosts } from "@/data/news";
import type { NewsPost } from "@/data/news";
import { ArrowRight } from "lucide-react";

const categories: { value: NewsPost["category"] | null; label: string }[] = [
  { value: null, label: "All" },
  { value: "release", label: "Releases" },
  { value: "label", label: "Label" },
  { value: "artist", label: "Artists" },
  { value: "event", label: "Events" },
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<NewsPost["category"] | null>(null);

  const sorted = [...newsPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const filtered = activeCategory
    ? sorted.filter((p) => p.category === activeCategory)
    : sorted;

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <main id="main-content" className="min-h-screen bg-[#0A0A0A]">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.p
            className="text-[#E8385D] text-xs font-semibold uppercase tracking-[0.3em] mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Latest
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            News & Updates
          </motion.h1>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.value
                    ? "bg-[#E8385D] text-white"
                    : "bg-white/5 text-[#A0A0A0] hover:bg-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="px-6 pb-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link
                href={`/news/${featured.slug}`}
                className="group block glass-card rounded-2xl p-8 md:p-10 card-hover border border-[#E8385D]/10"
              >
                <span className="text-xs text-[#E8385D] uppercase tracking-wider font-semibold">
                  {featured.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mt-3 group-hover:text-[#E8385D] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-[#A0A0A0] mt-3 max-w-2xl">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 mt-6">
                  <span className="text-sm text-[#666666]">
                    {new Date(featured.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-sm text-[#E8385D] flex items-center gap-1">
                    Read More <ArrowRight size={14} />
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger(0.05)}
            initial="hidden"
            animate="visible"
            key={activeCategory || "all"}
          >
            {rest.map((post) => (
              <motion.div key={post.slug} variants={fadeUp}>
                <Link
                  href={`/news/${post.slug}`}
                  className="group block glass-card rounded-2xl p-6 card-hover h-full"
                >
                  <span className="text-xs text-[#E8385D] uppercase tracking-wider font-medium">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2 group-hover:text-[#E8385D] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#A0A0A0] mt-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <p className="text-xs text-[#666666] mt-4">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-[#666666] py-16">No posts found.</p>
          )}
        </div>
      </section>
    </main>
  );
}
