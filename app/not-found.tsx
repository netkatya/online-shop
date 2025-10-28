"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HouseHeart } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-200 text-gray-800 overflow-hidden">
      {/* 🔴 Decorative red glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25, scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
        className="absolute -top-32 -left-32 w-[450px] h-[450px] rounded-full bg-red-400 blur-[140px]"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15, scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-red-300 blur-[180px]"
      />

      {/* 404 Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-[140px] md:text-[180px] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-gray-400 drop-shadow-md z-10"
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-gray-600 text-lg md:text-xl mb-10 z-10 px-6 text-center max-w-xl"
      >
        Oops! The page you’re looking for doesn’t exist. It might have been
        moved or removed.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="z-10"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold
                     bg-red-500 text-white border border-red-500 shadow-md
                     hover:bg-red-600 hover:shadow-lg active:scale-95
                     transition-all duration-300"
        >
          <HouseHeart className="w-6 h-6" />
          Back to Home
        </Link>
      </motion.div>

      {/* Soft grid background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_center,theme(colors.gray.300)_1px,transparent_1px)] [background-size:22px_22px]" />
    </main>
  );
}
