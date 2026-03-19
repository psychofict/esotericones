import type { Metadata } from "next";
import TourPageClient from "./TourPageClient";

export const metadata: Metadata = {
  title: "Tour Dates",
  description:
    "Catch The ESOTERIC Ones roster live. Concerts, festivals, and DJ sets worldwide. Book our artists for your event.",
  openGraph: {
    title: "Tour Dates | The ESOTERIC Ones",
    description:
      "Catch The ESOTERIC Ones roster live. Concerts, festivals, and DJ sets worldwide.",
    url: "https://esotericones.com/tour",
  },
  alternates: {
    canonical: "https://esotericones.com/tour",
  },
};

export default function TourPage() {
  return <TourPageClient />;
}
