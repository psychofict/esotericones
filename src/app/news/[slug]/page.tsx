"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { getPostBySlug, getRecentPosts } from "@/data/news";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NewsArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <Link href="/news" className="text-[#E8385D] hover:text-[#FF4D73]">
            Back to News
          </Link>
        </div>
      </main>
    );
  }

  const relatedPosts = getRecentPosts(4).filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main id="main-content" className="min-h-screen bg-[#0A0A0A]">
      <article className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-[#A0A0A0] hover:text-[#E8385D] transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to News
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-xs text-[#E8385D] uppercase tracking-wider font-semibold">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
              {post.title}
            </h1>
            <p className="text-sm text-[#666666] mb-8">
              {new Date(post.date).toLocaleDateString("en-US", {
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
                  className="text-xs px-3 py-1 rounded-full bg-white/5 text-[#A0A0A0]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div
              className="prose prose-invert prose-p:text-[#A0A0A0] prose-strong:text-white prose-a:text-[#E8385D] prose-a:no-underline hover:prose-a:underline max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-bold text-white mb-6">More News</h2>
            <div className="space-y-4">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/news/${rp.slug}`}
                  className="group flex items-center justify-between glass-card rounded-xl p-4 card-hover"
                >
                  <div>
                    <span className="text-xs text-[#E8385D] uppercase tracking-wider">
                      {rp.category}
                    </span>
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#E8385D] transition-colors mt-1">
                      {rp.title}
                    </h3>
                  </div>
                  <ArrowRight size={16} className="text-[#666666] group-hover:text-[#E8385D] transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
