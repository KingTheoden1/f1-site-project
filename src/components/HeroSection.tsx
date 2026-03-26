"use client";

import { motion } from "framer-motion";
import CountdownTimer from "./CountdownTimer";
import type { Race } from "@/lib/f1-data";

interface HeroSectionProps {
  nextRace: Race | null;
}

export default function HeroSection({ nextRace }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-zinc-950 border-b border-zinc-800">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Red accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-red-600/10 text-red-400 border border-red-600/20 mb-6">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              2025 Season
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4"
          >
            F1{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
              PULSE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-500 text-lg sm:text-xl max-w-xl mx-auto mb-10"
          >
            Live data, race insights, and championship tracking — your F1
            companion.
          </motion.p>

          {/* Next Race Countdown */}
          {nextRace && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="text-center">
                <p className="text-xs text-zinc-600 uppercase tracking-widest mb-1">
                  Next Race — Round {nextRace.round}
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {nextRace.raceName}
                </h2>
                <p className="text-sm text-zinc-500 mt-1">
                  {nextRace.circuitName} — {nextRace.country}
                </p>
              </div>

              <CountdownTimer
                targetDate={nextRace.date}
                targetTime={nextRace.time}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
