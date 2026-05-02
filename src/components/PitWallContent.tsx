"use client";

import { useState, useEffect, useCallback } from "react";
import type { RaceWeekend, DriverProgression, ChampionshipMathData } from "@/lib/f1-data";
import type { DayForecast } from "@/lib/weather-data";
import {
  getLatestSession,
  getLiveSessionData,
  isSessionLive,
  type LiveSessionData,
  type OpenF1Session,
} from "@/lib/openf1-data";
import RaceWeekendSchedule from "./RaceWeekendSchedule";
import LiveSessionTracker from "./LiveSessionTracker";
import PointsProgressionChart from "./PointsProgressionChart";
import ChampionshipMath from "./ChampionshipMath";

interface PitWallContentProps {
  weekend: RaceWeekend | null;
  progressions: DriverProgression[];
  championshipMath: ChampionshipMathData | null;
  forecasts: DayForecast[];
}

export default function PitWallContent({
  weekend,
  progressions,
  championshipMath,
  forecasts,
}: PitWallContentProps) {
  const [liveSession, setLiveSession] = useState<OpenF1Session | null>(null);
  const [liveData, setLiveData] = useState<LiveSessionData | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  const fetchLiveData = useCallback(async (sessionKey: number) => {
    const data = await getLiveSessionData(sessionKey);
    setLiveData(data);
  }, []);

  const checkSession = useCallback(async () => {
    const session = await getLatestSession();
    if (session && isSessionLive(session)) {
      setLiveSession(session);
      await fetchLiveData(session.session_key);
    } else {
      setLiveSession(null);
      setLiveData(null);
    }
    setSessionChecked(true);
  }, [fetchLiveData]);

  // Initial check + poll every 30s to detect session start/end
  useEffect(() => {
    checkSession();
    const interval = setInterval(checkSession, 30_000);
    return () => clearInterval(interval);
  }, [checkSession]);

  // While live, poll for updated race data every 10s
  useEffect(() => {
    if (!liveSession) return;
    const interval = setInterval(
      () => fetchLiveData(liveSession.session_key),
      10_000
    );
    return () => clearInterval(interval);
  }, [liveSession, fetchLiveData]);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Page header */}
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-600 uppercase tracking-widest mb-0.5">
              F1 Pulse
            </p>
            <h1 className="text-xl font-bold text-white font-[family-name:var(--font-orbitron)] italic">
              Pit Wall
            </h1>
          </div>

          {/* Live indicator + calendar */}
          <div className="flex items-center gap-3">
            <a
              href="/api/calendar"
              download="f1-2026-season.ics"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              title="Download full season calendar"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Add to Calendar
            </a>
          <div className="flex items-center gap-2">
            {liveSession ? (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-600/15 text-red-400 border border-red-600/30">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                LIVE — {liveSession.session_name.toUpperCase()}
              </span>
            ) : sessionChecked ? (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-500 border border-zinc-700">
                <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                No Active Session
              </span>
            ) : null}
          </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* 1. Race weekend schedule + weather */}
        <RaceWeekendSchedule weekend={weekend} forecasts={forecasts} />

        {/* 2. Live tracker — active during sessions, placeholder otherwise */}
        {liveData ? (
          <LiveSessionTracker data={liveData} />
        ) : (
          <div className="rounded-xl border border-dashed border-zinc-800 px-6 py-10 flex flex-col items-center justify-center text-center gap-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
              <p className="text-zinc-600 text-xs uppercase tracking-widest">Live Tracker</p>
            </div>
            <p className="text-zinc-500 text-sm max-w-sm">
              Live positions, tire strategies, pit stops, and race control messages will appear here when a session is active.
            </p>
          </div>
        )}

        {/* 3. Analytics — always visible */}
        <div className="space-y-6">
          <PointsProgressionChart progressions={progressions} />
          {championshipMath && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChampionshipMath data={championshipMath} />
              <div className="rounded-xl border border-dashed border-zinc-800 p-6 flex flex-col items-center justify-center text-center gap-2">
                <p className="text-zinc-600 text-xs uppercase tracking-widest">Coming Soon</p>
                <p className="text-zinc-500 text-sm font-medium">Head-to-Head Comparison</p>
                <p className="text-zinc-700 text-xs max-w-xs">
                  Pick any two drivers and compare stats side-by-side across the season.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
