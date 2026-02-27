import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music — Ebstar | Piano House, Dance-Pop, Amapiano",
  description:
    "Explore Ebstar's discography — 5M+ streams across piano house, dance-pop, and Amapiano. 3 albums, 2 EPs, and chart-topping singles.",
};

export default function MusicLayout({ children }: { children: React.ReactNode }) {
  return children;
}
