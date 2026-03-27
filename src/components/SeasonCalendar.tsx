"use client";

import { motion } from "framer-motion";
import type { SeasonRace } from "@/lib/f1-data";

interface SeasonCalendarProps {
  races: SeasonRace[];
}

export default function SeasonCalendar({ races }: SeasonCalendarProps) {
  const completedCount = races.filter((r) => r.status === "completed").length;
  const cancelledCount = races.filter((r) => r.status === "cancelled").length;
  const totalActive = races.length - cancelledCount;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-bold text-white">Season Calendar</h3>
        <span className="text-xs text-zinc-500">
          {completedCount}/{totalActive} completed
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-zinc-800 rounded-full mb-5 overflow-hidden">
        <motion.div
          className="h-full bg-red-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(completedCount / totalActive) * 100}%` }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>

      {/* Race list */}
      <div className="space-y-1 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
        {races.map((race, i) => {
          const date = new Date(race.date);
          const month = date.toLocaleDateString("en-US", { month: "short" });
          const day = date.getDate();
          const isCancelled = race.status === "cancelled";
          const isCompleted = race.status === "completed";
          const isNext =
            !isCancelled &&
            !isCompleted &&
            races.findIndex(
              (r) => r.status === "upcoming"
            ) === i;

          return (
            <motion.div
              key={race.round}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-colors ${
                isNext
                  ? "bg-red-500/10 border border-red-500/30"
                  : "hover:bg-zinc-800/30"
              } ${isCancelled ? "opacity-40" : ""}`}
            >
              {/* Round number */}
              <span className="text-[10px] text-zinc-600 w-5 shrink-0">
                R{race.round}
              </span>

              {/* Status indicator */}
              <div
                className={`w-2 h-2 rounded-full shrink-0 ${
                  isCancelled
                    ? "bg-zinc-600"
                    : isCompleted
                      ? "bg-green-500"
                      : isNext
                        ? "bg-red-500 animate-pulse"
                        : "bg-zinc-700"
                }`}
              />

              {/* Race info */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    isCancelled
                      ? "line-through text-zinc-600"
                      : isCompleted
                        ? "text-zinc-400"
                        : "text-white"
                  }`}
                >
                  {race.raceName}
                </p>
                <p className="text-[11px] text-zinc-600 truncate">
                  {race.country}
                </p>
              </div>

              {/* Date or status */}
              <div className="text-right shrink-0">
                {isCancelled ? (
                  <span className="text-[10px] text-red-400/60 uppercase font-medium">
                    Cancelled
                  </span>
                ) : (
                  <>
                    <p className="text-xs text-zinc-400">{month}</p>
                    <p className="text-sm font-semibold text-zinc-300">{day}</p>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
