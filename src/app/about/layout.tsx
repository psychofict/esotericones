import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Ebstar — AI/ML Engineer, Music Producer, Macro Influencer",
  description:
    "Meet Ebstar — Seoul-based music producer, AI/ML engineer, macro influencer, and record label founder. MSc AI from Korea University, 5M+ streams, 50+ brand partnerships.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
