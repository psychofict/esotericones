import type { Metadata } from "next";
import DemosPageClient from "./DemosPageClient";

export const metadata: Metadata = {
  title: "Submit Your Demo",
  description:
    "Submit your demo to The ESOTERIC Ones. We're looking for bold, genre-defying artists in piano house, Amapiano, hip-hop, electronic, and beyond.",
  openGraph: {
    title: "Submit Your Demo | The ESOTERIC Ones",
    description:
      "Submit your demo to The ESOTERIC Ones. We're always listening for new talent.",
    url: "https://esotericones.com/demos",
  },
  alternates: {
    canonical: "https://esotericones.com/demos",
  },
};

export default function DemosPage() {
  return <DemosPageClient />;
}
