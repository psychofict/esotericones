"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems, labelSocials } from "@/data/label";
import { useTranslation } from "@/i18n/useTranslation";
import type { TranslationKeys } from "@/i18n/types";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { socialIcons } from "@/lib/socialIcons";

const navTranslationKeys: Record<string, keyof TranslationKeys> = {
  Home: "nav.home",
  Artists: "nav.artists",
  Releases: "nav.releases",
  News: "nav.news",
  Tour: "nav.tour",
  Merch: "nav.merch",
  About: "nav.about",
};

type DropdownConfig = { translationKey?: keyof TranslationKeys; label?: string; href: string };

const dropdownConfig: Record<string, DropdownConfig[]> = {
  Artists: [
    { translationKey: "nav.allArtists", href: "/artists" },
    { label: "Ebstar", href: "/artists/ebstar" },
    { label: "SkyDAWN", href: "/artists/skydawn" },
    { label: "PieceMaker", href: "/artists/piecemaker" },
  ],
  Releases: [
    { translationKey: "nav.allReleases", href: "/releases" },
    { label: "Maknaebe", href: "/releases/maknaebe" },
    { label: "ECHOES OF LOVE I", href: "/releases/echoes-of-love" },
    { label: "KUZOKHANYA", href: "/releases/kuzokhanya" },
    { label: "Life Is Beautiful", href: "/releases/life-is-beautiful" },
  ],
  About: [
    { translationKey: "nav.aboutTheLabel", href: "/about" },
    { translationKey: "nav.contact", href: "/contact" },
    { translationKey: "nav.submitDemo", href: "/demos" },
  ],
  Tour: [
    { translationKey: "nav.tourDates", href: "/tour" },
    { translationKey: "nav.events", href: "/events" },
  ],
};

function NavDropdown({ item, t }: { item: { name: string; href: string }; t: (key: keyof TranslationKeys) => string }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const items = dropdownConfig[item.name];

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  if (!items) {
    return (
      <li>
        <Link
          href={item.href}
          className="relative px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground group"
        >
          {t(navTranslationKeys[item.name])}
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E8385D] transition-all duration-300 group-hover:w-full" />
        </Link>
      </li>
    );
  }

  return (
    <li className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link
        href={item.href}
        aria-expanded={open}
        aria-haspopup="true"
        className="relative px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground group inline-flex items-center gap-1"
      >
        {t(navTranslationKeys[item.name])}
        <ChevronDown size={12} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#E8385D] transition-all duration-300 group-hover:w-full" />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            role="menu"
            className="absolute top-full left-0 mt-1 min-w-[200px] rounded-xl bg-background/95 backdrop-blur-xl border border-border shadow-xl shadow-black/20 overflow-hidden z-50"
          >
            <div className="py-2">
              {items.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:bg-[#E8385D]/10 transition-colors"
                >
                  {sub.translationKey ? t(sub.translationKey) : sub.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function MobileDropdown({ item, t, onClose }: { item: { name: string; href: string }; t: (key: keyof TranslationKeys) => string; onClose: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const items = dropdownConfig[item.name];

  if (!items) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="text-4xl font-bold text-foreground transition-colors hover:text-[#E8385D] min-h-[48px] inline-flex items-center"
      >
        {t(navTranslationKeys[item.name])}
      </Link>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="text-4xl font-bold text-foreground transition-colors hover:text-[#E8385D] min-h-[48px] inline-flex items-center gap-2"
      >
        {t(navTranslationKeys[item.name])}
        <ChevronDown size={20} className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden flex flex-col items-center gap-2 mt-2"
          >
            {items.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                onClick={onClose}
                className="text-lg text-foreground/60 hover:text-[#E8385D] transition-colors min-h-[40px] inline-flex items-center"
              >
                {sub.translationKey ? t(sub.translationKey) : sub.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const logoSrc = theme === "light" ? "/images/esoteric-white.jpg" : "/images/esoteric-blk.jpg";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-subtle/5 shadow-lg shadow-black/20"
            : "bg-gradient-to-b from-background/60 to-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-lg">
              <Image
                src={logoSrc}
                alt="The ESOTERIC Ones"
                width={40}
                height={40}
                className="w-10 h-10 object-cover transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </div>
            <span className="font-[var(--font-display)] text-base font-bold tracking-wider text-foreground hidden sm:block">
              THE ES<span className="text-[#E8385D]">O</span>TERIC ONES
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavDropdown key={item.href} item={item} t={t} />
            ))}
            <li className="ml-2">
              <Link
                href="/demos"
                className="rounded-full bg-[#E8385D] px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-[#FF4D73] hover:shadow-lg hover:shadow-[#E8385D]/25 btn-glow"
              >
                {t("nav.submitDemo")}
              </Link>
            </li>
          </ul>

          {/* Desktop social icons + language toggle */}
          <div className="hidden items-center gap-2 lg:flex">
            {labelSocials.slice(0, 3).map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted transition-all hover:text-[#E8385D] hover:bg-[#E8385D]/10"
              >
                {socialIcons[social.icon]}
              </a>
            ))}
            <ThemeToggle />
            <LanguageToggle />
          </div>

          {/* Mobile: language toggle + hamburger */}
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <LanguageToggle />
            <button
              className="p-2 text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2rem) 2rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background"
          >
            {/* Logo in mobile menu */}
            <div className="absolute top-6 left-6">
              <Image
                src={logoSrc}
                alt="The ESOTERIC Ones"
                width={48}
                height={48}
                className="w-12 h-12 rounded-lg"
              />
            </div>

            <ul className="flex flex-col items-center gap-6">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <MobileDropdown item={item} t={t} onClose={() => setMobileOpen(false)} />
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.06, duration: 0.4 }}
              >
                <Link
                  href="/demos"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 inline-block rounded-full bg-[#E8385D] px-8 py-3 text-xl font-bold text-white transition-colors hover:bg-[#FF4D73]"
                >
                  {t("nav.submitDemo")}
                </Link>
              </motion.li>
            </ul>

            <div className="mt-10 mb-6 w-24 h-px bg-gradient-to-r from-transparent via-[#E8385D]/30 to-transparent" />

            <div className="flex items-center gap-4">
              {labelSocials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-11 h-11 rounded-full bg-subtle/5 flex items-center justify-center text-muted transition-colors hover:text-[#E8385D] hover:bg-[#E8385D]/10"
                >
                  {socialIcons[social.icon]}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
