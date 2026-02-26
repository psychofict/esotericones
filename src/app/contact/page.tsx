"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { socials } from "@/data/artist";
import { useFormSubmit } from "@/lib/useFormSubmit";
import FormFeedback from "@/components/FormFeedback";

const tabs = [
  "Booking",
  "Press",
  "Collaborations",
  "Label Submissions",
  "General",
] as const;
type TabType = (typeof tabs)[number];

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-[#1A1A2E] border border-[#2E86DE]/30 text-[#F8FBFF] placeholder-[#EAF4FC]/30 focus:outline-none focus:border-[#F39C12] transition-colors";
const labelClass = "block text-sm text-[#EAF4FC]/70 mb-2";
const btnBase =
  "w-full py-3 rounded-xl bg-gradient-to-r from-[#2E86DE] to-[#1B5E8A] text-white font-semibold hover:from-[#F39C12] hover:to-[#2E86DE] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    eventType: "",
    date: "",
    location: "",
    budget: "",
    message: "",
  });
  const { loading, success, error, submitForm, reset } = useFormSubmit("/api/contact");
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm({ type: "booking", ...form });
    if (!error) setForm({ name: "", email: "", eventType: "", date: "", location: "", budget: "", message: "" });
  };
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Name</label>
          <input name="name" value={form.name} onChange={onChange} required className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input name="email" type="email" value={form.email} onChange={onChange} required className={inputClass} placeholder="you@example.com" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Event Type</label>
          <input name="eventType" value={form.eventType} onChange={onChange} className={inputClass} placeholder="Festival, Club, Private, etc." />
        </div>
        <div>
          <label className={labelClass}>Date</label>
          <input name="date" type="date" value={form.date} onChange={onChange} className={inputClass} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Location</label>
          <input name="location" value={form.location} onChange={onChange} className={inputClass} placeholder="City, Venue" />
        </div>
        <div>
          <label className={labelClass}>Budget Range</label>
          <select name="budget" value={form.budget} onChange={onChange} className={inputClass}>
            <option value="">Select budget range</option>
            <option value="under-1k">Under $1,000</option>
            <option value="1k-5k">$1,000 - $5,000</option>
            <option value="5k-10k">$5,000 - $10,000</option>
            <option value="10k-25k">$10,000 - $25,000</option>
            <option value="25k+">$25,000+</option>
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass}>Message</label>
        <textarea name="message" value={form.message} onChange={onChange} rows={4} className={`${inputClass} resize-none`} placeholder="Tell us about your event..." />
      </div>
      <button type="submit" disabled={loading} className={btnBase}>
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        Submit Booking Inquiry
      </button>
      <FormFeedback loading={false} success={success} error={error} successMessage="Booking inquiry submitted! We'll be in touch." reset={reset} />
    </form>
  );
}

function PressForm() {
  const [form, setForm] = useState({ outlet: "", email: "", deadline: "", topic: "" });
  const { loading, success, error, submitForm, reset } = useFormSubmit("/api/contact");
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm({ type: "press", name: form.outlet, email: form.email, message: form.topic, deadline: form.deadline });
    if (!error) setForm({ outlet: "", email: "", deadline: "", topic: "" });
  };
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Outlet Name</label>
          <input name="outlet" value={form.outlet} onChange={onChange} required className={inputClass} placeholder="Publication / Media outlet" />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input name="email" type="email" value={form.email} onChange={onChange} required className={inputClass} placeholder="you@outlet.com" />
        </div>
      </div>
      <div>
        <label className={labelClass}>Deadline</label>
        <input name="deadline" type="date" value={form.deadline} onChange={onChange} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Topic</label>
        <textarea name="topic" value={form.topic} onChange={onChange} rows={4} required className={`${inputClass} resize-none`} placeholder="What would you like to cover?" />
      </div>
      <button type="submit" disabled={loading} className={btnBase}>
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        Submit Press Inquiry
      </button>
      <FormFeedback loading={false} success={success} error={error} successMessage="Press inquiry submitted!" reset={reset} />
    </form>
  );
}

function CollaborationsForm() {
  const [form, setForm] = useState({ name: "", email: "", collabType: "", links: "", message: "" });
  const { loading, success, error, submitForm, reset } = useFormSubmit("/api/contact");
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm({ type: "collaboration", ...form });
    if (!error) setForm({ name: "", email: "", collabType: "", links: "", message: "" });
  };
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Artist / Brand Name</label>
          <input name="name" value={form.name} onChange={onChange} required className={inputClass} placeholder="Your name or brand" />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input name="email" type="email" value={form.email} onChange={onChange} required className={inputClass} placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label className={labelClass}>Collaboration Type</label>
        <input name="collabType" value={form.collabType} onChange={onChange} className={inputClass} placeholder="Music, Brand Deal, Content, etc." />
      </div>
      <div>
        <label className={labelClass}>Links</label>
        <input name="links" value={form.links} onChange={onChange} className={inputClass} placeholder="Website, social media, portfolio, etc." />
      </div>
      <div>
        <label className={labelClass}>Message</label>
        <textarea name="message" value={form.message} onChange={onChange} rows={4} className={`${inputClass} resize-none`} placeholder="Tell us about the collaboration..." />
      </div>
      <button type="submit" disabled={loading} className={btnBase}>
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        Submit Collaboration Inquiry
      </button>
      <FormFeedback loading={false} success={success} error={error} successMessage="Collaboration inquiry submitted!" reset={reset} />
    </form>
  );
}

