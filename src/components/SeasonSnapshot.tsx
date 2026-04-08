import type { DriverStanding, RaceResult } from "@/lib/f1-data";
import { TEAM_COLORS } from "@/lib/f1-data";

interface SeasonSnapshotProps {
  leader: DriverStanding | null;
  lastRace: { raceName: string; results: RaceResult[] } | null;
  completedRaces: number;
  totalRaces: number;
}

function SnapshotCard({
  label,
  children,
  accent,
}: {
  label: string;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="relative flex-1 min-w-0 rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-4 overflow-hidden">
      {accent && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ backgroundColor: accent }}
        />
      )}
      <p className="text-xs text-zinc-600 uppercase tracking-widest mb-2">
        {label}
      </p>
      {children}
    </div>
  );
}

export default function SeasonSnapshot({
  leader,
  lastRace,
  completedRaces,
  totalRaces,
}: SeasonSnapshotProps) {
  const winner = lastRace?.results[0];
  const remainingRaces = totalRaces - completedRaces;
  const progressPct = totalRaces > 0 ? (completedRaces / totalRaces) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Championship Leader */}
        {leader && (
          <SnapshotCard
            label="Championship Leader"
            accent={TEAM_COLORS[leader.team]}
          >
            <p className="text-lg font-bold text-white leading-tight truncate">
              {leader.driver}
            </p>
            <p className="text-sm text-zinc-500 truncate">{leader.team}</p>
            <p className="text-2xl font-black text-white mt-1 tabular-nums">
              {leader.points}
              <span className="text-sm font-normal text-zinc-500 ml-1">pts</span>
            </p>
          </SnapshotCard>
        )}

        {/* Last Race Winner */}
        {winner && lastRace && (
          <SnapshotCard
            label="Last Race Winner"
            accent={TEAM_COLORS[winner.team]}
          >
            <p className="text-lg font-bold text-white leading-tight truncate">
              {winner.driver}
            </p>
            <p className="text-sm text-zinc-500 truncate">{lastRace.raceName}</p>
            <p className="text-sm text-zinc-600 mt-1 truncate">{winner.team}</p>
          </SnapshotCard>
        )}

        {/* Season Progress */}
        <SnapshotCard label="Season Progress">
          <p className="text-lg font-bold text-white leading-tight">
            Round {completedRaces}
            <span className="text-zinc-600 font-normal"> of {totalRaces}</span>
          </p>
          <p className="text-sm text-zinc-500 mt-0.5">
            {remainingRaces === 0
              ? "Season complete"
              : `${remainingRaces} race${remainingRaces !== 1 ? "s" : ""} remaining`}
          </p>
          <div className="mt-3 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-600 rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </SnapshotCard>
      </div>
    </div>
  );
}
