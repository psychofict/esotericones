import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AudioPlayerProvider } from "@/components/AudioPlayerContext";
import AudioPlayer from "@/components/AudioPlayer";
import JsonLd from "@/components/JsonLd";
import { getPersonSchema, getMusicGroupSchema, getWebsiteSchema } from "@/lib/structured-data";
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
  metadataBase: new URL("https://ebstar.com"),
  title: "EBSTAR — Producer. Engineer. Influencer. Bridging Worlds.",
  description:
    "Ebstar is a South Korea-based Zimbabwean music producer, AI research engineer, brand influencer, and record label founder. 5M+ streams, published ML researcher, and 50+ brand partnerships bridging worlds.",
  keywords: [
    "Ebstar",
    "Ebenezer Tarubinga",
    "piano house",
    "dance-pop",
    "Zimbabwean musician",
    "South Korea music",
    "music producer",
    "amapiano",
    "deep house",
    "progressive house",
    "future bass",
    "AI engineer",
    "machine learning",
    "computer vision",
    "brand influencer",
    "brand partnerships",
    "travel influencer",
  ],
  openGraph: {
    title: "EBSTAR — Producer. Engineer. Influencer. Bridging Worlds.",
    description:
      "Ebstar is a South Korea-based Zimbabwean music producer, AI research engineer, brand influencer, and record label founder. 5M+ streams, published ML researcher, and 50+ brand partnerships bridging worlds.",
    siteName: "EBSTAR",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@psychofict",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
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
      </head>
      <body
        className={`${plusJakartaSans.variable} ${dmSans.variable} font-sans antialiased`}
      >
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
