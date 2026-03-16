"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { labelSocials } from "@/data/label";
import { useFormSubmit } from "@/lib/useFormSubmit";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { loading, success, error, submitForm, reset } = useFormSubmit("/api/newsletter");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await submitForm({ email });
    if (!error) setEmail("");
  };

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-[#2A2A2A]">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/label-logo.svg"
                alt="The ESOTERIC Ones"
                width={36}
                height={36}
                className="w-9 h-9"
              />
              <span className="text-lg font-bold tracking-wider text-white">
                THE ESOTERIC ONES
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#A0A0A0]">
              International independent record label founded in Seoul.
              18+ artists across 6 countries, 5M+ streams.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {labelSocials.slice(0, 4).map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-white/30 transition-colors hover:text-[#E8385D]"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" opacity="0.3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigate column */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#E8385D]">
              Navigate
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Artists", href: "/artists" },
                { name: "Releases", href: "/releases" },
                { name: "News", href: "/news" },
                { name: "About", href: "/about" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#E8385D]">
              Connect
            </h3>
            <ul className="space-y-3">
              {labelSocials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/50 transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/demos"
                  className="text-sm text-[#E8385D] transition-colors hover:text-[#FF4D73]"
                >
                  Submit a Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#E8385D]">
              Newsletter
            </h3>
            <p className="mb-4 text-sm text-[#A0A0A0]">
              New releases, artist spotlights, and label updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) reset(); }}
                placeholder="your@email.com"
                required
                className="flex-1 rounded-lg bg-white/5 border border-[#2A2A2A] px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#E8385D] focus:ring-1 focus:ring-[#E8385D] transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-[#E8385D] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#FF4D73] disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {success ? "Subscribed!" : "Subscribe"}
              </button>
            </form>
            {error && (
              <p className="mt-2 text-xs text-red-400">
                {error}{" "}
                <button onClick={reset} className="underline hover:text-red-300">
                  Try again
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2A2A2A]">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-6">
          <p className="text-center text-xs text-white/30">
            &copy; {new Date().getFullYear()} The ES&Oslash;T&Euml;RIC Ones. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
