const OPENF1_BASE = "https://api.openf1.org/v1";

export interface OpenF1Session {
  session_key: number;
  meeting_key: number;
  session_name: string;
  session_type: string;
  date_start: string;
  date_end: string | null;
  location: string;
  country_name: string;
  circuit_short_name: string;
  year: number;
}

export interface OpenF1Driver {
  driver_number: number;
  broadcast_name: string;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_colour: string;
  headshot_url: string | null;
  country_code: string;
  session_key: number;
}

export interface OpenF1Position {
  driver_number: number;
  date: string;
  position: number;
  session_key: number;
}

export interface OpenF1Stint {
  driver_number: number;
  stint_number: number;
  lap_start: number;
  lap_end: number | null;
  compound: string;
  tyre_age_at_start: number;
  session_key: number;
}

export interface OpenF1Pit {
  driver_number: number;
  pit_duration: number | null;
  lap_number: number;
  date: string;
  session_key: number;
}

export interface OpenF1Lap {
  driver_number: number;
  lap_number: number;
  lap_duration: number | null;
  is_pit_out_lap: boolean;
  session_key: number;
}

export interface OpenF1RaceControl {
  date: string;
  lap_number: number | null;
  category: string;
  message: string;
  flag: string | null;
  scope: string | null;
  sector: number | null;
  session_key: number;
}

export interface DriverRow {
  driverNumber: number;
  name: string;
  acronym: string;
  team: string;
  teamColor: string;
  position: number;
  compound: string;
  tyreAge: number;
  lastLapTime: number | null;
  bestLapTime: number | null;
  pitCount: number;
}

export interface LiveSessionData {
  session: OpenF1Session;
  driverRows: DriverRow[];
  currentLap: number;
  raceControl: OpenF1RaceControl[];
  pits: OpenF1Pit[];
}

export function isSessionLive(session: OpenF1Session): boolean {
  const now = Date.now();
  const start = new Date(session.date_start).getTime();
  // Add a 30-min grace period after date_end in case the session runs long
  // or OpenF1's scheduled end is slightly early. Fall back to 4 h if no end set.
  const scheduledEnd = session.date_end
    ? new Date(session.date_end).getTime()
    : start + 4 * 60 * 60 * 1000;
  const end = scheduledEnd + 30 * 60 * 1000;
  return now >= start && now <= end;
}

// ─── F1 Live Timing (free, no auth, works during live sessions) ───────────────

