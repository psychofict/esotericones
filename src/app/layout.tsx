import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AudioPlayerProvider } from "@/components/AudioPlayerContext";
import AudioPlayer from "@/components/AudioPlayer";
import JsonLd from "@/components/JsonLd";
import {
  getPersonSchema,
  getMusicGroupSchema,
  getWebsiteSchema,
  getOrganizationSchema,
} from "@/lib/structured-data";
import Analytics from "@/components/Analytics";

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
  metadataBase: new URL("https://ebstar.co"),
  title: "EBSTAR — AI by Profession. Music by Obsession. Travel by Instinct.",
  description:
    "Ebstar (엡스타) is a Seoul-based music producer, AI/ML engineer, macro influencer, and record label founder. 5M+ streams, published AI researcher, and 50+ brand partnerships.",
  keywords: [
    "Ebstar",
    "엡스타",
    "Ebenezer Tarubinga",
    "piano house",
    "dance-pop",
    "African musician",
    "South Korea music",
    "music producer",
    "amapiano",
    "deep house",
    "progressive house",
    "future bass",
    "AI engineer",
    "machine learning",
    "computer vision",
    "macro influencer",
    "brand partnerships",
    "travel influencer",
    "Korea University AI",
    "GINCON",
    "Seoul music producer",
    "한국 음악 프로듀서",
    "아프리카 뮤지션",
    "인플루언서",
    "The Esoteric Ones",
  ],
  openGraph: {
    title: "EBSTAR — AI by Profession. Music by Obsession. Travel by Instinct.",
    description:
      "Ebstar (엡스타) is a Seoul-based music producer, AI/ML engineer, macro influencer, and record label founder. 5M+ streams, published AI researcher, and 50+ brand partnerships.",
    siteName: "EBSTAR",
    url: "https://ebstar.co",
    type: "website",
    locale: "en_US",
    alternateLocale: "ko_KR",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ebstar — Music Producer, AI/ML Engineer, Macro Influencer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@psychofict",
    creator: "@psychofict",
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
    canonical: "https://ebstar.co",
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
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={getPersonSchema()} />
        <JsonLd data={getMusicGroupSchema()} />
        <JsonLd data={getWebsiteSchema()} />
        <JsonLd data={getOrganizationSchema()} />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:rounded-lg focus:bg-[#2E86DE] focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Skip to content
        </a>
        <AudioPlayerProvider>
          <Navbar />
          {children}
          <Footer />
          <AudioPlayer />
        </AudioPlayerProvider>
        <Analytics />
      </body>
    </html>
  );
}
