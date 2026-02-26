"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/artist";

const tagImages: Record<string, string> = {
  Releases: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=640&q=80",
  "Behind the Scenes": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=640&q=80",
  Ambassadorships: "https://images.unsplash.com/photo-1540575467063-ba8db27f82e5?w=640&q=80",
  Updates: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=640&q=80",
};

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
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1485579149621-3123dd979885?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-[#1A1A2E]/82" />
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
                {/* Card Image */}
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={tagImages[post.tag] || tagImages.Updates}
                    alt={post.tag}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-60`} />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-black/30 text-white/80 backdrop-blur-sm z-10">
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
