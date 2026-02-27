"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Wrench, Code, Layers } from "lucide-react";
import { aiProfile } from "@/data/artist";

const skillIconMap = {
  eye: Eye,
  wrench: Wrench,
  code: Code,
  layers: Layers,
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const projectImages: Record<string, string> = {
  "Dual-Embedding Guided Backdoor Attack on Multimodal Contrastive Learning": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=640&q=80",
  "Semantic-Aware Multi-Label Adversarial Attacks": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=640&q=80",
  "Self-Training for Semi-Supervised Semantic Segmentation": "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=640&q=80",
  "Scalable Urban Dynamic Scenes (NeRF)": "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=640&q=80",
  "Speech Emotion Recognition": "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=640&q=80",
  "Autoregressive Text-to-Image Generation (Parti)": "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=640&q=80",
  "Controllable Text-to-Image Generation (ControlGAN)": "https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=640&q=80",
  "Diffusion Based Text-to-Image Generation (Imagen)": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=640&q=80",
  "Aligning SAM to Open Context via Reinforcement Learning": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=640&q=80",
  "Tool-Augmented Reward Modeling (Themis)": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=640&q=80",
  "ASD Classification with Multi-Site fMRI Data": "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=640&q=80",
  "Mutual Correction Framework for Semi-Supervised Medical Image Segmentation": "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=640&q=80",
  "Why Does the Effective Context Length of LLMs Fall Short?": "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=640&q=80",
};

const projectCategories = ["All", ...Array.from(new Set(aiProfile.projects.map((p) => p.category)))];

export default function AIPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAllProjects, setShowAllProjects] = useState(false);

  const filteredProjects =
    activeCategory === "All"
      ? aiProfile.projects
      : aiProfile.projects.filter((p) => p.category === activeCategory);

  const visibleProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <main className="min-h-screen bg-white text-[#1A1A2E]">
      {/* Hero */}
      <section className="relative overflow-hidden py-28 px-6 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/ai-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#0a0a1a]/75" />

        <motion.div
          className="relative z-10 max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2E86DE]/20 border border-[#2E86DE]/30 text-[#5BA8F0] text-sm font-medium mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            ML / Computer Vision Engineer
          </motion.div>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-white"
          >
            AI/ML <span className="text-[#2E86DE]">Engineer</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {aiProfile.bio}
          </motion.p>
          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={aiProfile.links.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2E86DE] text-white font-semibold hover:bg-[#1B5E8A] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download CV
            </a>
            <a href={aiProfile.links.googleScholar} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/80 font-medium hover:bg-white/10 transition-colors">
              Google Scholar
            </a>
            <a href={aiProfile.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/80 font-medium hover:bg-white/10 transition-colors">
              GitHub
            </a>
            <a href={aiProfile.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/80 font-medium hover:bg-white/10 transition-colors">
              LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Publications */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.h2
          className="text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Featured Publications
        </motion.h2>
        <div className="space-y-8">
          {aiProfile.publications
            .filter((p) => p.featured)
            .map((pub, i) => (
              <motion.div
                key={pub.title}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:border-[#F39C12]/40 hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div className="grid md:grid-cols-[300px_1fr] gap-0">
                  {/* Image */}
                  <div className="relative h-48 md:h-full bg-gradient-to-br from-[#EAF4FC] to-[#2E86DE]/10">
                    {pub.image && (
                      <Image
                        src={pub.image}
                        alt={pub.title}
                        fill
                        className="object-cover"
                        unoptimized={pub.image.endsWith(".gif")}
                      />
                    )}
                  </div>
                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <p className="text-xs text-[#F39C12] font-medium uppercase tracking-wider mb-3">
                      {pub.venue}
                    </p>
                    <h3 className="text-xl font-semibold mb-3 leading-snug">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-[#1A1A2E]/50 mb-2">
                      {pub.authors.map((a, j) => (
                        <span key={a}>
                          {a === "Ebenezer Tarubinga" ? (
                            <strong className="text-[#1A1A2E]/80">{a}</strong>
                          ) : (
                            a
                          )}
                          {j < pub.authors.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                    <p className="text-sm text-[#1A1A2E]/60 mb-5">
                      {pub.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {pub.paper && (
                        <a href={pub.paper} target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 rounded-full text-xs font-medium bg-[#2E86DE]/10 text-[#2E86DE] hover:bg-[#2E86DE]/20 transition-colors">
                          Paper
                        </a>
                      )}
                      {pub.code && (
                        <a href={pub.code} target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 rounded-full text-xs font-medium bg-[#F39C12]/10 text-[#F39C12] hover:bg-[#F39C12]/20 transition-colors">
                          Code
                        </a>
                      )}
                      {pub.projectPage && (
                        <a href={pub.projectPage} target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 rounded-full text-xs font-medium bg-[#1A1A2E]/5 text-[#1A1A2E]/60 hover:bg-[#1A1A2E]/10 transition-colors">
                          Project Page
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* All Projects */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.h2
          className="text-3xl font-bold mb-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Projects & Research
        </motion.h2>
        <motion.p
          className="text-[#1A1A2E]/50 text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Explorations across computer vision, generative models, reinforcement learning, and more
        </motion.p>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setShowAllProjects(false); }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#2E86DE] text-white"
                  : "bg-[#EAF4FC] text-[#1A1A2E]/60 hover:bg-[#2E86DE]/10 hover:text-[#1A1A2E]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {visibleProjects.map((project, i) => (
              <motion.a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:border-[#F39C12]/40 hover:shadow-md transition-all hover:-translate-y-1"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                {projectImages[project.title] && (
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={projectImages[project.title]}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[10px] font-medium bg-white/90 text-[#2E86DE]">
                      {project.category}
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-semibold leading-snug mb-3 group-hover:text-[#2E86DE] transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-sm text-[#2E86DE] group-hover:text-[#F39C12] transition-colors">
                    View Project &rarr;
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length > 6 && !showAllProjects && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllProjects(true)}
              className="px-6 py-2.5 rounded-full border border-[#2E86DE]/30 text-[#2E86DE] font-medium hover:bg-[#2E86DE]/10 transition-colors cursor-pointer"
            >
              Show All ({filteredProjects.length})
            </button>
          </div>
        )}
      </section>

      {/* Work Experience */}
      <section className="bg-[#F8FBFF] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Work Experience
          </motion.h2>
          <div className="space-y-8">
            {aiProfile.experience.map((job, i) => (
              <motion.div
                key={job.company}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 md:p-8 hover:border-[#F39C12]/40 hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#EAF4FC] overflow-hidden relative hidden sm:block">
                    <Image
                      src={job.logo}
                      alt={job.company}
                      fill
                      className="object-contain p-1.5"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                      <h3 className="text-lg font-semibold">{job.role}</h3>
                      <span className="text-sm text-[#F39C12]">{job.company}</span>
                    </div>
                    <p className="text-xs text-[#1A1A2E]/40 mb-4">
                      {job.period} &middot; {job.location}
                    </p>
                    <ul className="space-y-2">
                      {job.bullets.map((bullet) => (
                        <li key={bullet} className="text-sm text-[#1A1A2E]/60 flex gap-2">
                          <span className="text-[#2E86DE] mt-1 flex-shrink-0">&#8226;</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.h2
          className="text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Education
        </motion.h2>
        <motion.div
          className="max-w-2xl mx-auto rounded-2xl border border-gray-200 bg-white shadow-sm p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-5">
            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#EAF4FC] overflow-hidden relative">
              <Image
                src={aiProfile.education.logo}
                alt={aiProfile.education.school}
                fill
                className="object-contain p-2"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{aiProfile.education.school}</h3>
              <p className="text-sm text-[#1A1A2E]/60 mt-1">{aiProfile.education.degree}</p>
              <p className="text-xs text-[#1A1A2E]/40 mt-1">
                {aiProfile.education.years} &middot; Advised by{" "}
                <a href={aiProfile.education.advisorUrl} target="_blank" rel="noopener noreferrer" className="text-[#2E86DE] hover:underline">
                  {aiProfile.education.advisor}
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Skills */}
      <section className="bg-[#F8FBFF] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Core Skills
          </motion.h2>
          <motion.div
            className="grid sm:grid-cols-2 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {aiProfile.skills.map((skill, i) => {
              const Icon = skillIconMap[skill.icon];
              return (
              <motion.div
                key={skill.category}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F39C12]/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-[#F39C12]" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#F39C12] uppercase tracking-wider">
                    {skill.category}
                  </h3>
                </div>
                <p className="text-sm text-[#1A1A2E]/60 leading-relaxed">
                  {skill.items}
                </p>
              </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Certificates */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.h2
          className="text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Certificates
        </motion.h2>
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {aiProfile.certificates.map((cert, i) => (
            <motion.div
              key={cert.name}
              variants={fadeUp}
              custom={i}
              className="rounded-xl border border-gray-200 bg-white shadow-sm p-4 text-center flex flex-col items-center"
            >
              {cert.logo && (
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <Image
                    src={cert.logo}
                    alt={cert.org}
                    width={48}
                    height={48}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
              <p className="text-xs text-[#2E86DE] font-medium mb-1">{cert.org}</p>
              <p className="text-sm text-[#1A1A2E]/70 leading-snug">{cert.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-[#EAF4FC] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            className="rounded-2xl bg-white border border-gray-200 shadow-sm p-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4">Interested in collaborating?</h2>
            <p className="text-[#1A1A2E]/60 mb-8">
              Open to research collaborations, consulting, and engineering opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:contact@ebstar.co"
                className="px-8 py-3 rounded-full bg-[#2E86DE] text-white font-semibold hover:bg-[#1B5E8A] transition-colors"
              >
                Get in Touch
              </a>
              <a
                href={aiProfile.links.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full border border-[#2E86DE]/30 text-[#1A1A2E]/70 font-medium hover:bg-[#2E86DE]/10 transition-colors"
              >
                View Full CV
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
