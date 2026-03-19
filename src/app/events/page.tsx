import type { Metadata } from "next";
import EventsPageClient from "./EventsPageClient";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Label showcases, festival sets, and live performances from The ESOTERIC Ones. Check back for dates and tickets.",
  openGraph: {
    title: "Events | The ESOTERIC Ones",
    description:
      "Upcoming events and live performances from The ESOTERIC Ones.",
    url: "https://esotericones.com/events",
  },
  alternates: {
    canonical: "https://esotericones.com/events",
  },
};

export default function EventsPage() {
  return <EventsPageClient />;
}
