import type { Metadata } from "next";
import MerchPageClient from "./MerchPageClient";

export const metadata: Metadata = {
  title: "Merch Store",
  description:
    "Official The ESOTERIC Ones merchandise. Exclusive drops coming soon.",
  openGraph: {
    title: "Merch Store | The ESOTERIC Ones",
    description:
      "Official The ESOTERIC Ones merchandise coming soon.",
    url: "https://esotericones.com/merch",
  },
  alternates: {
    canonical: "https://esotericones.com/merch",
  },
};

export default function MerchPage() {
  return <MerchPageClient />;
}
