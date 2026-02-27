import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "AI/ML Engineer — Ebstar | Computer Vision & Deep Learning",
  description:
    "Ebstar's AI research portfolio — MSc AI from Korea University, published at IJCNN and Neural Networks. Specializing in semantic segmentation, depth estimation, and computer vision.",
  alternates: { canonical: "https://ebstar.co/ai" },
  openGraph: {
    title: "AI/ML Engineer — Ebstar | Computer Vision & Deep Learning",
    description:
      "Ebstar's AI research portfolio — MSc AI from Korea University, published at IJCNN and Neural Networks.",
    url: "https://ebstar.co/ai",
  },
};

export default function AILayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: "https://ebstar.co" },
          { name: "AI/ML Engineer", url: "https://ebstar.co/ai" },
        ])}
      />
      {children}
    </>
  );
}
