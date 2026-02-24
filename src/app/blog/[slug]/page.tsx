import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/data/artist";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Ebstar`,
    description: post.excerpt,
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const otherPosts = blogPosts.filter((p) => p.slug !== slug);

  return (
    <main className="min-h-screen bg-[#1A1A2E] text-[#F8FBFF]">
      {/* Hero */}
      <section className={`relative overflow-hidden py-28 px-6 text-center bg-gradient-to-br ${post.gradient}`}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white/90 backdrop-blur-sm mb-4">
            {post.tag}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-white/60 text-sm">
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="space-y-6">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-lg text-[#EAF4FC]/80 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* More Posts */}
      {otherPosts.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-24 border-t border-[#2E86DE]/10 pt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">More Posts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {otherPosts.map((other) => (
              <Link key={other.slug} href={`/blog/${other.slug}`}>
                <article className="rounded-2xl border border-[#2E86DE]/20 bg-white/5 backdrop-blur-md overflow-hidden hover:border-[#F39C12]/40 transition-all group cursor-pointer hover:-translate-y-1">
                  <div className={`h-32 bg-gradient-to-br ${other.gradient} relative flex items-center justify-center`}>
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-black/30 text-white/80 backdrop-blur-sm">
                      {other.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-xs text-[#F39C12]">
                        {new Date(other.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <span className="text-xs text-[#EAF4FC]/40">{other.readTime}</span>
                    </div>
                    <h3 className="font-semibold leading-snug group-hover:text-[#2E86DE] transition-colors">
                      {other.title}
                    </h3>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
