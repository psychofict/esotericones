"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navEntries, isNavGroup, socials } from "@/data/artist";
import type { NavGroup, NavStandalone } from "@/data/artist";

const socialIcons: { name: string; url: string; icon: React.ReactNode }[] = [
  {
    name: "Spotify",
    url: socials.find((s) => s.name === "Spotify")?.url ?? "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
    ),
  },
  {
    name: "Apple Music",
    url: socials.find((s) => s.name === "Apple Music")?.url ?? "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043A5.022 5.022 0 0019.7.25C18.96.1 18.21.036 17.46.012 17.18 0 16.9 0 16.62 0H7.38c-.28 0-.56 0-.84.012C5.79.036 5.04.1 4.3.25a5.022 5.022 0 00-1.874.641C1.308 1.624.563 2.624.246 3.934a9.23 9.23 0 00-.24 2.19C0 6.404 0 6.684 0 6.964v10.07c0 .28 0 .56.006.84a9.23 9.23 0 00.24 2.19c.317 1.31 1.062 2.31 2.18 3.043A5.022 5.022 0 004.3 23.75c.74.15 1.49.214 2.24.238.28.012.56.012.84.012h9.24c.28 0 .56 0 .84-.012.75-.024 1.5-.088 2.24-.238a5.022 5.022 0 001.874-.641c1.118-.733 1.863-1.733 2.18-3.043a9.23 9.23 0 00.24-2.19c.006-.28.006-.56.006-.84V6.964c0-.28 0-.56-.006-.84zM17.7 12.226v4.584c0 .56-.12 1.096-.462 1.58a2.901 2.901 0 01-1.282 1.07c-.456.208-.942.31-1.45.31-.508 0-.994-.102-1.45-.31a2.901 2.901 0 01-1.282-1.07 2.824 2.824 0 01-.462-1.58c0-.56.12-1.096.462-1.58a2.901 2.901 0 011.282-1.07c.456-.208.942-.31 1.45-.31.322 0 .636.05.942.148V9.624l-5.85 1.302v5.884c0 .56-.12 1.096-.462 1.58a2.901 2.901 0 01-1.282 1.07c-.456.208-.942.31-1.45.31-.508 0-.994-.102-1.45-.31a2.901 2.901 0 01-1.282-1.07A2.824 2.824 0 013.7 16.81c0-.56.12-1.096.462-1.58a2.901 2.901 0 011.282-1.07c.456-.208.942-.31 1.45-.31.322 0 .636.05.942.148V8.124c0-.396.144-.746.432-.994.288-.248.636-.372 1.044-.372.096 0 .192.012.288.024l6.3 1.404c.528.12.9.504.9 1.044v2.996z"/></svg>
    ),
  },
  {
    name: "Instagram",
    url: socials.find((s) => s.name === "Instagram")?.url ?? "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
    ),
  },
  {
    name: "Facebook",
    url: socials.find((s) => s.name === "Facebook")?.url ?? "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    ),
  },
  {
    name: "Twitter/X",
    url: socials.find((s) => s.name === "Twitter/X")?.url ?? "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    ),
  },
  {
    name: "LinkedIn",
    url: socials.find((s) => s.name === "LinkedIn")?.url ?? "https://www.linkedin.com/in/ebstar",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    ),
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleMouseEnter = useCallback((label: string) => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
    setOpenDropdown(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    leaveTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  }, []);

  const toggleMobileAccordion = (label: string) => {
    setMobileAccordion((prev) => (prev === label ? null : label));
  };

  const renderDesktopEntry = (entry: NavGroup | NavStandalone) => {
    if (isNavGroup(entry)) {
      return (
        <li
          key={entry.label}
          className="relative"
          onMouseEnter={() => handleMouseEnter(entry.label)}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#2E86DE] ${
              scrolled ? "text-[#1A1A2E]" : "text-white"
            }`}
          >
            {entry.label}
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${
                openDropdown === entry.label ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {openDropdown === entry.label && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 mt-2 min-w-[180px] rounded-xl bg-white py-2 shadow-lg border border-gray-100"
              >
                {entry.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block px-4 py-2 text-sm text-[#1A1A2E] hover:bg-[#EAF4FC] hover:text-[#2E86DE] transition-colors"
                  >
                    {child.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      );
    }

    return (
      <li key={entry.href}>
        <Link
          href={entry.href}
          className={`text-sm font-medium transition-colors hover:text-[#2E86DE] ${
            scrolled ? "text-[#1A1A2E]" : "text-white"
          }`}
        >
          {entry.name}
        </Link>
      </li>
    );
  };

  const renderMobileEntry = (entry: NavGroup | NavStandalone) => {
    if (isNavGroup(entry)) {
      const isOpen = mobileAccordion === entry.label;
      return (
        <li key={entry.label} className="w-full text-center">
          <button
            onClick={() => toggleMobileAccordion(entry.label)}
            className="flex items-center justify-center gap-2 w-full text-2xl font-semibold text-[#1A1A2E] transition-colors hover:text-[#2E86DE]"
          >
            {entry.label}
            <ChevronDown
              size={20}
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <ul className="mt-3 space-y-3">
                  {entry.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-lg text-[#1A1A2E]/70 hover:text-[#2E86DE] transition-colors"
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      );
    }

    return (
      <li key={entry.href}>
        <Link
          href={entry.href}
          onClick={() => setMobileOpen(false)}
          className="text-2xl font-semibold text-[#1A1A2E] transition-colors hover:text-[#2E86DE]"
        >
          {entry.name}
        </Link>
      </li>
    );
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/ebstar-logo-white.png"
              alt="Ebstar"
              width={36}
              height={36}
              className="w-9 h-9"
            />
            <span
              className={`font-[var(--font-display)] text-2xl font-bold tracking-wider transition-colors ${scrolled ? "text-[#1A1A2E]" : "text-white"}`}
            >
              EBSTAR
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-8 md:flex">
            {navEntries.map(renderDesktopEntry)}
          </ul>

          {/* Desktop social icons */}
          <div className="hidden items-center gap-3 md:flex">
            {socialIcons.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`transition-colors hover:text-[#2E86DE] ${scrolled ? "text-[#1A1A2E]" : "text-white"}`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden transition-colors ${scrolled ? "text-[#1A1A2E]" : "text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white"
          >
            <ul className="flex flex-col items-center gap-8">
              {navEntries.map(renderMobileEntry)}
            </ul>

            <div className="mt-10 flex items-center gap-5">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-[#1A1A2E] transition-colors hover:text-[#2E86DE]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
