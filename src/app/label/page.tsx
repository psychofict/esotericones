"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { artist, labelGenres, labelReleases } from "@/data/artist";
import { useFormSubmit } from "@/lib/useFormSubmit";
import FormFeedback from "@/components/FormFeedback";
import SpotifyEmbed from "@/components/SpotifyEmbed";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const roster = [
  "CJ Melzy",
  "ESØTËRIX",
  "Ebstar",
  "KARLOST",
  "Loxion TXI",
  "Makhathini",
  "Mfanakithi",
  "PieceMaker",
  "Postythegod",
  "RATSBE",
  "Regina Ashie",
  "SkyDAWN",
  "Swedish Dance Glory",
  "Team G",
  "ThatGirlVee",
  "Tribal Muziq",
  "illversemusic",
  "retr0",
];

interface ArtistData {
  name: string;
  image: string | null;
  url: string | null;
}

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-[#1A1A2E] placeholder-[#1A1A2E]/30 focus:outline-none focus:border-[#F39C12] transition-colors";

function extractSpotifyId(url: string | null | undefined): string | null {
  if (!url) return null;
  const match = url.match(/artist\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

function ArtistCard({ name, data }: { name: string; data?: ArtistData }) {
  const isFounder = name === "Ebstar";
  const image = data?.image;
  const spotifyId = extractSpotifyId(data?.url);

  const card = (
    <motion.div
      variants={itemVariants}
      className={`rounded-2xl p-5 text-center transition-all hover:shadow-md ${
        isFounder
          ? "bg-gradient-to-br from-[#2E86DE] to-[#F39C12] text-white shadow-md"
          : "bg-white border border-gray-200 shadow-sm hover:border-[#F39C12]/40"
      } ${spotifyId ? "cursor-pointer" : ""}`}
      whileHover={{ y: -4 }}
    >
      <div
        className={`w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden flex items-center justify-center text-xl font-bold ${
          isFounder
            ? "bg-white/20 text-white"
            : "bg-[#EAF4FC] text-[#2E86DE]"
        }`}
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          name.charAt(0).toUpperCase()
        )}
      </div>
      <p className={`text-sm font-semibold leading-tight ${isFounder ? "text-white" : "text-[#1A1A2E]"}`}>
        {name}
      </p>
      {isFounder && (
        <p className="text-[10px] text-white/70 mt-1 uppercase tracking-wider">Founder</p>
      )}
    </motion.div>
  );

  if (spotifyId) {
    return (
      <Link href={`/label/${spotifyId}`}>
        {card}
      </Link>
    );
  }

  return card;
}

const labelStats = [
  { value: roster.length.toString(), label: "Artists on Roster" },
  { value: "6", label: "Countries Represented" },
  { value: "30+", label: "Singles Released" },
  { value: "2M+", label: "Label Streams" },
];

export default function LabelPage() {
  const [artistData, setArtistData] = useState<Record<string, ArtistData>>({});
  const [form, setForm] = useState({
    artistName: "",
    email: "",
    genre: "",
    musicLinks: "",
    message: "",
  });
  const { loading, success, error, submitForm, reset } = useFormSubmit("/api/contact");

  useEffect(() => {
    fetch("/api/spotify-artists")
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data) => {
        if (data && !data.error) setArtistData(data);
      })
      .catch(() => {});
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm({ type: "label", ...form });
    if (!error) setForm({ artistName: "", email: "", genre: "", musicLinks: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-white text-[#1A1A2E]">
      {/* Hero */}
      <section className="relative overflow-hidden py-28 px-6 text-center bg-[#EAF4FC]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2E86DE]/10 via-transparent to-transparent" />
        {/* Floating decorative circles */}
        <div className="absolute top-12 left-[10%] w-32 h-32 rounded-full bg-[#2E86DE]/5 blur-2xl" />
        <div className="absolute bottom-16 right-[15%] w-40 h-40 rounded-full bg-[#F39C12]/5 blur-2xl" />
        <div className="absolute top-1/2 left-[60%] w-24 h-24 rounded-full bg-[#2E86DE]/8 blur-xl" />
        <motion.div
          className="relative z-10 max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="mx-auto mb-8 w-44 h-44 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src="/images/brands/the-esoteric-ones.jpg"
              alt="The Esoteric Ones Records"
              width={224}
              height={224}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-[#F39C12] uppercase tracking-[0.35em] text-sm font-medium mb-4"
          >
            Independent Record Label
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={2}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
          >
            The ES&Oslash;T&Euml;RIC Ones
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={3}
            className="text-[#1A1A2E]/50 text-lg mb-2"
          >
            Est. {artist.labelFounded}
          </motion.p>
          <motion.p
            variants={fadeUp}
            custom={4}
            className="text-[#1A1A2E]/60 text-base max-w-md mx-auto"
          >
            An international collective of artists pushing boundaries from Seoul to the world.
          </motion.p>
        </motion.div>
      </section>

      {/* Stats Banner */}
      <motion.section
        className="py-16 px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {labelStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#2E86DE]">{stat.value}</p>
              <p className="text-sm text-[#1A1A2E]/50 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* About the Label */}
      <motion.section
        id="about"
        className="relative py-20 px-6 scroll-mt-20 overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-[#F8FBFF]/65" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#F39C12]">
            About the Label
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed text-[#1A1A2E]/70 mb-6">
            Supporting young artists in developing their careers and earning a
            living. We believe in authenticity, creative freedom, and building
            lasting legacies through music.
          </p>
          <p className="text-lg leading-relaxed text-[#1A1A2E]/60">
            Founded in Seoul in {artist.labelFounded}, The ES&Oslash;T&Euml;RIC Ones brings together
            talent from across Africa, Asia, and Europe. Our roster spans genres from
            Amapiano and Piano House to Hip-Hop and R&amp;B — united by a commitment
            to authentic, boundary-pushing sound.
          </p>
        </div>
      </motion.section>

      {/* Our Sound / Genres */}
      <motion.section
        id="sound"
        className="py-20 px-6 scroll-mt-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Our Sound</h2>
          <p className="text-[#1A1A2E]/50 mb-10">
            A genre-spanning collective rooted in electronic music
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {labelGenres.map((genre) => (
              <span
                key={genre}
                className="px-5 py-2.5 rounded-full bg-[#EAF4FC] text-[#2E86DE] text-sm font-medium border border-[#2E86DE]/10 hover:bg-[#2E86DE] hover:text-white transition-colors"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Roster */}
      <section id="roster" className="bg-[#F8FBFF] py-20 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold mb-4 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Label Roster
          </motion.h2>
          <motion.p
            className="text-center text-[#1A1A2E]/50 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {roster.length} artists and counting
          </motion.p>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {roster.map((name) => (
              <ArtistCard key={name} name={name} data={artistData[name]} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Releases */}
      <section id="releases" className="py-20 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-4 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Featured Releases
          </motion.h2>
          <motion.p
            className="text-center text-[#1A1A2E]/50 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Recent singles and albums from the label
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {labelReleases.map((release) => (
              <SpotifyEmbed
                key={release.title}
                uri={release.spotifyUri}
                type="compact"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Spotify Label Playlist */}
      <motion.section
        className="bg-[#F8FBFF] py-20 px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">
            Label Playlist
          </h2>
          <p className="text-center text-[#1A1A2E]/50 mb-8">
            The best of The ES&Oslash;T&Euml;RIC Ones, all in one place
          </p>
          <SpotifyEmbed uri="playlist/2y6gkLil8b3R6sw0rW7Ih8" type="large" />
        </div>
      </motion.section>

      {/* Demo Submission */}
      <section id="demo" className="py-20 scroll-mt-20">
        <div className="max-w-2xl mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold mb-4 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Submit a Demo
          </motion.h2>
          <motion.p
            className="text-[#1A1A2E]/50 text-center mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Think you&apos;d be a great fit? Send us your music.
          </motion.p>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-[#1A1A2E]/60 mb-2">
                  Artist Name
                </label>
                <input
                  name="artistName"
                  value={form.artistName}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Your artist / stage name"
                />
              </div>
              <div>
                <label className="block text-sm text-[#1A1A2E]/60 mb-2">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#1A1A2E]/60 mb-2">
                Genre
              </label>
              <input
                name="genre"
                value={form.genre}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="e.g. Piano House, Amapiano, Pop"
              />
            </div>
            <div>
              <label className="block text-sm text-[#1A1A2E]/60 mb-2">
                Links to Music
              </label>
              <input
                name="musicLinks"
                value={form.musicLinks}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="Spotify, SoundCloud, Google Drive, etc."
              />
            </div>
            <div>
              <label className="block text-sm text-[#1A1A2E]/60 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Tell us about yourself and your music..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#2E86DE] text-white font-semibold hover:bg-[#1B5E8A] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Submit Demo
            </button>
            <FormFeedback loading={false} success={success} error={error} successMessage="Demo submitted! We'll be in touch." reset={reset} />
          </motion.form>
        </div>
      </section>

      {/* Contact Info */}
      <motion.section
        className="bg-[#F8FBFF] px-6 py-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Label Inquiries</h2>
          <p className="text-[#1A1A2E]/50 mb-6">
            For business, licensing, and general label inquiries:
          </p>
          <a
            href={`mailto:${artist.contact}`}
            className="text-[#F39C12] hover:text-[#2E86DE] transition-colors text-lg font-medium"
          >
            {artist.contact}
          </a>
          <div className="flex items-center justify-center gap-6 mt-8">
            <a
              href="https://www.instagram.com/esotericones_records"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A1A2E]/50 hover:text-[#E1306C] transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a
              href="https://www.linkedin.com/company/esotericones-records/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A1A2E]/50 hover:text-[#0077B5] transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
