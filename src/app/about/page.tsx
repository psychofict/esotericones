import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "The ESOTERIC Ones is a global record label founded in 2023 by Ebstar, operating across South Africa, Zimbabwe, and South Korea. 24+ artists, 6 countries, 5M+ streams.",
  openGraph: {
    title: "About | The ESOTERIC Ones",
    description:
      "Global record label founded by Ebstar. Operating across South Africa, Zimbabwe, and South Korea.",
    url: "https://esotericones.com/about",
  },
  alternates: {
    canonical: "https://esotericones.com/about",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
