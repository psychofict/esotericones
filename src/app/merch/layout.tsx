import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Merch Store — Coming Soon",
  description:
    "Official Ebstar and The ESØTËRIC Ones merchandise. Stay tuned for exclusive drops.",
  alternates: { canonical: "https://ebstar.co/merch" },
  openGraph: {
    title: "Merch Store — Coming Soon | EBSTAR",
    description: "Official Ebstar and The ESØTËRIC Ones merchandise.",
    url: "https://ebstar.co/merch",
  },
};

export default function MerchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: "https://ebstar.co" },
          { name: "Merch", url: "https://ebstar.co/merch" },
        ])}
      />
      {children}
    </>
  );
}
