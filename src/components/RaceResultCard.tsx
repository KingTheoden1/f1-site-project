"use client";

import { motion } from "framer-motion";
import { TEAM_COLORS, type RaceResult } from "@/lib/f1-data";

interface RaceResultCardProps {
  raceName: string;
  results: RaceResult[];
}

function PodiumCard({
  result,
  index,
}: {
  result: RaceResult;
  index: number;
}) {
  const teamColor = TEAM_COLORS[result.team] || "#666";
  const heights = ["h-32", "h-24", "h-20"];
  const medals = ["text-yellow-400", "text-zinc-400", "text-amber-600"];
  const order = [1, 0, 2]; // Display order: 2nd, 1st, 3rd

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: order[index] * 0.15 + 0.2 }}
      className="flex flex-col items-center"
      style={{ order: order[index] }}
    >
      <div className="text-center mb-2">
        <span className={`text-2xl font-bold ${medals[index]}`}>
          P{result.position}
        </span>
        <p className="text-sm font-semibold text-white mt-1">{result.code}</p>
        <p className="text-xs text-zinc-500">{result.team}</p>
      </div>
      <div
        className={`w-24 sm:w-28 ${heights[index]} rounded-t-lg flex items-end justify-center pb-2`}
        style={{
          background: `linear-gradient(to top, ${teamColor}33, ${teamColor}11)`,
          borderTop: `3px solid ${teamColor}`,
        }}
      >
        <span className="text-xs text-zinc-400 font-medium">
          {result.points} pts
        </span>
      </div>
    </motion.div>
  );
}

export default function RaceResultCard({
  raceName,
  results,
}: RaceResultCardProps) {
  const podium = results.slice(0, 3);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h3 className="text-lg font-bold text-white mb-1">Latest Result</h3>
      <p className="text-sm text-zinc-500 mb-6">{raceName}</p>

      {/* Podium visualization */}
      <div className="flex items-end justify-center gap-2 mb-6">
        {podium.map((result, i) => (
          <PodiumCard key={result.code} result={result} index={i} />
        ))}
      </div>

      {/* Rest of top 10 */}
      <div className="space-y-1">
        {results.slice(3, 10).map((result) => (
          <div
            key={result.position}
            className="flex items-center justify-between py-1.5 px-3 rounded hover:bg-zinc-800/30"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-600 w-6">
                P{result.position}
              </span>
              <div
                className="w-0.5 h-4 rounded-full"
                style={{
                  backgroundColor: TEAM_COLORS[result.team] || "#666",
                }}
              />
              <span className="text-sm text-zinc-300">{result.driver}</span>
            </div>
            <div className="flex items-center gap-3">
              {result.fastestLap && (
                <span className="text-[10px] text-purple-400 font-medium uppercase">
                  FL
                </span>
              )}
              <span className="text-xs text-zinc-500">{result.time}</span>
              <span className="text-xs text-zinc-400 font-medium w-10 text-right">
                {result.points > 0 ? `${result.points} pts` : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
