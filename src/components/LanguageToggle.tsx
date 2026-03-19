"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/types";
import { Globe } from "lucide-react";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "EN" },
  { code: "ko", label: "한국어", flag: "KO" },
  { code: "fr", label: "Français", flag: "FR" },
];

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = languages.find((l) => l.code === locale) ?? languages[0];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-sm text-foreground/60 hover:text-foreground hover:bg-subtle/5 transition-all"
        aria-label="Change language"
      >
        <Globe size={16} />
        <span className="text-xs font-medium">{current.flag}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 rounded-xl bg-surface border border-border shadow-xl shadow-black/40 overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLocale(lang.code);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                locale === lang.code
                  ? "bg-[#E8385D]/10 text-[#E8385D]"
                  : "text-foreground/70 hover:bg-subtle/5 hover:text-foreground"
              }`}
            >
              <span>{lang.label}</span>
              <span className="text-xs opacity-50">{lang.flag}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
