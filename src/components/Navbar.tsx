"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Music, Instagram, Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navEntries, isNavGroup, socials } from "@/data/artist";
import type { NavGroup, NavStandalone } from "@/data/artist";

const spotifyUrl =
  socials.find((s) => s.name === "Spotify")?.url ?? "#";
const instagramUrl =
  socials.find((s) => s.name === "Instagram")?.url ?? "#";

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
              scrolled ? "text-[#1A1A2E]" : "text-[#1A1A2E]"
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
            scrolled ? "text-[#1A1A2E]" : "text-[#1A1A2E]"
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
              className="font-[var(--font-display)] text-2xl font-bold tracking-wider"
              style={{ color: "#1A1A2E" }}
            >
              EBSTAR
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-8 md:flex">
            {navEntries.map(renderDesktopEntry)}
          </ul>

          {/* Desktop social icons */}
          <div className="hidden items-center gap-4 md:flex">
            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="text-[#1A1A2E] transition-colors hover:text-[#2E86DE]"
            >
              <Music size={20} />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#1A1A2E] transition-colors hover:text-[#2E86DE]"
            >
              <Instagram size={20} />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#1A1A2E]"
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

            <div className="mt-10 flex items-center gap-6">
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spotify"
                className="text-[#1A1A2E] transition-colors hover:text-[#2E86DE]"
              >
                <Music size={24} />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#1A1A2E] transition-colors hover:text-[#2E86DE]"
              >
                <Instagram size={24} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
