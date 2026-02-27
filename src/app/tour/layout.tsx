import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Tour — Ebstar | Upcoming Shows & Events",
  description:
    "See Ebstar live — upcoming tour dates, events, and performances in South Korea and worldwide.",
  alternates: { canonical: "https://ebstar.co/tour" },
  openGraph: {
    title: "Tour — Ebstar | Upcoming Shows & Events",
    description:
      "See Ebstar live — upcoming tour dates, events, and performances.",
    url: "https://ebstar.co/tour",
  },
};

export default function TourLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: "https://ebstar.co" },
          { name: "Tour", url: "https://ebstar.co/tour" },
        ])}
      />
      {children}
    </>
  );
}