function LabelSubmissionsForm() {
  const [form, setForm] = useState({ artistName: "", email: "", genre: "", musicLinks: "", message: "" });
  const { loading, success, error, submitForm, reset } = useFormSubmit("/api/contact");
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm({ type: "label", ...form });
    if (!error) setForm({ artistName: "", email: "", genre: "", musicLinks: "", message: "" });
  };
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Artist Name</label>
          <input name="artistName" value={form.artistName} onChange={onChange} required className={inputClass} placeholder="Your artist / stage name" />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input name="email" type="email" value={form.email} onChange={onChange} required className={inputClass} placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label className={labelClass}>Genre</label>
        <input name="genre" value={form.genre} onChange={onChange} required className={inputClass} placeholder="e.g. Piano House, Amapiano" />
      </div>
      <div>
        <label className={labelClass}>Links to Music</label>
        <input name="musicLinks" value={form.musicLinks} onChange={onChange} required className={inputClass} placeholder="Spotify, SoundCloud, Google Drive, etc." />
      </div>
      <div>
        <label className={labelClass}>Message</label>
        <textarea name="message" value={form.message} onChange={onChange} rows={4} className={`${inputClass} resize-none`} placeholder="Tell us about yourself and your music..." />
      </div>
      <button type="submit" disabled={loading} className={btnBase}>
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        Submit Demo
      </button>
      <FormFeedback loading={false} success={success} error={error} successMessage="Demo submitted! We'll be in touch." reset={reset} />
    </form>
  );
}

function GeneralForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { loading, success, error, submitForm, reset } = useFormSubmit("/api/contact");
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm({ type: "general", ...form });
    if (!error) setForm({ name: "", email: "", message: "" });
  };
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Name</label>
          <input name="name" value={form.name} onChange={onChange} required className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input name="email" type="email" value={form.email} onChange={onChange} required className={inputClass} placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label className={labelClass}>Message</label>
        <textarea name="message" value={form.message} onChange={onChange} rows={5} required className={`${inputClass} resize-none`} placeholder="What's on your mind?" />
      </div>
      <button type="submit" disabled={loading} className={btnBase}>
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        Send Message
      </button>
      <FormFeedback loading={false} success={success} error={error} successMessage="Message sent successfully!" reset={reset} />
    </form>
  );
}

const formComponents: Record<TabType, React.FC> = {
  Booking: BookingForm,
  Press: PressForm,
  Collaborations: CollaborationsForm,
  "Label Submissions": LabelSubmissionsForm,
  General: GeneralForm,
};

const socialIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  spotify: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  ),
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
};

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<TabType>("Booking");
  const ActiveForm = formComponents[activeTab];

  return (
    <main className="min-h-screen bg-[#1A1A2E] text-[#F8FBFF]">
      {/* Hero */}
      <section className="relative overflow-hidden py-28 px-6 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-[#1A1A2E]/65" />
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="text-lg text-[#EAF4FC]/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Booking, press, collaborations, and more
          </motion.p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-[1fr_320px] gap-12">
          {/* Form Column */}
          <div>
            {/* Tab Selector */}
            <motion.div
              className="flex flex-wrap gap-2 mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                    activeTab === tab
                      ? "bg-[#2E86DE] text-white"
                      : "bg-white/5 text-[#EAF4FC]/60 hover:bg-white/10 hover:text-[#EAF4FC]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </motion.div>

            {/* Active Form */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-[#2E86DE]/20 bg-white/5 backdrop-blur-md p-8"
              >
                <h2 className="text-xl font-semibold mb-6">{activeTab}</h2>
                <ActiveForm />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <motion.aside
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {/* Email */}
            <div className="rounded-2xl border border-[#2E86DE]/20 bg-white/5 backdrop-blur-md p-6">
              <h3 className="font-semibold mb-3 text-[#F39C12]">Email</h3>
              <a
                href="mailto:contact@ebstar.co"
                className="text-[#EAF4FC]/80 hover:text-[#2E86DE] transition-colors text-sm break-all"
              >
                contact@ebstar.co
              </a>
            </div>

            {/* Socials */}
            <div className="rounded-2xl border border-[#2E86DE]/20 bg-white/5 backdrop-blur-md p-6">
              <h3 className="font-semibold mb-4 text-[#F39C12]">
                Social Links
              </h3>
              <div className="space-y-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#EAF4FC]/60 hover:text-[#2E86DE] transition-colors text-sm"
                  >
                    {socialIcons[social.icon] || (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    )}
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="rounded-2xl border border-[#2E86DE]/20 bg-white/5 backdrop-blur-md overflow-hidden">
              <div className="relative h-32">
                <Image
                  src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=640&q=80"
                  alt="Seoul skyline"
                  fill
                  className="object-cover"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/80 to-transparent" />
              </div>
              <div className="p-6 -mt-2 relative z-10">
                <h3 className="font-semibold mb-3 text-[#F39C12]">Based In</h3>
                <p className="text-sm text-[#EAF4FC]/60">Seoul, South Korea</p>
                <p className="text-xs text-[#EAF4FC]/40 mt-1">
                  Available worldwide
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>
    </main>
  );
}
