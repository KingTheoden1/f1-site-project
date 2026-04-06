"use client";

import type { LiveSessionData, OpenF1RaceControl, OpenF1Pit, DriverRow } from "@/lib/openf1-data";

// ─── Utilities ───────────────────────────────────────────────────────────────

function formatLapTime(seconds: number | null): string {
  if (!seconds) return "—";
  const mins = Math.floor(seconds / 60);
  const remainder = (seconds % 60).toFixed(3).padStart(6, "0");
  return mins > 0 ? `${mins}:${remainder}` : `${remainder}s`;
}

function formatPitDuration(seconds: number | null): string {
  if (!seconds) return "—";
  return `${seconds.toFixed(1)}s`;
}

function formatTime(isoDate: string): string {
  return new Date(isoDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

// ─── Tire compound badge ──────────────────────────────────────────────────────

const COMPOUND_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  SOFT:         { label: "S", color: "#ff3333", bg: "rgba(255,51,51,0.15)" },
  MEDIUM:       { label: "M", color: "#ffd700", bg: "rgba(255,215,0,0.15)" },
  HARD:         { label: "H", color: "#e5e5e5", bg: "rgba(229,229,229,0.10)" },
  INTERMEDIATE: { label: "I", color: "#39b54a", bg: "rgba(57,181,74,0.15)" },
  WET:          { label: "W", color: "#4fa3e0", bg: "rgba(79,163,224,0.15)" },
};

function TyreBadge({ compound, age }: { compound: string; age: number }) {
  const cfg = COMPOUND_CONFIG[compound] ?? { label: "?", color: "#71717a", bg: "rgba(113,113,122,0.15)" };
  return (
    <span className="inline-flex items-center gap-1">
      <span
        className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold"
        style={{ color: cfg.color, backgroundColor: cfg.bg, border: `1px solid ${cfg.color}40` }}
      >
        {cfg.label}
      </span>
      <span className="text-zinc-500 text-xs tabular-nums">{age}L</span>
    </span>
  );
}

// ─── Flag / session status banner ────────────────────────────────────────────

function getSessionFlag(raceControl: OpenF1RaceControl[]): {
  label: string;
  color: string;
  bg: string;
} {
  // Walk messages newest-first and find the most recent meaningful flag/status
  for (const msg of raceControl) {
    const m = msg.message.toUpperCase();
    if (m.includes("RED FLAG") || msg.flag === "RED") return { label: "RED FLAG", color: "#ef4444", bg: "rgba(239,68,68,0.15)" };
    if (m.includes("SAFETY CAR DEPLOYED")) return { label: "SAFETY CAR", color: "#f59e0b", bg: "rgba(245,158,11,0.15)" };
    if (m.includes("VIRTUAL SAFETY CAR DEPLOYED")) return { label: "VSC", color: "#f59e0b", bg: "rgba(245,158,11,0.10)" };
    if (m.includes("SAFETY CAR IN THIS LAP") || m.includes("SAFETY CAR RETURNING")) return { label: "SC ENDING", color: "#f59e0b", bg: "rgba(245,158,11,0.08)" };
    if (m.includes("GREEN LIGHT") || m.includes("GREEN FLAG") || msg.flag === "GREEN") return { label: "GREEN", color: "#22c55e", bg: "rgba(34,197,94,0.12)" };
    if (msg.flag === "CHEQUERED") return { label: "CHEQUERED FLAG", color: "#e5e5e5", bg: "rgba(229,229,229,0.10)" };
  }
  return { label: "GREEN", color: "#22c55e", bg: "rgba(34,197,94,0.12)" };
}

// ─── Driver position table ────────────────────────────────────────────────────

function PositionTable({ rows }: { rows: DriverRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/60">
            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider w-10">Pos</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">Driver</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider hidden sm:table-cell">Team</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-zinc-600 uppercase tracking-wider">Tyre</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-zinc-600 uppercase tracking-wider hidden md:table-cell">Pits</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-600 uppercase tracking-wider">Last Lap</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.driverNumber}
              className={`border-b border-zinc-800/40 transition-colors ${
                i === 0 ? "bg-zinc-900/30" : "hover:bg-zinc-800/20"
              }`}
            >
              {/* Position */}
              <td className="px-4 py-3">
                <span
                  className={`font-bold tabular-nums ${
                    row.position === 1
                      ? "text-yellow-400"
                      : row.position <= 3
                      ? "text-zinc-300"
                      : "text-zinc-500"
                  }`}
                >
                  {row.position < 99 ? row.position : "—"}
                </span>
              </td>

              {/* Driver */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-1 h-6 rounded-full flex-shrink-0"
                    style={{ backgroundColor: row.teamColor }}
                  />
                  <div>
                    <span className="font-semibold text-white text-xs sm:hidden">
                      {row.acronym}
                    </span>
                    <span className="font-semibold text-white hidden sm:block">
                      {row.name}
                    </span>
                  </div>
                </div>
              </td>

              {/* Team */}
              <td className="px-4 py-3 hidden sm:table-cell">
                <span className="text-zinc-400 text-xs">{row.team}</span>
              </td>

              {/* Tyre */}
              <td className="px-4 py-3 text-center">
                <TyreBadge compound={row.compound} age={row.tyreAge} />
              </td>

              {/* Pits */}
              <td className="px-4 py-3 text-center hidden md:table-cell">
                <span className="text-zinc-400 tabular-nums">{row.pitCount}</span>
              </td>

              {/* Last lap */}
              <td className="px-4 py-3 text-right">
                <span className="font-mono text-xs text-zinc-300 tabular-nums">
                  {formatLapTime(row.lastLapTime)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Race control log ─────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  SafetyCar:      "text-amber-400",
  Flag:           "text-zinc-300",
  Drs:            "text-green-400",
  Other:          "text-zinc-400",
  ChequeredFlag:  "text-zinc-200",
};

function RaceControlLog({ messages }: { messages: OpenF1RaceControl[] }) {
  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/60">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Race Control
        </h3>
      </div>
      <div className="divide-y divide-zinc-800/40 max-h-72 overflow-y-auto">
        {messages.length === 0 && (
          <p className="px-4 py-6 text-xs text-zinc-600 text-center">
            No messages yet
          </p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className="px-4 py-2.5 flex gap-3 items-start">
            <span className="text-zinc-700 text-xs tabular-nums mt-0.5 flex-shrink-0">
              {formatTime(msg.date)}
            </span>
            {msg.lap_number && (
              <span className="text-zinc-600 text-xs flex-shrink-0 mt-0.5">
                L{msg.lap_number}
              </span>
            )}
            <p className={`text-xs leading-relaxed ${CATEGORY_COLORS[msg.category] ?? "text-zinc-400"}`}>
              {msg.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Pit stop log ─────────────────────────────────────────────────────────────

function PitLog({ pits }: { pits: OpenF1Pit[] }) {
  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/60">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Pit Stops
        </h3>
      </div>
      <div className="divide-y divide-zinc-800/40 max-h-72 overflow-y-auto">
        {pits.length === 0 && (
          <p className="px-4 py-6 text-xs text-zinc-600 text-center">
            No pit stops yet
          </p>
        )}
        {pits.map((pit, i) => (
          <div key={i} className="px-4 py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-zinc-700 text-xs tabular-nums flex-shrink-0">
                L{pit.lap_number}
              </span>
              <span className="text-zinc-400 text-xs font-mono">
                #{pit.driver_number}
              </span>
            </div>
            <span className="text-zinc-300 text-xs font-mono tabular-nums">
              {formatPitDuration(pit.pit_duration)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface LiveSessionTrackerProps {
  data: LiveSessionData;
}

export default function LiveSessionTracker({ data }: LiveSessionTrackerProps) {
  const { session, driverRows, currentLap, raceControl, pits } = data;

  const flag = getSessionFlag(raceControl);

  // Total laps is only meaningful for Race sessions
  const isRace = session.session_type === "Race";

  return (
    <div className="space-y-6">
      {/* Session status bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
          style={{ color: flag.color, backgroundColor: flag.bg, border: `1px solid ${flag.color}30` }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: flag.color }} />
          {flag.label}
        </div>

        {isRace && currentLap > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm font-semibold text-white">
            LAP {currentLap}
          </div>
        )}

        {!isRace && (
          <div className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm font-semibold text-white">
            {session.session_name}
          </div>
        )}

        <span className="text-zinc-600 text-xs ml-auto hidden sm:block">
          {session.circuit_short_name} · {session.country_name}
        </span>
      </div>

      {/* Position table */}
      <PositionTable rows={driverRows} />

      {/* Race control + pit log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RaceControlLog messages={raceControl} />
        <PitLog pits={pits} />
      </div>
    </div>
  );
}
