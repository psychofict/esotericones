"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/artist";

const tags = ["All", "Releases", "Behind the Scenes", "Ambassadorships", "Updates"];

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All" ? blogPosts : blogPosts.filter((p) => p.tag === activeTag);

  return (
    <main className="min-h-screen bg-[#1A1A2E] text-[#F8FBFF]">
      {/* Hero */}
      <section className="relative overflow-hidden py-28 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2E86DE]/15 via-transparent to-transparent" />
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            News &amp; Updates
          </motion.h1>
          <motion.p
            className="text-lg text-[#EAF4FC]/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Latest releases, stories, and announcements
          </motion.p>
        </motion.div>
      </section>

      {/* Tags */}
      <section className="max-w-5xl mx-auto px-6">
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-14"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTag === tag
                  ? "bg-[#2E86DE] text-white"
                  : "bg-white/5 text-[#EAF4FC]/60 hover:bg-white/10 hover:text-[#EAF4FC]"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {filtered.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <motion.article
                className="rounded-2xl border border-[#2E86DE]/20 bg-white/5 backdrop-blur-md overflow-hidden hover:border-[#F39C12]/40 transition-colors group cursor-pointer h-full"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariant}
                whileHover={{ y: -6 }}
              >
                {/* Image Placeholder */}
                <div
                  className={`h-48 bg-gradient-to-br ${post.gradient} relative flex items-center justify-center`}
                >
                  <svg
                    className="w-12 h-12 text-white/20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-black/30 text-white/80 backdrop-blur-sm">
                    {post.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-xs text-[#F39C12]">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <span className="text-xs text-[#EAF4FC]/40">{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-semibold mb-3 leading-snug group-hover:text-[#2E86DE] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#EAF4FC]/50 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="text-sm text-[#2E86DE] font-medium group-hover:text-[#F39C12] transition-colors">
                    Read More &rarr;
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[#EAF4FC]/40 py-16">
            No posts in this category yet.
          </p>
        )}
      </section>
    </main>
  );
}
