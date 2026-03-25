"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { labelStats } from "@/data/label";
import { useTranslation } from "@/i18n/useTranslation";
import { statKeys, statIcons } from "@/lib/statConfig";

const countryDots = [
  { name: "South Korea", x: "78%", y: "38%" },
  { name: "Japan", x: "83%", y: "40%" },
  { name: "South Africa", x: "55%", y: "78%" },
  { name: "Zimbabwe", x: "56%", y: "70%" },
  { name: "India", x: "68%", y: "48%" },
  { name: "Mexico", x: "18%", y: "48%" },
  { name: "Sweden", x: "52%", y: "22%" },
  { name: "China", x: "75%", y: "42%" },
];

export default function StatsBar() {
  const { t } = useTranslation();
  return (
    <section className="py-10 md:py-16 bg-surface border-y border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Stats row — horizontal scroll on mobile, grid on desktop */}
        <motion.div
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 md:pb-0 md:grid md:grid-cols-4 md:gap-8 md:overflow-visible"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {labelStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="flex-shrink-0 w-[140px] md:w-auto glass-card rounded-xl p-4 md:p-0 md:bg-transparent md:backdrop-blur-0 md:border-0 text-center"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E8385D]/10 text-[#E8385D] mb-2 md:mb-3">
                {statIcons[stat.icon]}
              </div>
              <p className="text-2xl md:text-4xl font-bold text-gradient">{stat.value}</p>
              <p className="text-xs md:text-sm text-muted mt-1 uppercase tracking-wider whitespace-nowrap">{t(statKeys[stat.label])}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Global reach mini-map */}
        <motion.div
          className="mt-8 md:mt-10 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-muted mb-4">
            Global Reach
          </p>
          <div className="relative mx-auto max-w-2xl h-32 sm:h-40 md:h-48">
            {/* Simplified world map outline via SVG */}
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full text-border"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.3"
            >
              {/* Simplified continent outlines */}
              {/* North America */}
              <path d="M150,120 Q180,100 220,110 Q260,90 280,120 Q290,150 270,180 Q250,200 220,210 Q200,220 180,200 Q160,230 140,210 Q130,190 120,170 Q110,150 130,130Z" />
              {/* South America */}
              <path d="M220,250 Q240,240 260,260 Q270,290 280,320 Q275,360 260,390 Q240,400 230,380 Q210,350 200,310 Q195,280 210,260Z" />
              {/* Europe */}
              <path d="M460,100 Q480,90 510,95 Q530,100 540,120 Q535,140 520,150 Q500,155 480,145 Q465,130 460,115Z" />
              {/* Africa */}
              <path d="M480,180 Q510,170 540,190 Q560,220 570,260 Q565,310 550,350 Q530,380 510,390 Q490,380 480,350 Q470,310 465,270 Q460,230 470,200Z" />
              {/* Asia */}
              <path d="M560,80 Q600,70 660,80 Q720,90 770,110 Q800,130 810,160 Q800,180 770,190 Q740,200 700,195 Q660,200 630,190 Q600,180 580,160 Q560,140 555,110Z" />
              {/* Australia */}
              <path d="M770,320 Q800,310 830,320 Q850,340 840,360 Q820,375 790,370 Q770,355 765,340Z" />
            </svg>

            {/* Country dots with pulse animation */}
            {countryDots.map((dot, i) => (
              <motion.div
                key={dot.name}
                className="absolute group"
                style={{ left: dot.x, top: dot.y }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 300 }}
              >
                {/* Pulse ring */}
                <span className="absolute -inset-2 rounded-full bg-[#E8385D]/20 animate-ping" style={{ animationDuration: `${2 + i * 0.3}s` }} />
                {/* Dot */}
                <span className="relative block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#E8385D] shadow-lg shadow-[#E8385D]/40" />
                {/* Tooltip */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-[10px] bg-background/90 text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-border">
                  {dot.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
