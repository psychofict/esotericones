"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { useFormSubmit } from "@/lib/useFormSubmit";
import FormFeedback from "@/components/FormFeedback";
import { Send, ChevronDown, Music, FileText, Globe, User } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

const genres = [
  "Piano House", "Amapiano", "Dance-Pop", "Deep House", "Progressive House",
  "Future Bass", "Pop", "Big Room", "Hip-Hop", "Afrobeats", "R&B", "Electronic", "Other",
];

export default function DemosPageClient() {
  const { t } = useTranslation();
  const { loading, success, error, submitForm, reset } = useFormSubmit("/api/demo");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqItems = [
    { q: t("demos.faq1q"), a: t("demos.faq1a") },
    { q: t("demos.faq2q"), a: t("demos.faq2a") },
    { q: t("demos.faq3q"), a: t("demos.faq3a") },
    { q: t("demos.faq4q"), a: t("demos.faq4a") },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    await submitForm(data);
    if (!error) form.reset();
  };

  return (
    <main id="main-content" className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-10 md:pb-16 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <motion.p
            className="text-[#E8385D] text-xs font-semibold uppercase tracking-[0.3em] mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {t("demos.joinRoster")}
          </motion.p>
          <motion.h1
            className="text-3xl md:text-6xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t("demos.title")}
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-text-secondary max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t("demos.description")}
          </motion.p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Guidelines — renders after form on mobile */}
          <motion.div
            className="lg:col-span-2 order-2 lg:order-none"
            variants={stagger()}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#E8385D]/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#E8385D]" />
                </div>
                <h2 className="text-lg font-bold text-foreground">{t("demos.whatWeLookFor")}</h2>
              </div>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li>{t("demos.lookFor1")}</li>
                <li>{t("demos.lookFor2")}</li>
                <li>{t("demos.lookFor3")}</li>
                <li>{t("demos.lookFor4")}</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#E8385D]/10 flex items-center justify-center">
                  <Music className="w-5 h-5 text-[#E8385D]" />
                </div>
                <h2 className="text-lg font-bold text-foreground">{t("demos.howItWorks")}</h2>
              </div>
              <ol className="space-y-3 text-sm text-text-secondary list-decimal list-inside">
                <li>{t("demos.step1")}</li>
                <li>{t("demos.step2")}</li>
                <li>{t("demos.step3")}</li>
                <li>{t("demos.step4")}</li>
              </ol>
            </motion.div>
          </motion.div>

          {/* Form — renders first on mobile */}
          <motion.div
            className="lg:col-span-3 order-1 lg:order-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted uppercase tracking-wider mb-2">
                    {t("demos.artistName")} *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                      name="artistName"
                      required
                      className="w-full rounded-lg bg-subtle/5 border border-border pl-10 pr-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none focus:border-[#E8385D] transition-colors"
                      placeholder={t("demos.artistNamePlaceholder")}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted uppercase tracking-wider mb-2">
                    {t("demos.emailField")} *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg bg-subtle/5 border border-border px-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none focus:border-[#E8385D] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted uppercase tracking-wider mb-2">
                    {t("demos.country")}
                  </label>
                  <div className="relative">
                    <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                      name="country"
                      className="w-full rounded-lg bg-subtle/5 border border-border pl-10 pr-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none focus:border-[#E8385D] transition-colors"
                      placeholder={t("demos.countryPlaceholder")}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted uppercase tracking-wider mb-2">
                    {t("demos.genre")} *
                  </label>
                  <select
                    name="genre"
                    required
                    className="w-full rounded-lg bg-subtle/5 border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-[#E8385D] transition-colors appearance-none"
                  >
                    <option value="" className="bg-surface">{t("demos.selectGenre")}</option>
                    {genres.map((g) => (
                      <option key={g} value={g} className="bg-surface">{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-muted uppercase tracking-wider mb-2">
                  {t("demos.demoLinks")} *
                </label>
                <input
                  name="demoLinks"
                  required
                  className="w-full rounded-lg bg-subtle/5 border border-border px-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none focus:border-[#E8385D] transition-colors"
                  placeholder="https://soundcloud.com/your-track"
                />
              </div>

              <div>
                <label className="block text-xs text-muted uppercase tracking-wider mb-2">
                  {t("demos.socialLinks")}
                </label>
                <input
                  name="socials"
                  className="w-full rounded-lg bg-subtle/5 border border-border px-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none focus:border-[#E8385D] transition-colors"
                  placeholder={t("demos.socialLinksPlaceholder")}
                />
              </div>

              <div>
                <label className="block text-xs text-muted uppercase tracking-wider mb-2">
                  {t("demos.shortBio")}
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  className="w-full rounded-lg bg-subtle/5 border border-border px-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none focus:border-[#E8385D] transition-colors resize-none"
                  placeholder={t("demos.bioPlaceholder")}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#E8385D] py-3.5 text-sm font-semibold text-white hover:bg-[#FF4D73] disabled:opacity-50 transition-colors flex items-center justify-center gap-2 btn-glow"
              >
                <Send size={16} />
                {loading ? t("demos.submitting") : t("demos.submitDemo")}
              </button>

              <FormFeedback
                loading={loading}
                success={success}
                error={error}
                successMessage={t("demos.successMessage")}
                reset={reset}
              />
            </form>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.section
          className="mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">{t("demos.faq")}</h2>
          <div className="space-y-3 max-w-3xl">
            {faqItems.map((item, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-sm font-medium text-foreground">{item.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-muted transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-text-secondary">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
