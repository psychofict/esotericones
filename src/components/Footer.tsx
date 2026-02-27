"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { socials } from "@/data/artist";
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
    <footer className="relative bg-[#1A1A2E]">
      {/* Wave SVG separator */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%] overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px)] h-[60px]"
        >
          <path
            d="M0,0 C300,100 900,20 1200,80 L1200,120 L0,120 Z"
            fill="#1A1A2E"
          />
        </svg>
      </div>

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/ebstar-logo-white.png"
                alt="Ebstar"
                width={36}
                height={36}
                className="w-9 h-9"
              />
              <span className="text-2xl font-bold tracking-wider text-white">
                EBSTAR
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
              AI by profession. Music by obsession. Travel by instinct &mdash;
              record producer, AI/ML engineer, macro influencer, and founder of The ES&Oslash;T&Euml;RIC Ones.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.slice(0, 4).map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-white/30 transition-colors hover:text-white"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" opacity="0.2" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigate column */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#F39C12]">
              Navigate
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Music", href: "/music" },
                { name: "AI/ML Engineer", href: "/ai" },
                { name: "Tour Dates", href: "/tour" },
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
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#F39C12]">
              Connect
            </h3>
            <ul className="space-y-3">
              {socials.map((social) => (
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
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#F39C12]">
              Newsletter
            </h3>
            <p className="mb-4 text-sm text-white/40">
              Stay updated with new releases and announcements.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) reset(); }}
                placeholder="your@email.com"
                required
                className="flex-1 rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#2E86DE] focus:ring-1 focus:ring-[#2E86DE] transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-[#2E86DE] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2575C5] disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
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
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-6">
          <p className="text-center text-xs text-white/30">
            &copy; {new Date().getFullYear()} The ES&Oslash;T&Euml;RIC Ones. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
