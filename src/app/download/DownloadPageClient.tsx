"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Download, Disc3 } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

interface DownloadPageClientProps {
  releaseTitle: string;
  artistNames: string[];
  artwork?: string;
  format: string;
  downloadToken: string;
}

export default function DownloadPageClient({
  releaseTitle,
  artistNames,
  artwork,
  format,
  downloadToken,
}: DownloadPageClientProps) {
  const { t } = useTranslation();

  return (
    <main id="main-content" className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-[#E8385D]/5 blur-3xl animate-float" />

      <motion.div
        className="text-center px-6 max-w-lg relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="mx-auto mb-6 w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <CheckCircle className="w-8 h-8 text-green-500" />
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {t("download.success")}
        </motion.h1>

        <motion.p
          className="text-text-secondary text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {t("download.title")}
        </motion.p>

        {/* Release info */}
        <motion.div
          className="glass-card rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              {artwork ? (
                <Image
                  src={artwork}
                  alt={releaseTitle}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#E8385D]/10 flex items-center justify-center">
                  <Disc3 className="w-8 h-8 text-[#E8385D]/30" />
                </div>
              )}
            </div>
            <div className="text-left">
              <p className="font-bold text-foreground">{releaseTitle}</p>
              <p className="text-sm text-text-secondary">{artistNames.join(", ")}</p>
              <p className="text-xs text-muted mt-1">{format.toUpperCase()} Download</p>
            </div>
          </div>

          <a
            href={`/api/download?token=${downloadToken}`}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E8385D] text-white rounded-full text-sm font-semibold hover:bg-[#FF4D73] transition-all hover:shadow-lg hover:shadow-[#E8385D]/25 btn-glow"
          >
            <Download className="w-4 h-4" />
            {t("download.downloadButton")} {format.toUpperCase()}
          </a>
        </motion.div>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-xs text-muted">{t("download.linkExpiry")}</p>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link
            href="/releases"
            className="px-8 py-3.5 border border-border text-foreground rounded-full font-semibold hover:bg-subtle/5 hover:border-subtle/20 transition-all"
          >
            {t("download.backToReleases")}
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
