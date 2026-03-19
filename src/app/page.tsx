import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  openGraph: {
    title: "The ESOTERIC Ones — Record Label",
    description:
      "Global record label operating across South Africa, Zimbabwe, and South Korea. 24+ artists, 6 countries, 5M+ streams.",
    url: "https://esotericones.com",
    images: [
      {
        url: "/images/esoteric-blk.jpg",
        width: 1200,
        height: 630,
        alt: "The ESOTERIC Ones — Record Label",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The ESOTERIC Ones — Record Label",
    description:
      "Global record label. 24+ artists, 6 countries, 5M+ streams across electronic, house, Amapiano, hip-hop, and pop.",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
