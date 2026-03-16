"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { useFormSubmit } from "@/lib/useFormSubmit";
import FormFeedback from "@/components/FormFeedback";
import { Send, Mail, Building2 } from "lucide-react";

const inquiryTypes = [
  { value: "general", label: "General Inquiry" },
  { value: "licensing", label: "Licensing & Sync" },
  { value: "press", label: "Press & Media" },
  { value: "partnerships", label: "Partnerships" },
  { value: "booking", label: "Booking" },
];

export default function ContactPage() {
  const { loading, success, error, submitForm, reset } = useFormSubmit("/api/contact");
  const [type, setType] = useState("general");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = Object.fromEntries(new FormData(form));
    await submitForm({ ...formData, type });
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
            Get in Touch
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Contact
          </motion.h1>
          <motion.p
            className="text-lg text-[#A0A0A0] max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Business inquiries, licensing requests, press, or partnerships — we&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar */}
          <motion.div
            variants={stagger()}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#E8385D]/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#E8385D]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Email</h3>
                  <p className="text-sm text-[#A0A0A0]">contact@esotericones.com</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#E8385D]/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#E8385D]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Location</h3>
                  <p className="text-sm text-[#A0A0A0]">Seoul, South Korea</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
              {/* Inquiry type pills */}
              <div>
                <label className="block text-xs text-[#666666] uppercase tracking-wider mb-3">
                  Inquiry Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {inquiryTypes.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setType(t.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        type === t.value
                          ? "bg-[#E8385D] text-white"
                          : "bg-white/5 text-[#A0A0A0] hover:bg-white/10"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#666666] uppercase tracking-wider mb-2">
                    Name *
                  </label>
                  <input
                    name="name"
                    required
                    className="w-full rounded-lg bg-white/5 border border-[#2A2A2A] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#E8385D] transition-colors"
                    placeholder="Your name"
                  />
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

              <div>
                <label className="block text-xs text-[#666666] uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  name="subject"
                  className="w-full rounded-lg bg-white/5 border border-[#2A2A2A] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#E8385D] transition-colors"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-xs text-[#666666] uppercase tracking-wider mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="w-full rounded-lg bg-white/5 border border-[#2A2A2A] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#E8385D] transition-colors resize-none"
                  placeholder="Tell us more..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#E8385D] py-3.5 text-sm font-semibold text-white hover:bg-[#FF4D73] disabled:opacity-50 transition-colors flex items-center justify-center gap-2 btn-glow"
              >
                <Send size={16} />
                {loading ? "Sending..." : "Send Message"}
              </button>

              <FormFeedback
                loading={loading}
                success={success}
                error={error}
                successMessage="Message sent! We'll get back to you soon."
                reset={reset}
              />
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
