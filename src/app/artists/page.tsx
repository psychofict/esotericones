import type { Metadata } from "next";
import ArtistsPageClient from "./ArtistsPageClient";

export const metadata: Metadata = {
  title: "Artists",
  description:
    "Meet the 24+ artists on The ESOTERIC Ones roster. Electronic, house, Amapiano, hip-hop — artists from 6 countries pushing genre boundaries.",
  openGraph: {
    title: "Artists | The ESOTERIC Ones",
    description:
      "Meet the 24+ artists on The ESOTERIC Ones roster across 6 countries.",
    url: "https://esotericones.com/artists",
  },
  alternates: {
    canonical: "https://esotericones.com/artists",
  },
};

export default function ArtistsPage() {
  return <ArtistsPageClient />;
}
