import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  getRecordLabelSchema,
  getWebsiteSchema,
  getSiteNavigationSchema,
} from "@/lib/structured-data";
import Analytics from "@/components/Analytics";
import ScrollProgress from "@/components/ScrollProgress";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://esotericones.com"),
  applicationName: "The ESOTERIC Ones",
  title: {
    template: "%s | The ESOTERIC Ones",
    default: "The ESOTERIC Ones — Independent Record Label",
  },
  description:
    "The ESOTERIC Ones is an international independent record label founded in Seoul. 18+ artists, 6 countries, 5M+ streams across piano house, Amapiano, dance-pop, hip-hop, and beyond.",
  keywords: [
    "The Esoteric Ones",
    "record label",
    "independent label",
    "piano house",
    "Amapiano",
    "dance-pop",
    "Seoul music",
    "Korean record label",
    "electronic music",
    "Ebstar",
    "hip-hop label",
    "Afrobeats",
    "deep house",
    "music label",
    "indie label",
  ],
  openGraph: {
    title: "The ESOTERIC Ones — Independent Record Label",
    description:
      "International independent record label founded in Seoul. 18+ artists, 6 countries, 5M+ streams.",
    siteName: "The ESOTERIC Ones",
    url: "https://esotericones.com",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/label-logo.svg",
        width: 1200,
        height: 630,
        alt: "The ESOTERIC Ones — Independent Record Label",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@esotericones",
    creator: "@esotericones",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://esotericones.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      ...(process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION
        ? { "naver-site-verification": [process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION] }
        : {}),
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { "msvalidate.01": [process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION] }
        : {}),
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <JsonLd data={getRecordLabelSchema()} />
        <JsonLd data={getWebsiteSchema()} />
        <JsonLd data={getSiteNavigationSchema()} />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${dmSans.variable} font-sans antialiased bg-background text-foreground`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
