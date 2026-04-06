import type { ChampionshipMathData } from "@/lib/f1-data";
import { TEAM_COLORS } from "@/lib/f1-data";

interface Props {
  data: ChampionshipMathData;
}

export default function ChampionshipMath({ data }: Props) {
  const { remainingRaces, maxPointsAvailable, completedRaces, contenders } = data;

  const leaderPoints = contenders[0]?.currentPoints ?? 0;
  const contendersIn = contenders.filter((c) => c.canWin);
  const isDecided = contendersIn.length <= 1 && completedRaces > 0;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
      <div className="px-5 py-4 border-b border-zinc-800">
        <h3 className="text-sm font-semibold text-white">Championship Math</h3>
        <p className="text-xs text-zinc-500 mt-0.5">
          {remainingRaces} races left · {maxPointsAvailable} pts still available
          <span className="text-zinc-600"> (max 26/race)</span>
        </p>
      </div>

      {isDecided ? (
        <div className="px-5 py-8 text-center">
          <p className="text-zinc-400 text-sm">
            🏆 {contendersIn[0]?.driver ?? "Champion"} has clinched the title.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-zinc-800/50">
          {contenders.map((c) => {
            const color = TEAM_COLORS[c.team] ?? "#71717a";
            const pct = leaderPoints > 0 ? (c.currentPoints / (leaderPoints + maxPointsAvailable)) * 100 : 0;

            return (
              <div key={c.code} className={`px-5 py-3 ${!c.canWin ? "opacity-40" : ""}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="text-xs font-bold tabular-nums w-5 text-right"
                      style={{ color }}
                    >
                      {c.position}
                    </span>
                    <span className="text-sm text-white font-medium">{c.driver}</span>
                    {!c.canWin && (
                      <span className="text-[10px] text-zinc-600 uppercase tracking-wider">
                        Eliminated
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-mono font-semibold text-white">
                      {c.currentPoints}
                    </span>
                    <span className="text-xs text-zinc-600 ml-1">pts</span>
                    {c.deficit > 0 && c.canWin && (
                      <span className="text-xs text-zinc-500 ml-2">-{c.deficit}</span>
                    )}
                  </div>
                </div>

                {/* Progress bar: current vs max possible */}
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(pct, 100)}%`,
                      backgroundColor: color,
                      opacity: c.canWin ? 0.8 : 0.3,
                    }}
                  />
                </div>

                {c.canWin && c.deficit > 0 && (
                  <p className="text-[11px] text-zinc-600 mt-1">
                    Max possible: {c.maxPossiblePoints} pts
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
