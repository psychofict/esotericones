import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Contact Ebstar — Bookings, Collaborations & Press",
  description:
    "Get in touch with Ebstar for music collaborations, brand partnerships, event appearances, press inquiries, or label submissions.",
  alternates: { canonical: "https://ebstar.co/contact" },
  openGraph: {
    title: "Contact Ebstar — Bookings, Collaborations & Press",
    description:
      "Get in touch with Ebstar for music collaborations, brand partnerships, event appearances, press inquiries, or label submissions.",
    url: "https://ebstar.co/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: "https://ebstar.co" },
          { name: "Contact", url: "https://ebstar.co/contact" },
        ])}
      />
      {children}
    </>
  );
}
