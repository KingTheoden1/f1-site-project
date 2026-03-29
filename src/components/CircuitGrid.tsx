"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { CircuitWithDetails } from "@/lib/f1-data";

type Filter = "all" | "street" | "permanent";

interface CircuitGridProps {
  circuits: CircuitWithDetails[];
}

export default function CircuitGrid({ circuits }: CircuitGridProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "all"
      ? circuits
      : circuits.filter((c) => c.trackType === filter);

  const filters: { label: string; value: Filter }[] = [
    { label: "All Tracks", value: "all" },
    { label: "Street", value: "street" },
    { label: "Permanent", value: "permanent" },
  ];

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden bg-zinc-950 border-b border-zinc-800">
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/10 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-red-600/10 text-red-400 border border-red-600/20 mb-4">
                2026 Season
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-3"
            >
              Track{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                Atlas
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-zinc-500 text-base sm:text-lg max-w-xl mx-auto"
            >
              Every circuit on the 2026 calendar — stats, history, and
              memorable moments.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex gap-2 mb-8 justify-center"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f.value
                  ? "bg-red-600 text-white"
                  : "bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((circuit, i) => (
              <CircuitCard key={circuit.circuitId} circuit={circuit} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function CircuitCard({
  circuit,
  index,
}: {
  circuit: CircuitWithDetails;
  index: number;
}) {
  const raceDate = circuit.raceDate
    ? new Date(circuit.raceDate)
    : null;
  const formattedDate = raceDate
    ? raceDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={`/circuits/${circuit.circuitId}`}
        className={`block rounded-xl border bg-zinc-900/50 p-5 transition-all hover:bg-zinc-800/50 hover:border-zinc-700 group ${
          circuit.raceCancelled
            ? "border-zinc-800 opacity-60"
            : "border-zinc-800"
        }`}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {circuit.round && (
              <span className="text-[10px] font-bold text-red-400 bg-red-600/10 px-2 py-0.5 rounded border border-red-600/20">
                R{circuit.round}
              </span>
            )}
            {formattedDate && (
              <span className="text-xs text-zinc-500">{formattedDate}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {circuit.raceCancelled && (
              <span className="text-[10px] text-red-400/60 uppercase font-medium">
                Cancelled
              </span>
            )}
            <span
              className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded ${
                circuit.trackType === "street"
                  ? "text-amber-400 bg-amber-500/10"
                  : "text-emerald-400 bg-emerald-500/10"
              }`}
            >
              {circuit.trackType}
            </span>
          </div>
        </div>

        {/* Race name */}
        <h3
          className={`text-lg font-bold mb-0.5 group-hover:text-white transition-colors ${
            circuit.raceCancelled
              ? "line-through text-zinc-500"
              : "text-white"
          }`}
        >
          {circuit.raceName || circuit.circuitName}
        </h3>
        <p className="text-sm text-zinc-500 mb-1">{circuit.circuitName}</p>
        <p className="text-xs text-zinc-600 mb-4">
          {circuit.city}, {circuit.country}
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2">
          <StatMini label="Length" value={`${circuit.lengthKm}`} unit="km" />
          <StatMini label="Turns" value={`${circuit.turns}`} />
          <StatMini label="DRS" value={`${circuit.drsZones}`} />
          <StatMini label="Laps" value={`${circuit.laps}`} />
        </div>
      </Link>
    </motion.div>
  );
}

function StatMini({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <div className="bg-zinc-800/50 rounded-lg p-2 text-center">
      <p className="text-sm font-semibold text-zinc-300">
        {value}
        {unit && <span className="text-[10px] text-zinc-500 ml-0.5">{unit}</span>}
      </p>
      <p className="text-[10px] text-zinc-600 uppercase">{label}</p>
    </div>
  );
}
