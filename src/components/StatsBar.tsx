"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { labelStats } from "@/data/label";
import { useTranslation } from "@/i18n/useTranslation";
import { statKeys, statIcons } from "@/lib/statConfig";

// Dot-matrix world map: 70 cols × 28 rows, '#' = land
const mapGrid = [
  "......................................................................",
  "......................................................................",
  "..........####..................................##########..........",
  ".........#######...##..........................############.........",
  "........##########.###........................##############........",
  ".......############.##...........#...........################.......",
  ".......##############.#..........##.........##################......",
  ".......###############...........##........###################.##...",
  ".......################..........###......######################.#..",
  "........###############..........####....########.###.##########....",
  ".........#############...........####...#######...##...#########....",
  "..........###########............####...######....###...########....",
  "...........#########..............###...#####.....####...#######....",
  "............#######...............###....####.....####....######....",
  ".............#####................###....####.....####.....#####....",
  "..............####.....#..........###.....###......###......####....",
  "..............###......##.........####....###.......##......####....",
  "...............#.......###........####.....##........#.......###....",
  "....................#..####........###......#.................##.....",
  "....................#..#####.......###......#..........................",
  ".....................#.#####........##.....#..........####...........",
  "......................######........##.....#.........######..........",
  "......................#####..........#....#..........######..........",
  ".......................####..........#...............#####...........",
  ".......................####...........#...............####...........",
  "........................###..............................##.........",
  "........................##..............................................",
  "......................................................................",
];

// Country markers positioned on the 70×28 grid (col, row)
const countryMarkers = [
  { name: "South Korea", col: 61, row: 9 },
  { name: "Japan", col: 64, row: 9 },
  { name: "Zimbabwe", col: 41, row: 21 },
  { name: "South Africa", col: 40, row: 24 },
  { name: "India", col: 51, row: 13 },
  { name: "Mexico", col: 13, row: 13 },
  { name: "Sweden", col: 36, row: 4 },
  { name: "China", col: 57, row: 10 },
];

export default function StatsBar() {
  const { t } = useTranslation();

  // Parse grid into dot positions
  const dots: { x: number; y: number }[] = [];
  mapGrid.forEach((row, ry) => {
    for (let cx = 0; cx < row.length; cx++) {
      if (row[cx] === "#") {
        dots.push({ x: (cx / 70) * 100, y: (ry / 28) * 100 });
      }
    }
  });

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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-muted mb-4">
            Global Reach
          </p>
          <div className="relative mx-auto max-w-2xl">
            <svg viewBox="0 0 100 40" className="w-full h-auto">
              {/* Land mass dots */}
              {dots.map((d, i) => (
                <circle
                  key={i}
                  cx={d.x}
                  cy={d.y}
                  r="0.55"
                  className="fill-muted/30"
                />
              ))}
              {/* Country markers */}
              {countryMarkers.map((m) => {
                const cx = (m.col / 70) * 100;
                const cy = (m.row / 28) * 100;
                return (
                  <g key={m.name}>
                    <circle cx={cx} cy={cy} r="1.6" className="fill-[#E8385D]/20" />
                    <circle cx={cx} cy={cy} r="0.8" className="fill-[#E8385D]" />
                    <text
                      x={cx}
                      y={cy - 2.5}
                      textAnchor="middle"
                      className="fill-muted text-[2px] sm:text-[2.2px]"
                      fontWeight="600"
                    >
                      {m.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
