import type { Metadata } from "next";
import NewsPageClient from "./NewsPageClient";

export const metadata: Metadata = {
  title: "News",
  description:
    "Artist announcements, release breakdowns, and behind-the-scenes stories from The ESOTERIC Ones.",
  openGraph: {
    title: "News | The ESOTERIC Ones",
    description:
      "The latest news and announcements from The ESOTERIC Ones record label.",
    url: "https://esotericones.com/news",
  },
  alternates: {
    canonical: "https://esotericones.com/news",
  },
};

export default function NewsPage() {
  return <NewsPageClient />;
}
