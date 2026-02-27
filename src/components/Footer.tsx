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
    <footer className="bg-[#EAF4FC]">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
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
              <span className="text-2xl font-bold tracking-wider text-[#1A1A2E]">
                EBSTAR
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#1B5E8A]">
              AI by profession, music by obsession, travel by instinct —
              record producer, AI/ML engineer, brand influencer, and founder of The ES&Oslash;T&Euml;RIC Ones.
            </p>
          </div>

          {/* Quick Links column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#1A1A2E]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Music", href: "/music" },
                { name: "AI/ML Engineer", href: "/ai" },
                { name: "Macro Influencer", href: "/macro-influencer" },
                { name: "Record Label", href: "/label" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#1B5E8A] transition-colors hover:text-[#2E86DE]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#1A1A2E]">
              Connect
            </h3>
            <ul className="mb-8 space-y-3">
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#1B5E8A] transition-colors hover:text-[#2E86DE]"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter signup */}
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#1A1A2E]">
              Newsletter
            </h3>
            <p className="mb-3 text-xs text-[#1B5E8A]">
              Stay updated with new releases and announcements.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) reset(); }}
                placeholder="your@email.com"
                required
                className="flex-1 rounded-lg border border-[#1B5E8A]/20 bg-[#F8FBFF] px-4 py-2 text-sm text-[#1A1A2E] placeholder-[#1B5E8A]/50 outline-none focus:border-[#2E86DE] focus:ring-1 focus:ring-[#2E86DE]"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-[#2E86DE] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1B5E8A] disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {success ? "Subscribed!" : "Subscribe"}
              </button>
            </form>
            {error && (
              <p className="mt-2 text-xs text-red-500">
                {error}{" "}
                <button onClick={reset} className="underline hover:text-red-400">
                  Try again
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1B5E8A]/10">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-6">
          <p className="text-center text-xs text-[#1B5E8A]">
            &copy; 2025 The ES&Oslash;T&Euml;RIC Ones. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
