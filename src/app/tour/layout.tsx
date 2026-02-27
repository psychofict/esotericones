import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tour — Ebstar | Upcoming Shows & Events",
  description:
    "See Ebstar live — upcoming tour dates, events, and performances.",
};

export default function TourLayout({ children }: { children: React.ReactNode }) {
  return children;
}
