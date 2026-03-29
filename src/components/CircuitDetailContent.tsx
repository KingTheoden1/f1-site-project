"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CircuitWithDetails, CircuitWinner } from "@/lib/f1-data";
import { TEAM_COLORS } from "@/lib/f1-data";

interface CircuitDetailContentProps {
  circuit: CircuitWithDetails;
  winners: CircuitWinner[];
}

const INITIAL_WINNERS = 20;

export default function CircuitDetailContent({
  circuit,
  winners,
}: CircuitDetailContentProps) {
  const [showAllWinners, setShowAllWinners] = useState(false);
  const displayedWinners = showAllWinners
    ? winners
    : winners.slice(0, INITIAL_WINNERS);

  const raceDate = circuit.raceDate ? new Date(circuit.raceDate) : null;
  const formattedDate = raceDate
    ? raceDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div>
      {/* Hero header */}
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-red-600/8 rounded-full blur-[100px]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/circuits"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Track Atlas
            </Link>
          </motion.div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-2">
                {circuit.round && (
                  <span className="text-[10px] font-bold text-red-400 bg-red-600/10 px-2 py-0.5 rounded border border-red-600/20">
                    Round {circuit.round}
                  </span>
                )}
                <span
                  className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded ${
                    circuit.trackType === "street"
                      ? "text-amber-400 bg-amber-500/10"
                      : "text-emerald-400 bg-emerald-500/10"
                  }`}
                >
                  {circuit.trackType} circuit
                </span>
                {circuit.raceCancelled && (
                  <span className="text-[10px] text-red-400/80 uppercase font-medium bg-red-500/10 px-2 py-0.5 rounded">
                    Cancelled
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {circuit.raceName || circuit.circuitName}
              </h1>
              <p className="text-zinc-400 mt-1">{circuit.circuitName}</p>
              <p className="text-sm text-zinc-500 mt-0.5">
                {circuit.city}, {circuit.country}
              </p>
            </motion.div>

            {formattedDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-right"
              >
                <p className="text-xs text-zinc-600 uppercase tracking-wider">
                  Race Date
                </p>
                <p className="text-lg font-semibold text-zinc-300">
                  {formattedDate}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          <StatCard label="Track Length" value={`${circuit.lengthKm}`} unit="km" />
          <StatCard label="Turns" value={`${circuit.turns}`} />
          <StatCard label="DRS Zones" value={`${circuit.drsZones}`} />
          <StatCard label="Race Laps" value={`${circuit.laps}`} />
          {circuit.lapRecord && (
            <StatCard
              label="Lap Record"
              value={circuit.lapRecord.time}
              subtitle={`${circuit.lapRecord.driver} (${circuit.lapRecord.year})`}
            />
          )}
          {circuit.elevationChangeM && (
            <StatCard
              label="Elevation"
              value={`${circuit.elevationChangeM}`}
              unit="m"
            />
          )}
        </motion.div>

        {/* Track Characteristics */}
        {circuit.description && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-white mb-3">
              Track Characteristics
            </h2>
            <p className="text-zinc-400 leading-relaxed">{circuit.description}</p>
          </motion.section>
        )}

        {/* History */}
        {circuit.history && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <h2 className="text-xl font-bold text-white mb-3">History</h2>
            <p className="text-zinc-400 leading-relaxed">{circuit.history}</p>
          </motion.section>
        )}

        {/* Notable Races */}
        {circuit.notableRaces.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-xl font-bold text-white mb-4">
              Notable Races
            </h2>
            <div className="space-y-3">
              {circuit.notableRaces.map((race, i) => (
                <motion.div
                  key={race.year}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.05 }}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-bold text-red-400 bg-red-600/10 px-2 py-1 rounded border border-red-600/20 shrink-0">
                      {race.year}
                    </span>
                    <div>
                      <h3 className="font-semibold text-white text-sm">
                        {race.title}
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                        {race.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Historical Winners */}
        {winners.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                Race Winners
              </h2>
              <span className="text-xs text-zinc-500">
                {winners.length} race{winners.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800 text-left">
                    <th className="px-4 py-3 text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
                      Year
                    </th>
                    <th className="px-4 py-3 text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
                      Driver
                    </th>
                    <th className="px-4 py-3 text-[10px] uppercase tracking-wider text-zinc-500 font-medium hidden sm:table-cell">
                      Team
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedWinners.map((w, i) => (
                    <motion.tr
                      key={`${w.season}-${w.raceName}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/30 transition-colors"
                    >
                      <td className="px-4 py-2.5 text-sm font-semibold text-zinc-300">
                        {w.season}
                      </td>
                      <td className="px-4 py-2.5 text-sm text-zinc-300">
                        {w.driver}
                      </td>
                      <td className="px-4 py-2.5 text-sm text-zinc-400 hidden sm:table-cell">
                        <span className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{
                              backgroundColor:
                                TEAM_COLORS[w.team] || "#71717a",
                            }}
                          />
                          {w.team}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {winners.length > INITIAL_WINNERS && (
                <div className="px-4 py-3 border-t border-zinc-800">
                  <button
                    onClick={() => setShowAllWinners(!showAllWinners)}
                    className="text-sm text-red-400 hover:text-red-300 transition-colors font-medium"
                  >
                    {showAllWinners
                      ? "Show less"
                      : `Show all ${winners.length} winners`}
                  </button>
                </div>
              )}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  unit,
  subtitle,
}: {
  label: string;
  value: string;
  unit?: string;
  subtitle?: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
      <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">
        {label}
      </p>
      <p className="text-xl font-bold text-white">
        {value}
        {unit && (
          <span className="text-sm text-zinc-500 ml-0.5 font-normal">
            {unit}
          </span>
        )}
      </p>
      {subtitle && (
        <p className="text-[10px] text-zinc-600 mt-0.5">{subtitle}</p>
      )}
    </div>
  );
}
