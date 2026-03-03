import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Platforms & Socials",
  description:
    "Find Ebstar on all platforms — Spotify, Apple Music, Instagram, Twitter, SoundCloud, and more. One link for everything.",
  alternates: { canonical: "https://ebstar.co/links" },
  openGraph: {
    title: "All Platforms & Socials | EBSTAR",
    description: "Find Ebstar on all platforms. One link for everything.",
    url: "https://ebstar.co/links",
  },
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
