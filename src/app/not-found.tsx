"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#E8385D]/5 animate-float" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-[#E8385D]/5 animate-float-slow" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-[#FF4D73]/5 animate-float-slower" />

      <motion.div
        className="text-center px-6 max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="text-[#E8385D] text-lg font-medium mb-4 uppercase tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Page Not Found
        </motion.p>

        <motion.h1
          className="text-8xl md:text-9xl font-bold text-white mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          404
        </motion.h1>

        <motion.p
          className="text-[#A0A0A0] text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          This track doesn&apos;t exist in our catalog. Let&apos;s get you back to the music.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex gap-4 justify-center"
        >
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-[#E8385D] text-white rounded-full font-medium hover:bg-[#FF4D73] transition-colors"
          >
            Back Home
          </Link>
          <Link
            href="/releases"
            className="inline-block px-8 py-3 border border-[#2A2A2A] text-white rounded-full font-medium hover:bg-white/5 transition-colors"
          >
            Browse Releases
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
