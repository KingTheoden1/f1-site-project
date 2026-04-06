"use client";

import { useState, useEffect, useCallback } from "react";
import type { RaceWeekend } from "@/lib/f1-data";
import {
  getLatestSession,
  getLiveSessionData,
  isSessionLive,
  type LiveSessionData,
  type OpenF1Session,
} from "@/lib/openf1-data";
import RaceWeekendSchedule from "./RaceWeekendSchedule";
import LiveSessionTracker from "./LiveSessionTracker";

interface PitWallContentProps {
  weekend: RaceWeekend | null;
}

export default function PitWallContent({ weekend }: PitWallContentProps) {
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

          {/* Live indicator */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {liveData ? (
          <LiveSessionTracker data={liveData} />
        ) : (
          <RaceWeekendSchedule weekend={weekend} />
        )}
      </div>
    </div>
  );
}
