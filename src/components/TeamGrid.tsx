"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { TEAM_COLORS, type TeamWithDetails } from "@/lib/f1-data";

interface TeamGridProps {
  teams: TeamWithDetails[];
}

export default function TeamGrid({ teams }: TeamGridProps) {
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  const maxPoints = teams.length > 0 ? teams[0].points : 1;

  return (
    <div>
      {/* Page header */}
      <div className="mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-bold text-white mb-3"
        >
          Teams
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 text-lg"
        >
          The {teams.length} constructors competing in the {new Date().getFullYear()} FIA Formula One World Championship
        </motion.p>
      </div>

      {/* Team cards */}
      <div className="space-y-4">
        {teams.map((team, i) => {
          const color = TEAM_COLORS[team.name] || "#666";
          const isExpanded = expandedTeam === team.constructorId;
          const barWidth =
            maxPoints > 0 ? (team.points / maxPoints) * 100 : 0;

          return (
            <motion.div
              key={team.constructorId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden cursor-pointer hover:border-zinc-700 transition-colors"
              onClick={() =>
                setExpandedTeam(isExpanded ? null : team.constructorId)
              }
            >
              {/* Top color accent */}
              <div
                className="h-1"
                style={{ backgroundColor: color }}
              />

              {/* Main card content */}
              <div className="p-5 sm:p-6">
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <span
                      className="text-3xl font-bold"
                      style={{ color }}
                    >
                      {team.position}
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {team.name}
                      </h2>
                      <p className="text-sm text-zinc-500">
                        {team.fullName}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white">
                      {team.points}
                    </span>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">
                      Points
                    </p>
                  </div>
                </div>

                {/* Points bar */}
                <div className="w-full h-2 bg-zinc-800 rounded-full mb-5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{ delay: i * 0.05 + 0.3, duration: 0.6 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>

                {/* Drivers row */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {team.drivers.map((driver) => (
                    <div
                      key={driver.code}
                      className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/40"
                    >
                      <span
                        className="text-lg font-bold font-mono"
                        style={{ color }}
                      >
                        #{driver.number}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">
                          {driver.name}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {driver.points} pts
                          {driver.wins > 0 && (
                            <span className="text-yellow-400 ml-1">
                              • {driver.wins} {driver.wins === 1 ? "win" : "wins"}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-2 rounded-lg bg-zinc-800/30">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">
                      Wins
                    </p>
                    <p className="text-lg font-bold text-white">
                      {team.wins}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-800/30">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">
                      Titles
                    </p>
                    <p className="text-lg font-bold text-white">
                      {team.worldChampionships}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-800/30">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">
                      Power Unit
                    </p>
                    <p className="text-lg font-bold text-white">
                      {team.powerUnit}
                    </p>
                  </div>
                  <div className="hidden sm:block p-2 rounded-lg bg-zinc-800/30">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">
                      Since
                    </p>
                    <p className="text-lg font-bold text-white">
                      {team.firstEntry}
                    </p>
                  </div>
                </div>

                {/* Expand indicator */}
                <div className="flex justify-center mt-4">
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="text-zinc-600 text-sm"
                  >
                    ▼
                  </motion.span>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-zinc-800 px-5 sm:px-6 py-5"
                >
                  {/* Team info grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                        Team Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Team Principal</span>
                          <span className="text-white font-medium">
                            {team.teamPrincipal}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Base</span>
                          <span className="text-white font-medium text-right max-w-[200px]">
                            {team.base}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Nationality</span>
                          <span className="text-white font-medium">
                            {team.nationality}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">First Entry</span>
                          <span className="text-white font-medium">
                            {team.firstEntry > 0 ? team.firstEntry : "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Championships</span>
                          <span className="text-white font-medium">
                            {team.worldChampionships}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Driver details */}
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                        Driver Lineup
                      </h3>
                      <div className="space-y-3">
                        {team.drivers.map((driver) => (
                          <div
                            key={driver.code}
                            className="p-3 rounded-lg bg-zinc-800/40 border-l-2"
                            style={{ borderColor: color }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-white font-semibold">
                                  {driver.name}
                                </p>
                                <p className="text-xs text-zinc-500">
                                  #{driver.number} • {driver.nationality}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-white font-bold">
                                  P{driver.position}
                                </p>
                                <p className="text-xs text-zinc-500">
                                  {driver.points} pts
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* About section */}
                  {team.description && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                        About
                      </h3>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {team.description}
                      </p>
                    </div>
                  )}

                  {/* History section */}
                  {team.history && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                        History
                      </h3>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {team.history}
                      </p>
                    </div>
                  )}

                  {/* Official team site link */}
                  <a
                    href={team.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium hover:underline mt-2"
                    style={{ color }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Visit official site →
                  </a>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
