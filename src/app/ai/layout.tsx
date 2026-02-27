import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI/ML Engineer — Ebstar | Computer Vision & Deep Learning",
  description:
    "Ebstar's AI research portfolio — MSc AI from Korea University, published at IJCNN and Neural Networks. Specializing in semantic segmentation, depth estimation, and computer vision.",
};

export default function AILayout({ children }: { children: React.ReactNode }) {
  return children;
}