export async function getF1LiveTimingData(): Promise<LiveSessionData | null> {
  try {
    const res = await fetch("/api/live-timing", { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ─── OpenF1 (free after sessions end; requires API key during live sessions) ──

async function openf1Fetch<T>(path: string): Promise<T> {
  const res = await fetch(`${OPENF1_BASE}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`OpenF1 fetch failed: ${path}`);
  return res.json();
}

export async function getLatestSession(): Promise<OpenF1Session | null> {
  try {
    const currentYear = new Date().getFullYear();

    // Primary: session_key=latest
    const sessions = await openf1Fetch<OpenF1Session[]>("/sessions?session_key=latest");
    const latest = sessions[0] ?? null;

    // If the latest session is from the current year, use it
    if (latest && latest.year === currentYear) return latest;

    // Fallback: fetch all sessions for this year and pick the most recent
    const yearSessions = await openf1Fetch<OpenF1Session[]>(
      `/sessions?year=${currentYear}`
    );
    if (yearSessions.length > 0) {
      return yearSessions.sort(
        (a, b) => new Date(b.date_start).getTime() - new Date(a.date_start).getTime()
      )[0];
    }

    // Last resort: return whatever session_key=latest gave us
    return latest;
  } catch {
    return null;
  }
}

export async function getLiveSessionData(
  sessionKey: number
): Promise<LiveSessionData | null> {
  try {
    const session = await openf1Fetch<OpenF1Session[]>(
      `/sessions?session_key=${sessionKey}`
    ).then((s) => s[0]);

    if (!session) return null;

    // Use allSettled so a single failing endpoint doesn't kill the whole tracker
    const settled = await Promise.allSettled([
      openf1Fetch<OpenF1Driver[]>(`/drivers?session_key=${sessionKey}`),
      openf1Fetch<OpenF1Position[]>(`/position?session_key=${sessionKey}`),
      openf1Fetch<OpenF1Stint[]>(`/stints?session_key=${sessionKey}`),
      openf1Fetch<OpenF1Pit[]>(`/pit?session_key=${sessionKey}`),
      openf1Fetch<OpenF1Lap[]>(`/laps?session_key=${sessionKey}`),
      openf1Fetch<OpenF1RaceControl[]>(`/race_control?session_key=${sessionKey}`),
    ]);

    const unwrap = <T,>(r: PromiseSettledResult<T[]>): T[] =>
      r.status === "fulfilled" ? r.value : [];

    const drivers     = unwrap(settled[0] as PromiseSettledResult<OpenF1Driver[]>);
    const allPositions = unwrap(settled[1] as PromiseSettledResult<OpenF1Position[]>);
    const stints      = unwrap(settled[2] as PromiseSettledResult<OpenF1Stint[]>);
    const pits        = unwrap(settled[3] as PromiseSettledResult<OpenF1Pit[]>);
    const allLaps     = unwrap(settled[4] as PromiseSettledResult<OpenF1Lap[]>);
    const raceControl = unwrap(settled[5] as PromiseSettledResult<OpenF1RaceControl[]>);

    // If no drivers came back the session data isn't ready yet
    if (drivers.length === 0) return null;

    // Latest position per driver
    const latestPositions: Record<number, OpenF1Position> = {};
    for (const p of allPositions) {
      const existing = latestPositions[p.driver_number];
      if (!existing || new Date(p.date) > new Date(existing.date)) {
        latestPositions[p.driver_number] = p;
      }
    }

    // Latest completed lap per driver
    const latestLaps: Record<number, OpenF1Lap> = {};
    for (const l of allLaps) {
      const existing = latestLaps[l.driver_number];
      if (!existing || l.lap_number > existing.lap_number) {
        latestLaps[l.driver_number] = l;
      }
    }

    // Best (fastest) lap per driver — used for qualifying / practice display
    const bestLaps: Record<number, number> = {};
    for (const l of allLaps) {
      if (l.lap_duration !== null) {
        const prev = bestLaps[l.driver_number];
        if (prev === undefined || l.lap_duration < prev) {
          bestLaps[l.driver_number] = l.lap_duration;
        }
      }
    }

    // Latest stint per driver
    const latestStints: Record<number, OpenF1Stint> = {};
    for (const s of stints) {
      const existing = latestStints[s.driver_number];
      if (!existing || s.stint_number > existing.stint_number) {
        latestStints[s.driver_number] = s;
      }
    }

    // Pit stop count per driver
    const pitCounts: Record<number, number> = {};
    for (const p of pits) {
      pitCounts[p.driver_number] = (pitCounts[p.driver_number] ?? 0) + 1;
    }

    // Build driver rows
    const driverRows: DriverRow[] = drivers.map((d) => {
      const stint = latestStints[d.driver_number];
      const lap = latestLaps[d.driver_number];
      const pos = latestPositions[d.driver_number];
      const lapOnTyre = lap && stint ? lap.lap_number - stint.lap_start + 1 : 0;

      return {
        driverNumber: d.driver_number,
        name: d.full_name,
        acronym: d.name_acronym,
        team: d.team_name,
        teamColor: d.team_colour ? `#${d.team_colour}` : "#ffffff",
        position: pos?.position ?? 99,
        compound: stint?.compound ?? "UNKNOWN",
        tyreAge: stint ? (stint.tyre_age_at_start ?? 0) + lapOnTyre : 0,
        lastLapTime: lap?.lap_duration ?? null,
        bestLapTime: bestLaps[d.driver_number] ?? null,
        pitCount: pitCounts[d.driver_number] ?? 0,
      };
    });

    driverRows.sort((a, b) => a.position - b.position);

    // Current lap = max lap seen across all drivers
    const currentLap = allLaps.length
      ? Math.max(...allLaps.map((l) => l.lap_number))
      : 0;

    return {
      session,
      driverRows,
      currentLap,
      // Most recent messages first, cap at 30
      raceControl: [...raceControl].reverse().slice(0, 30),
      pits: [...pits].reverse(),
    };
  } catch {
    return null;
  }
}
