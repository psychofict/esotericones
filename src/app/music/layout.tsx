import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Music — Piano House, Dance-Pop & Amapiano Discography",
  description:
    "Explore Ebstar's (엡스타) discography — 5M+ streams across piano house, dance-pop, and Amapiano. 3 albums, 2 EPs, and chart-topping singles.",
  alternates: { canonical: "https://ebstar.co/music" },
  openGraph: {
    title: "Music — Piano House, Dance-Pop & Amapiano Discography | EBSTAR",
    description:
      "Explore Ebstar's discography — 5M+ streams across piano house, dance-pop, and Amapiano.",
    url: "https://ebstar.co/music",
    type: "profile",
  },
};

export default function MusicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: "https://ebstar.co" },
          { name: "Music", url: "https://ebstar.co/music" },
        ])}
      />
      {children}
    </>
  );
}
