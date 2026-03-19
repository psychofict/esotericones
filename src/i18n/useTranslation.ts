"use client";

import { useCallback } from "react";
import { useLocale } from "./LocaleProvider";
import { en } from "./translations/en";
import { ko } from "./translations/ko";
import { fr } from "./translations/fr";
import type { Locale, TranslationKeys } from "./types";

const translations: Record<Locale, TranslationKeys> = { en, ko, fr };

export function useTranslation() {
  const { locale } = useLocale();

  const t = useCallback(
    (key: keyof TranslationKeys): string => {
      return translations[locale][key] ?? translations.en[key] ?? key;
    },
    [locale],
  );

  return { t, locale };
}
