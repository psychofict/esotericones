import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The ESØTËRIC Ones — Ebstar's Record Label",
  description:
    "An international independent record label founded in Seoul. 15+ artists from 6 countries, 30+ singles, and 2M+ streams. Submit your demo.",
};

export default function LabelLayout({ children }: { children: React.ReactNode }) {
  return children;
}
