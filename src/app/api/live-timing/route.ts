import type {
  LiveSessionData,
  OpenF1Session,
  OpenF1RaceControl,
  DriverRow,
} from "@/lib/openf1-data";

const F1LT = "https://livetiming.formula1.com/static";

// ─── HTTP helpers ─────────────────────────────────────────────────────────────

async function ltJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: { "User-Agent": "BestHTTP" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function ltStream<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: { "User-Agent": "BestHTTP" },
    });
    if (!res.ok) return null;
    const text = await res.text();
    return parseJsonStream<T>(text);
  } catch {
    return null;
  }
}

// ─── JSON-stream parser ───────────────────────────────────────────────────────
// F1 live timing uses newline-delimited JSON patches:
//   "2026-05-03T19:00:01.123Z"{"CurrentLap":1,"TotalLaps":57}
//   "2026-05-03T19:01:15.456Z"{"CurrentLap":2}
// We merge every patch to reconstruct current state.

function parseJsonStream<T>(text: string): T | null {
  // Try plain JSON first (some feeds flip to plain JSON post-session)
  try {
    return JSON.parse(text) as T;
  } catch {
    /* fall through to stream parsing */
  }

  const lines = text.trim().split("\n").filter(Boolean);
  if (!lines.length) return null;

  let state: Record<string, unknown> = {};
  for (const line of lines) {
    const m = line.match(/^"[^"]*"(.+)$/);
    const json = m ? m[1] : line;
    try {
      const patch = JSON.parse(json) as Record<string, unknown>;
      state = deepMerge(state, patch) as Record<string, unknown>;
    } catch {
      /* skip malformed line */
    }
  }
  return Object.keys(state).length ? (state as T) : null;
}

