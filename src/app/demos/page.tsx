"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { useFormSubmit } from "@/lib/useFormSubmit";
import FormFeedback from "@/components/FormFeedback";
import { Send, ChevronDown, Music, FileText, Globe, User } from "lucide-react";

const genres = [
  "Piano House", "Amapiano", "Dance-Pop", "Deep House", "Progressive House",
  "Future Bass", "Pop", "Big Room", "Hip-Hop", "Afrobeats", "R&B", "Electronic", "Other",
];

const faq = [
  {
    q: "What genres does the label accept?",
    a: "We're primarily focused on piano house, Amapiano, dance-pop, hip-hop, R&B, and electronic music — but we're open to any genre if the quality is there.",
  },
  {
    q: "How long does it take to hear back?",
    a: "We review all submissions within 2-4 weeks. If we're interested, we'll reach out via email.",
  },
  {
    q: "Do I need to be signed exclusively?",
    a: "Not necessarily. We offer both exclusive and non-exclusive agreements depending on the project.",
  },
  {
    q: "What should I include in my demo?",
    a: "At minimum: 1-3 tracks (links to streaming or private SoundCloud), a short bio, and your social media links.",
  },
];

export default function DemosPage() {
  const { loading, success, error, submitForm, reset } = useFormSubmit("/api/demo");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    await submitForm(data);
    if (!error) form.reset();
  };

  return (
    <main id="main-content" className="min-h-screen bg-[#0A0A0A]">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.p
            className="text-[#E8385D] text-xs font-semibold uppercase tracking-[0.3em] mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Join the Roster
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Submit Your Demo
          </motion.h1>
          <motion.p
            className="text-lg text-[#A0A0A0] max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            We&apos;re always listening. If your sound is bold, emotional, and unapologetic &mdash; send it over.
          </motion.p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Guidelines */}
          <motion.div
            className="lg:col-span-2"
            variants={stagger()}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#E8385D]/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#E8385D]" />
                </div>
                <h2 className="text-lg font-bold text-white">What We Look For</h2>
              </div>
              <ul className="space-y-3 text-sm text-[#A0A0A0]">
                <li>High production quality &mdash; your mix matters.</li>
                <li>Originality and a distinct artistic voice.</li>
                <li>Emotional depth &mdash; music that moves people.</li>
                <li>Artists who are serious about building a career.</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#E8385D]/10 flex items-center justify-center">
                  <Music className="w-5 h-5 text-[#E8385D]" />
                </div>
                <h2 className="text-lg font-bold text-white">How It Works</h2>
              </div>
              <ol className="space-y-3 text-sm text-[#A0A0A0] list-decimal list-inside">
                <li>Fill out the form with your details and demo links.</li>
                <li>Our A&R team reviews every submission.</li>
                <li>If we like what we hear, we&apos;ll be in touch within 2&ndash;4 weeks.</li>
                <li>We discuss release plans, distribution, and next steps.</li>
              </ol>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#666666] uppercase tracking-wider mb-2">
                    Artist / Project Name *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" />
                    <input
                      name="artistName"
                      required
                      className="w-full rounded-lg bg-white/5 border border-[#2A2A2A] pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#E8385D] transition-colors"
                      placeholder="Your artist name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#666666] uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg bg-white/5 border border-[#2A2A2A] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#E8385D] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#666666] uppercase tracking-wider mb-2">
                    Country
                  </label>
                  <div className="relative">
                    <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" />
                    <input
                      name="country"
                      className="w-full rounded-lg bg-white/5 border border-[#2A2A2A] pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#E8385D] transition-colors"
                      placeholder="Your country"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#666666] uppercase tracking-wider mb-2">
                    Genre *
                  </label>
                  <select
                    name="genre"
                    required
                    className="w-full rounded-lg bg-white/5 border border-[#2A2A2A] px-4 py-3 text-sm text-white outline-none focus:border-[#E8385D] transition-colors appearance-none"
                  >
                    <option value="" className="bg-[#141414]">Select genre</option>
                    {genres.map((g) => (
                      <option key={g} value={g} className="bg-[#141414]">{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#666666] uppercase tracking-wider mb-2">
                  Demo Link(s) * — Spotify, SoundCloud, Google Drive, etc.
                </label>
                <input
                  name="demoLinks"
                  required
                  className="w-full rounded-lg bg-white/5 border border-[#2A2A2A] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#E8385D] transition-colors"
                  placeholder="https://soundcloud.com/your-track"
                />
              </div>

              <div>
                <label className="block text-xs text-[#666666] uppercase tracking-wider mb-2">
                  Social Links — Instagram, Spotify, etc.
                </label>
                <input
                  name="socials"
                  className="w-full rounded-lg bg-white/5 border border-[#2A2A2A] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#E8385D] transition-colors"
                  placeholder="https://instagram.com/yourname"
                />
              </div>

              <div>
                <label className="block text-xs text-[#666666] uppercase tracking-wider mb-2">
                  Short Bio / Message
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  className="w-full rounded-lg bg-white/5 border border-[#2A2A2A] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#E8385D] transition-colors resize-none"
                  placeholder="Tell us about yourself and your music..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#E8385D] py-3.5 text-sm font-semibold text-white hover:bg-[#FF4D73] disabled:opacity-50 transition-colors flex items-center justify-center gap-2 btn-glow"
              >
                <Send size={16} />
                {loading ? "Submitting..." : "Submit Demo"}
              </button>

              <FormFeedback
                loading={loading}
                success={success}
                error={error}
                successMessage="Demo submitted! We'll review it and get back to you."
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
          <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-3xl">
            {faq.map((item, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-sm font-medium text-white">{item.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#666666] transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-[#A0A0A0]">{item.a}</p>
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
