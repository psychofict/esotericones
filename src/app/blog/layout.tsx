import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Ebstar | Updates, Releases & Behind the Scenes",
  description:
    "Latest news, release announcements, behind-the-scenes stories, and updates from Ebstar.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