function deepMerge(target: unknown, source: unknown): unknown {
  if (source === null || source === undefined) return target;
  if (typeof source !== "object" || Array.isArray(source)) return source;
  if (typeof target !== "object" || target === null || Array.isArray(target))
    target = {};

  const out = { ...(target as Record<string, unknown>) };
  for (const k of Object.keys(source as Record<string, unknown>)) {
    const v = (source as Record<string, unknown>)[k];
    if (
      typeof v === "object" &&
      v !== null &&
      !Array.isArray(v) &&
      typeof out[k] === "object" &&
      out[k] !== null
    ) {
      out[k] = deepMerge(out[k], v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

// ─── Lap-time parser ──────────────────────────────────────────────────────────

function parseLapTime(str: string | undefined | null): number | null {
  if (!str) return null;
  const s = str.trim();
  if (!s || s === "0:00.000") return null;
  const m = s.match(/^(\d+):(\d+\.\d+)$/);
  if (m) return parseInt(m[1]) * 60 + parseFloat(m[2]);
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ─── F1 live timing shapes ────────────────────────────────────────────────────

interface F1StreamingStatus {
  Status: string;
}
interface F1SessionInfo {
  Meeting: {
    Key: number;
    Name: string;
    Location: string;
    Country: { Name: string };
    Circuit: { ShortName: string };
  };
  Key: number;
  Type: string;
  Name: string;
  StartDate: string;
  EndDate?: string;
  Path: string;
}
interface F1DriverInfo {
  FullName?: string;
  Tla?: string;
  TeamName?: string;
  TeamColour?: string;
}
interface F1TimingLine {
  Position?: string;
  NumberOfLaps?: number;
  NumberOfPitStops?: number;
  LastLapTime?: { Value?: string };
  BestLapTime?: { Value?: string };
}
interface F1AppStint {
  Compound?: string;
  StartLaps?: number;
  TotalLaps?: number;
}
interface F1AppLine {
  Stints?: Record<string, F1AppStint>;
}
interface F1LapCount {
  CurrentLap: number;
  TotalLaps?: number;
}
interface F1RcMessage {
  Utc: string;
  Category: string;
  Message: string;
  Flag?: string;
  Scope?: string;
  Sector?: number | null;
  Lap?: number | null;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET() {
  try {
    // 1. Is a session live?
    const status = await ltJson<F1StreamingStatus>(
      `${F1LT}/StreamingStatus.json`
    );
    if (!status || status.Status !== "Available") {
      return Response.json(null);
    }

    // 2. Which session?
    const sessionInfo = await ltJson<F1SessionInfo>(`${F1LT}/SessionInfo.json`);
    if (!sessionInfo?.Path) return Response.json(null);

    const base = `${F1LT}/${sessionInfo.Path.replace(/\/$/, "")}`;

    // 3. Fetch all feeds in parallel (failures degrade gracefully)
    const [driversRes, timingRes, appRes, lapRes, rcRes] =
      await Promise.allSettled([
        ltJson<Record<string, F1DriverInfo>>(`${base}/DriverList.json`),
        ltStream<{ Lines?: Record<string, F1TimingLine> }>(
          `${base}/TimingData.jsonStream`
        ),
        ltStream<{ Lines?: Record<string, F1AppLine> }>(
          `${base}/TimingAppData.jsonStream`
        ),
        ltStream<F1LapCount>(`${base}/LapCount.jsonStream`),
        ltStream<{ Messages?: Record<string, F1RcMessage> }>(
          `${base}/RaceControlMessages.jsonStream`
        ),
      ]);

    const driverList =
      driversRes.status === "fulfilled" ? (driversRes.value ?? {}) : {};
    const timingLines =
      timingRes.status === "fulfilled"
        ? (timingRes.value?.Lines ?? {})
        : {};
    const appLines =
      appRes.status === "fulfilled" ? (appRes.value?.Lines ?? {}) : {};
    const lapCount =
      lapRes.status === "fulfilled" ? lapRes.value : null;
    const rcMessages =
      rcRes.status === "fulfilled" ? rcRes.value : null;

    if (!Object.keys(driverList).length) return Response.json(null);

    // 4. Map to OpenF1Session shape
    const session: OpenF1Session = {
      session_key: sessionInfo.Key,
      meeting_key: sessionInfo.Meeting.Key,
      session_name: sessionInfo.Name,
      session_type: sessionInfo.Type,
      date_start: sessionInfo.StartDate,
      date_end: sessionInfo.EndDate ?? null,
      location: sessionInfo.Meeting.Location,
      country_name: sessionInfo.Meeting.Country.Name,
      circuit_short_name: sessionInfo.Meeting.Circuit.ShortName,
      year: new Date(sessionInfo.StartDate).getFullYear(),
    };

    // 5. Build driver rows
    const driverRows: DriverRow[] = [];

    for (const [num, driver] of Object.entries(driverList)) {
      const tLine = timingLines[num] ?? {};
      const aLine = appLines[num] ?? {};

      // Current stint = highest numeric key in Stints object
      const stintEntries = Object.entries(aLine.Stints ?? {});
      const currentStint =
        stintEntries.length > 0
          ? stintEntries.sort(([a], [b]) => parseInt(b) - parseInt(a))[0][1]
          : null;

      const position = parseInt(tLine.Position ?? "99") || 99;
      const lapsCompleted = tLine.NumberOfLaps ?? 0;
      const stintStart = currentStint?.StartLaps ?? 0;

      driverRows.push({
        driverNumber: parseInt(num),
        name: toTitleCase(driver.FullName ?? `#${num}`),
        acronym: driver.Tla ?? `#${num}`,
        team: driver.TeamName ?? "Unknown",
        teamColor: driver.TeamColour ? `#${driver.TeamColour}` : "#ffffff",
        position,
        compound: currentStint?.Compound ?? "UNKNOWN",
        tyreAge: Math.max(0, lapsCompleted - stintStart),
        lastLapTime: parseLapTime(tLine.LastLapTime?.Value),
        bestLapTime: parseLapTime(tLine.BestLapTime?.Value),
        pitCount: tLine.NumberOfPitStops ?? 0,
      });
    }

    if (!driverRows.length) return Response.json(null);
    driverRows.sort((a, b) => a.position - b.position);

    // 6. Race control messages (newest first, cap 30)
    const msgMap = rcMessages?.Messages ?? {};
    const raceControl: OpenF1RaceControl[] = Object.keys(msgMap)
      .map(Number)
      .sort((a, b) => b - a)
      .slice(0, 30)
      .map((k) => {
        const msg = msgMap[k.toString()];
        return {
          date: msg.Utc,
          lap_number: msg.Lap ?? null,
          category: msg.Category,
          message: msg.Message,
          flag: msg.Flag ?? null,
          scope: msg.Scope ?? null,
          sector: msg.Sector ?? null,
          session_key: sessionInfo.Key,
        };
      });

    const result: LiveSessionData = {
      session,
      driverRows,
      currentLap: lapCount?.CurrentLap ?? 0,
      raceControl,
      pits: [], // individual pit events not available from polling
    };

    return Response.json(result);
  } catch (err) {
    console.error("[live-timing]", err);
    return Response.json(null);
  }
}
