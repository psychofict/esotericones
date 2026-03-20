export interface LabelEvent {
  slug: string;
  title: string;
  date: string;
  venue: string;
  city: string;
  country: string;
  artists: string[];
  ticketUrl?: string;
  status: "upcoming" | "past";
  description?: string;
  image?: string;
}

export const labelEvents: LabelEvent[] = [
  {
    slug: "edc-korea-2025",
    title: "EDC Korea 2025",
    date: "2025-09-20",
    venue: "Nodeul Island",
    city: "Seoul",
    country: "South Korea",
    artists: ["Ebstar"],
    status: "upcoming",
    description: "The ESOTERIC Ones showcase at EDC Korea.",
  },
  {
    slug: "esoteric-showcase-seoul-2025",
    title: "The ESOTERIC Ones Showcase",
    date: "2025-07-15",
    venue: "TBA",
    city: "Seoul",
    country: "South Korea",
    artists: ["Ebstar", "RATSBE", "SkyDAWN"],
    status: "upcoming",
    description: "An intimate label showcase featuring live performances and DJ sets from ESOTERIC artists.",
  },
  {
    slug: "edc-korea-2025-past",
    title: "EDC Korea 2025",
    date: "2025-09-21",
    venue: "Nodeul Island",
    city: "Seoul",
    country: "South Korea",
    artists: ["Ebstar"],
    status: "past",
    description: "Ebstar performed a DJ set at EDC Korea.",
    image: "/images/gallery/festival-night.jpg",
  },
  {
    slug: "korea-blockchain-week-2024",
    title: "Korea Blockchain Week 2024",
    date: "2024-09-01",
    venue: "COEX",
    city: "Seoul",
    country: "South Korea",
    artists: ["Ebstar"],
    status: "past",
    description: "VIP appearance and networking event at Korea Blockchain Week.",
    image: "/images/gallery/tripadvisor-seoul-event.jpg",
  },
];

export function getUpcomingEvents(): LabelEvent[] {
  return labelEvents.filter((e) => e.status === "upcoming");
}

export function getPastEvents(): LabelEvent[] {
  return labelEvents.filter((e) => e.status === "past");
}

export function getEventBySlug(slug: string): LabelEvent | undefined {
  return labelEvents.find((e) => e.slug === slug);
}
