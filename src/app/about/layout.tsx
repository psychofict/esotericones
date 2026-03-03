import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "About — AI/ML Engineer, Music Producer & Macro Influencer",
  description:
    "Meet Ebstar (엡스타) — Seoul-based music producer, AI/ML engineer, macro influencer, and record label founder. MSc AI from Korea University, 5M+ streams, 50+ brand partnerships.",
  alternates: { canonical: "https://ebstar.co/about" },
  openGraph: {
    title: "About — AI/ML Engineer, Music Producer & Macro Influencer | EBSTAR",
    description:
      "Meet Ebstar — Seoul-based music producer, AI/ML engineer, macro influencer, and record label founder.",
    url: "https://ebstar.co/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: "https://ebstar.co" },
          { name: "About", url: "https://ebstar.co/about" },
        ])}
      />
      {children}
    </>
  );
}
