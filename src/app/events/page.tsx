"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { getUpcomingEvents, getPastEvents } from "@/data/events";
import { Calendar, MapPin, Users, ExternalLink } from "lucide-react";

const upcoming = getUpcomingEvents();
const past = getPastEvents();

export default function EventsPage() {
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
            Live
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Events
          </motion.h1>
          <motion.p
            className="text-lg text-[#A0A0A0] max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Label showcases, festival appearances, and live performances from ESOTERIC artists.
          </motion.p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-24">
        {/* Upcoming Events */}
        {upcoming.length > 0 && (
          <motion.section
            className="mb-16"
            variants={stagger()}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white mb-8">
              Upcoming
            </motion.h2>
            <div className="space-y-4">
              {upcoming.map((event) => (
                <motion.div
                  key={event.slug}
                  variants={fadeUp}
                  className="glass-card rounded-2xl p-6 md:p-8 border border-[#E8385D]/10 card-hover"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-[#E8385D] uppercase tracking-wider font-semibold">
                        Upcoming
                      </span>
                      <h3 className="text-xl font-bold text-white mt-2">{event.title}</h3>
                      {event.description && (
                        <p className="text-sm text-[#A0A0A0] mt-2">{event.description}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        <span className="flex items-center gap-1 text-sm text-[#A0A0A0]">
                          <Calendar size={14} />
                          {new Date(event.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-[#A0A0A0]">
                          <MapPin size={14} />
                          {event.venue}, {event.city}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-[#A0A0A0]">
                          <Users size={14} />
                          {event.artists.join(", ")}
                        </span>
                      </div>
                    </div>
                    {event.ticketUrl && (
                      <a
                        href={event.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8385D] text-white rounded-full text-sm font-semibold hover:bg-[#FF4D73] transition-colors whitespace-nowrap"
                      >
                        <ExternalLink size={14} /> Get Tickets
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Past Events */}
        {past.length > 0 && (
          <motion.section
            variants={stagger()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white mb-8">
              Past Events
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {past.map((event) => (
                <motion.div
                  key={event.slug}
                  variants={fadeUp}
                  className="glass-card rounded-xl p-6"
                >
                  <h3 className="text-lg font-bold text-white">{event.title}</h3>
                  {event.description && (
                    <p className="text-sm text-[#A0A0A0] mt-1">{event.description}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 mt-3">
                    <span className="flex items-center gap-1 text-sm text-[#666666]">
                      <Calendar size={12} />
                      {new Date(event.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-[#666666]">
                      <MapPin size={12} />
                      {event.city}, {event.country}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {upcoming.length === 0 && past.length === 0 && (
          <p className="text-center text-[#666666] py-16">No events yet. Check back soon.</p>
        )}
      </div>
    </main>
  );
}
