import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "The ESØTËRIC Ones — Ebstar's Record Label",
  description:
    "An international independent record label founded in Seoul. 15+ artists from 6 countries, 30+ singles, and 2M+ streams. Submit your demo.",
  alternates: { canonical: "https://ebstar.co/label" },
  openGraph: {
    title: "The ESØTËRIC Ones — Ebstar's Record Label",
    description:
      "An international independent record label founded in Seoul. 15+ artists from 6 countries, 30+ singles, and 2M+ streams.",
    url: "https://ebstar.co/label",
  },
};

export default function LabelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: "https://ebstar.co" },
          { name: "Record Label", url: "https://ebstar.co/label" },
        ])}
      />
      {children}
    </>
  );
}
