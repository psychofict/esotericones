"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import type { Release } from "@/data/releases";
import { useTranslation } from "@/i18n/useTranslation";

interface BuyDigitalButtonProps {
  release: Release;
}

export default function BuyDigitalButton({ release }: BuyDigitalButtonProps) {
  const { t } = useTranslation();
  const [showFormats, setShowFormats] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuy = async (format: "wav" | "mp3") => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: release.slug, format }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  const price = release.purchase!.priceUsd;
  const formats = release.purchase!.formats;

  if (loading) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8385D] text-white rounded-full text-sm font-semibold opacity-75"
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        {t("release.redirecting")}
      </button>
    );
  }

  if (showFormats && formats.length > 1) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          {formats.map((fmt) => (
            <button
              key={fmt}
              onClick={() => handleBuy(fmt)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#E8385D] text-white rounded-full text-sm font-semibold hover:bg-[#FF4D73] transition-all hover:shadow-lg hover:shadow-[#E8385D]/20"
            >
              <Download className="w-4 h-4" />
              {fmt.toUpperCase()} — ${price.toFixed(2)}
            </button>
          ))}
        </div>
        {error && <p className="text-red-400 text-xs">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => {
          if (formats.length === 1) {
            handleBuy(formats[0]);
          } else {
            setShowFormats(true);
          }
        }}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8385D] text-white rounded-full text-sm font-semibold hover:bg-[#FF4D73] transition-all hover:shadow-lg hover:shadow-[#E8385D]/20"
      >
        <Download className="w-4 h-4" />
        {t("release.buyDigital")} — ${price.toFixed(2)}
      </button>
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
