"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { labelSocials } from "@/data/label";
import { useFormSubmit } from "@/lib/useFormSubmit";
import { useTranslation } from "@/i18n/useTranslation";
import { useTheme } from "@/components/ThemeProvider";
import { socialIcons } from "@/lib/socialIcons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { loading, success, error, submitForm, reset } = useFormSubmit("/api/newsletter");
  const { t } = useTranslation();
  const { theme } = useTheme();
  const logoSrc = theme === "light" ? "/images/esoteric-white.jpg" : "/images/esoteric-blk.jpg";

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await submitForm({ email });
    if (!error) setEmail("");
  };

  return (
    <footer className="relative bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                <Image
                  src={logoSrc}
                  alt="The ESOTERIC Ones"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-base font-bold tracking-wider text-foreground">
                THE ES<span className="text-[#E8385D]">O</span>TERIC ONES
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              {t("footer.description")}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {labelSocials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-11 h-11 rounded-full bg-subtle/5 flex items-center justify-center text-muted transition-all hover:text-[#E8385D] hover:bg-[#E8385D]/10"
                >
                  {socialIcons[social.icon]}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate column */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#E8385D]">
              {t("footer.navigate")}
            </h3>
            <ul className="space-y-3">
              {[
                { name: t("footer.home"), href: "/" },
                { name: t("nav.artists"), href: "/artists" },
                { name: t("nav.releases"), href: "/releases" },
                { name: t("nav.news"), href: "/news" },
                { name: t("nav.about"), href: "/about" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-foreground"
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
              {t("footer.connect")}
            </h3>
            <ul className="space-y-3">
              {labelSocials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary transition-colors hover:text-foreground inline-flex items-center gap-2"
                  >
                    <span className="text-[#E8385D]/60">{socialIcons[social.icon]}</span>
                    {social.name}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-foreground/50 transition-colors hover:text-foreground"
                >
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link
                  href="/demos"
                  className="text-sm text-[#E8385D] transition-colors hover:text-[#FF4D73] font-medium"
                >
                  {t("footer.submitADemo")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#E8385D]">
              {t("footer.newsletter")}
            </h3>
            <p className="mb-4 text-sm text-text-secondary">
              {t("footer.newsletterDesc")}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) reset(); }}
                placeholder="your@email.com"
                required
                aria-label={t("contact.emailField")}
                className="w-full rounded-lg bg-subtle/5 border border-border px-4 py-2.5 text-sm text-foreground placeholder-foreground/30 outline-none focus:border-[#E8385D] focus:ring-1 focus:ring-[#E8385D] transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-[#E8385D] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#FF4D73] hover:shadow-lg hover:shadow-[#E8385D]/20 disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {success ? t("common.subscribed") : t("common.subscribe")}
              </button>
            </form>
            {error && (
              <p className="mt-2 text-xs text-red-400">
                {error}{" "}
                <button onClick={reset} className="underline hover:text-red-300">
                  {t("common.tryAgain")}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 py-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} The ES&Oslash;T&Euml;RIC Ones. {t("footer.allRights")}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="text-xs text-muted hover:text-foreground transition-colors py-2">
              {t("footer.contact")}
            </Link>
            <Link href="/about" className="text-xs text-muted hover:text-foreground transition-colors py-2">
              {t("nav.about")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
