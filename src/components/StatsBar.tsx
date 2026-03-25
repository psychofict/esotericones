"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { labelStats } from "@/data/label";
import { useTranslation } from "@/i18n/useTranslation";
import { statKeys, statIcons } from "@/lib/statConfig";

// Country marker positions as % of map width/height (equirectangular projection)
const countryMarkers = [
  { name: "South Korea", x: 77.5, y: 37 },
  { name: "Japan", x: 80, y: 38 },
  { name: "Zimbabwe", x: 53.5, y: 68 },
  { name: "South Africa", x: 53, y: 76 },
  { name: "India", x: 67, y: 48 },
  { name: "Mexico", x: 20, y: 48 },
  { name: "Sweden", x: 52, y: 22 },
  { name: "China", x: 73, y: 38 },
];

export default function StatsBar() {
  const { t } = useTranslation();
  return (
    <section className="py-10 md:py-16 bg-surface border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        {/* Stats cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {labelStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="glass-card rounded-xl p-4 md:p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E8385D]/10 text-[#E8385D] mb-2">
                {statIcons[stat.icon]}
              </div>
              <p className="text-2xl md:text-4xl font-bold text-gradient">{stat.value}</p>
              <p className="text-[11px] md:text-sm text-muted mt-1 uppercase tracking-wider">{t(statKeys[stat.label])}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Global reach map */}
        <motion.div
          className="mt-8 md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-muted mb-4">
            Global Reach
          </p>
          <div className="relative mx-auto max-w-3xl">
            {/* Real world map SVG as background */}
            <img
              src="/images/world-map.svg"
              alt=""
              className="w-full h-auto opacity-15"
              draggable={false}
            />

            {/* Country markers overlaid on map */}
            {countryMarkers.map((marker, i) => (
              <motion.div
                key={marker.name}
                className="absolute group"
                style={{ left: `${marker.x}%`, top: `${marker.y}%`, transform: "translate(-50%, -50%)" }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 300 }}
              >
                {/* Pulse ring */}
                <span className="absolute inset-0 -m-1.5 sm:-m-2 rounded-full bg-[#E8385D]/20 animate-ping" style={{ animationDuration: `${2.5 + i * 0.3}s` }} />
                {/* Dot */}
                <span className="relative block w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#E8385D] shadow-lg shadow-[#E8385D]/40" />
                {/* Label */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-1.5 py-0.5 rounded text-[8px] sm:text-[10px] font-semibold bg-background/90 text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-border shadow-sm">
                  {marker.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
