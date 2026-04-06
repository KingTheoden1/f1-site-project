"use client";

import { useState, useEffect } from "react";
import type { RaceWeekend, RaceSession } from "@/lib/f1-data";
import type { DayForecast } from "@/lib/weather-data";
import WeatherForecast from "./WeatherForecast";

interface RaceWeekendScheduleProps {
  weekend: RaceWeekend | null;
  forecasts: DayForecast[];
}

function getSessionStatus(session: RaceSession): "past" | "live" | "next" | "upcoming" {
  const now = Date.now();
  const start = new Date(`${session.date}T${session.time}`).getTime();
  const end = start + 2 * 60 * 60 * 1000; // assume ~2h duration

  if (now >= start && now <= end) return "live";
  if (now > end) return "past";
  return "upcoming";
}

function getNextSession(sessions: RaceSession[]): RaceSession | null {
  const now = Date.now();
  return (
    sessions.find((s) => {
      const start = new Date(`${s.date}T${s.time}`).getTime();
      return start > now;
    }) ?? null
  );
}

function formatSessionDate(date: string, time: string): string {
  const d = new Date(`${date}T${time}`);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatSessionTime(date: string, time: string): string {
  const d = new Date(`${date}T${time}`);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function useCountdown(date: string, time: string) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const target = new Date(`${date}T${time}`).getTime();

    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [date, time]);

  return timeLeft;
}

function NextSessionCountdown({ session }: { session: RaceSession }) {
  const timeLeft = useCountdown(session.date, session.time);

  if (!timeLeft) return null;

  const parts = [
    { value: timeLeft.days, label: "D" },
    { value: timeLeft.hours, label: "H" },
    { value: timeLeft.minutes, label: "M" },
    { value: timeLeft.seconds, label: "S" },
  ];

  return (
    <div className="flex items-center gap-1 mt-3">
      {parts.map(({ value, label }) => (
        <div key={label} className="flex items-center gap-0.5">
          <span className="font-mono font-bold text-white text-sm tabular-nums">
            {value.toString().padStart(2, "0")}
          </span>
          <span className="text-zinc-600 text-xs">{label}</span>
          {label !== "S" && <span className="text-zinc-700 text-xs mx-0.5">:</span>}
        </div>
      ))}
    </div>
  );
}

const SESSION_ABBREV: Record<string, string> = {
  "Practice 1": "FP1",
  "Practice 2": "FP2",
  "Practice 3": "FP3",
  "Sprint Qualifying": "SQ",
  Sprint: "SPR",
  Qualifying: "QUALI",
  Race: "RACE",
};

function SessionCard({
  session,
  isNext,
}: {
  session: RaceSession;
  isNext: boolean;
}) {
  const status = getSessionStatus(session);
  const abbrev = SESSION_ABBREV[session.name] ?? session.name;

  const borderClass =
    status === "live"
      ? "border-red-500/60 bg-red-500/5"
      : isNext
      ? "border-zinc-600 bg-zinc-900"
      : status === "past"
      ? "border-zinc-800/50 bg-zinc-900/40"
      : "border-zinc-800 bg-zinc-900";

  const nameClass =
    status === "past" ? "text-zinc-600" : "text-white";

  return (
    <div
      className={`relative rounded-xl border p-4 transition-colors ${borderClass}`}
    >
      {/* Status dot */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-xs font-bold tracking-widest ${
            status === "live"
              ? "text-red-400"
              : isNext
              ? "text-zinc-400"
              : status === "past"
              ? "text-zinc-700"
              : "text-zinc-500"
          }`}
        >
          {abbrev}
        </span>
        {status === "live" && (
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        )}
        {status === "past" && (
          <svg className="w-3.5 h-3.5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {isNext && status !== "live" && (
          <span className="text-xs text-zinc-500 uppercase tracking-wider">Next</span>
        )}
      </div>

      {/* Session name */}
      <p className={`font-semibold text-sm leading-tight ${nameClass}`}>
        {session.name}
      </p>

      {/* Date + time */}
      <p className={`text-xs mt-1 ${status === "past" ? "text-zinc-700" : "text-zinc-500"}`}>
        {formatSessionDate(session.date, session.time)}
      </p>
      <p className={`text-xs ${status === "past" ? "text-zinc-700" : "text-zinc-500"}`}>
        {formatSessionTime(session.date, session.time)}
      </p>

      {/* Countdown for next session */}
      {isNext && status !== "live" && (
        <NextSessionCountdown session={session} />
      )}

      {status === "live" && (
        <p className="text-xs font-semibold text-red-400 mt-2">In Progress</p>
      )}
    </div>
  );
}

export default function RaceWeekendSchedule({
  weekend,
  forecasts,
}: RaceWeekendScheduleProps) {
  if (!weekend) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-zinc-600 text-sm uppercase tracking-widest mb-2">
          Season Complete
        </p>
        <p className="text-zinc-500 text-base max-w-sm">
          There are no more race weekends this season. Check back when the
          next season calendar is released.
        </p>
      </div>
    );
  }

  const nextSession = getNextSession(weekend.sessions);

  return (
    <div>
      {/* Weekend header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <p className="text-xs text-zinc-600 uppercase tracking-widest">
            Round {weekend.round} · Next Race Weekend
          </p>
          {weekend.isSprint && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
              ⚡ Sprint Weekend
            </span>
          )}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {weekend.raceName}
        </h2>
        <p className="text-zinc-500 text-sm">
          {weekend.circuitName} — {weekend.city}, {weekend.country}
        </p>
      </div>

      {/* Session cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {weekend.sessions.map((session) => (
          <SessionCard
            key={session.name}
            session={session}
            isNext={session === nextSession}
          />
        ))}
      </div>

      {/* Weather forecast */}
      <WeatherForecast forecasts={forecasts} />
    </div>
  );
}
