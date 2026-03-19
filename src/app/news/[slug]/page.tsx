import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getRecentPosts, newsPosts } from "@/data/news";
import { getNewsArticleSchema, getBreadcrumbSchema } from "@/lib/structured-data";
import JsonLd from "@/components/JsonLd";
import NewsArticleClient from "./NewsArticleClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return newsPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | The ESOTERIC Ones`,
      description: post.excerpt,
      type: "article",
      url: `https://esotericones.com/news/${slug}`,
      publishedTime: post.date,
      ...(post.image
        ? { images: [{ url: post.image, alt: post.title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | The ESOTERIC Ones`,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://esotericones.com/news/${slug}`,
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRecentPosts(4).filter((p) => p.slug !== slug).slice(0, 3);

  const articleSchema = getNewsArticleSchema(post);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://esotericones.com" },
    { name: "News", url: "https://esotericones.com/news" },
    { name: post.title, url: `https://esotericones.com/news/${slug}` },
  ]);

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <NewsArticleClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
