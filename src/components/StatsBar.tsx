"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { labelStats } from "@/data/label";
import { useTranslation } from "@/i18n/useTranslation";
import { statKeys, statIcons } from "@/lib/statConfig";

export default function StatsBar() {
  const { t } = useTranslation();
  return (
    <section className="py-16 bg-surface border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {labelStats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E8385D]/10 text-[#E8385D] mb-3">
                {statIcons[stat.icon]}
              </div>
              <p className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</p>
              <p className="text-sm text-muted mt-1 uppercase tracking-wider">{t(statKeys[stat.label])}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
