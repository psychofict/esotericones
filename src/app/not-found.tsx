"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#2E86DE]/10 animate-float" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-[#F39C12]/10 animate-float-slow" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-[#2E86DE]/5 animate-float-slower" />

      <motion.div
        className="text-center px-6 max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="text-[#2E86DE] text-lg font-medium mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Lost at sea?
        </motion.p>

        <motion.h1
          className="text-8xl md:text-9xl font-bold text-[#1A1A2E] mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          404
        </motion.h1>

        <motion.p
          className="text-[#1A1A2E]/60 text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          This page drifted away like a wave. Let&apos;s get you back to shore.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-[#2E86DE] text-white rounded-full font-medium hover:bg-[#1B5E8A] transition-colors"
          >
            Back to Shore
          </Link>
        </motion.div>

        {/* Wave decoration */}
        <motion.div
          className="mt-16 text-[#2E86DE]/20 text-6xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          ∿∿∿∿∿∿∿
        </motion.div>
      </motion.div>
    </div>
  );
}
