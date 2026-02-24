"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function MerchPage() {
  return (
    <main className="min-h-screen bg-white text-[#1A1A2E] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-16 left-[10%] w-36 h-36 rounded-full bg-[#F39C12]/8 blur-2xl" />
      <div className="absolute bottom-20 right-[12%] w-44 h-44 rounded-full bg-[#2E86DE]/8 blur-2xl" />

      <motion.div
        className="text-center px-6 max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-[#EAF4FC] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ShoppingBag className="w-10 h-10 text-[#2E86DE]" />
        </motion.div>

        <motion.p
          className="text-[#F39C12] uppercase tracking-[0.3em] text-sm font-medium mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Coming Soon
        </motion.p>

        <motion.h1
          className="text-5xl md:text-6xl font-bold tracking-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Merch Store
        </motion.h1>

        <motion.p
          className="text-[#1A1A2E]/60 text-lg mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Official Ebstar and The ES&Oslash;T&Euml;RIC Ones merchandise is on the way.
          Stay tuned for exclusive drops.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-[#2E86DE] text-white rounded-full font-medium hover:bg-[#1B5E8A] transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
