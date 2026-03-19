import type { Metadata } from "next";
import ReleasesPageClient from "./ReleasesPageClient";

export const metadata: Metadata = {
  title: "Releases",
  description:
    "Every album, EP, and single from The ESOTERIC Ones — from piano house anthems to Amapiano crossovers. 30+ releases and counting.",
  openGraph: {
    title: "Releases | The ESOTERIC Ones",
    description:
      "Every album, EP, and single from The ESOTERIC Ones. 30+ releases and counting.",
    url: "https://esotericones.com/releases",
  },
  alternates: {
    canonical: "https://esotericones.com/releases",
  },
};

export default function ReleasesPage() {
  return <ReleasesPageClient />;
}
