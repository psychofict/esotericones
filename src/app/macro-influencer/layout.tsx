import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Macro Influencer — Ebstar | Partnerships, Events & Government",
  description:
    "One of South Korea's most recognized foreign macro influencers. 150K+ followers, 50+ brand partnerships, GINCON Committee Member, Forbes BLK inductee.",
  alternates: { canonical: "https://ebstar.co/macro-influencer" },
  openGraph: {
    title: "Macro Influencer — Ebstar | Partnerships, Events & Government",
    description:
      "One of South Korea's most recognized foreign macro influencers. 150K+ followers, 50+ brand partnerships.",
    url: "https://ebstar.co/macro-influencer",
  },
};

export default function MacroInfluencerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: "https://ebstar.co" },
          { name: "Macro Influencer", url: "https://ebstar.co/macro-influencer" },
        ])}
      />
      {children}
    </>
  );
}
