"use client";

import { motion } from "framer-motion";
import { TEAM_COLORS, type DriverStanding, type ConstructorStanding } from "@/lib/f1-data";

interface DriverStandingsProps {
  type: "drivers";
  standings: DriverStanding[];
}

interface ConstructorStandingsProps {
  type: "constructors";
  standings: ConstructorStanding[];
}

type StandingsTableProps = DriverStandingsProps | ConstructorStandingsProps;

export default function StandingsTable(props: StandingsTableProps) {
  const { type, standings } = props;

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-800 text-xs text-zinc-500 uppercase tracking-wider">
            <th className="px-4 py-3 text-left">Pos</th>
            <th className="px-4 py-3 text-left">
              {type === "drivers" ? "Driver" : "Team"}
            </th>
            {type === "drivers" && (
              <th className="px-4 py-3 text-left hidden sm:table-cell">Team</th>
            )}
            <th className="px-4 py-3 text-right">Wins</th>
            <th className="px-4 py-3 text-right">Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.slice(0, 10).map((entry, i) => {
            const teamName = type === "drivers" ? entry.team : entry.team;
            const teamColor = TEAM_COLORS[teamName] || "#666";

            return (
              <motion.tr
                key={entry.position}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1 h-6 rounded-full"
                      style={{ backgroundColor: teamColor }}
                    />
                    <span className="text-sm font-medium text-zinc-300">
                      {entry.position}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold text-white">
                    {type === "drivers"
                      ? (entry as DriverStanding).driver
                      : entry.team}
                  </span>
                </td>
                {type === "drivers" && (
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs text-zinc-500">
                      {(entry as DriverStanding).team}
                    </span>
                  </td>
                )}
                <td className="px-4 py-3 text-right">
                  <span className="text-sm text-zinc-400">{entry.wins}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm font-bold text-white">
                    {entry.points}
                  </span>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
