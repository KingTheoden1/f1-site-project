"use client";

import { motion } from "framer-motion";
import CountdownTimer from "./CountdownTimer";
import type { Race } from "@/lib/f1-data";

interface HeroSectionProps {
  nextRace: Race | null;
}

export default function HeroSection({ nextRace }: HeroSectionProps) {
  return (
    <section className="relative overflow-x-hidden bg-zinc-950 border-b border-zinc-800">
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
              2026 Season
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold italic text-white tracking-tight leading-tight mb-4 overflow-visible font-[family-name:var(--font-orbitron)]"
          >
            F1{" "}
            <span className="text-red-500">
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
                  {nextRace.circuitName} — {nextRace.city}, {nextRace.country}
                </p>
              </div>

              <CountdownTimer
                targetDate={nextRace.date}
                targetTime={nextRace.time}
              />

              <a
                href="https://tv.apple.com/us/channel/formula-1/tvs.sbd.241000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    clipRule="evenodd"
                  />
                </svg>
                Watch Live
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
