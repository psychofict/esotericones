import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with The ESOTERIC Ones for licensing, press inquiries, partnerships, and booking. Operating across South Africa, Zimbabwe, and South Korea.",
  openGraph: {
    title: "Contact | The ESOTERIC Ones",
    description:
      "Licensing, press, partnerships, or booking — reach out to The ESOTERIC Ones.",
    url: "https://esotericones.com/contact",
  },
  alternates: {
    canonical: "https://esotericones.com/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
