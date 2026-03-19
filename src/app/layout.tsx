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
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

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
    default: "The ESOTERIC Ones — Record Label",
  },
  description:
    "The ESOTERIC Ones is a global record label operating across South Africa, Zimbabwe, and South Korea. 24+ artists, 6 countries, 5M+ streams across electronic, house, Amapiano, hip-hop, and pop.",
  keywords: [
    "The Esoteric Ones",
    "record label",
    "house music",
    "Amapiano",
    "dance-pop",
    "South African music",
    "electronic music",
    "Ebstar",
    "hip-hop label",
    "Afrobeats",
    "deep house",
    "music label",
    "global record label",
    "Zimbabwe music",
    "Korean music",
    // Korean keywords
    "\uB808\uCF54\uB4DC \uB808\uC774\uBE14",
    "\uC74C\uC545 \uB808\uC774\uBE14",
    "\uD53C\uC544\uB178 \uD558\uC6B0\uC2A4",
    "\uC544\uB9C8\uD53C\uC544\uB178",
    "\uD78C\uD569 \uB808\uC774\uBE14",
    "\uC77C\uB809\uD2B8\uB85C\uB2C9 \uC74C\uC545",
    "\uB0A8\uC544\uD504\uB9AC\uCE74 \uC74C\uC545",
    "\uC9D0\uBC14\uBE0C\uC6E8 \uC74C\uC545",
    "\uD55C\uAD6D \uC74C\uC545",
    // French keywords
    "label musical",
    "label ind\u00E9pendant",
    "musique \u00E9lectronique",
    "musique sud-africaine",
    "Afrique du Sud musique",
    "musique cor\u00E9enne",
  ],
  openGraph: {
    title: "The ESOTERIC Ones — Record Label",
    description:
      "Global record label operating across South Africa, Zimbabwe, and South Korea. 24+ artists, 6 countries, 5M+ streams.",
    siteName: "The ESOTERIC Ones",
    url: "https://esotericones.com",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ko_KR", "fr_FR"],
    images: [
      {
        url: "/images/esoteric-blk.jpg",
        width: 1200,
        height: 630,
        alt: "The ESOTERIC Ones — Record Label",
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
    languages: {
      "en": "https://esotericones.com",
      "ko": "https://esotericones.com",
      "fr": "https://esotericones.com",
      "x-default": "https://esotericones.com",
    },
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
    <html lang="en">
      <head>
        <JsonLd data={getRecordLabelSchema()} />
        <JsonLd data={getWebsiteSchema()} />
        <JsonLd data={getSiteNavigationSchema()} />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${dmSans.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
        <LocaleProvider>
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
        </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
