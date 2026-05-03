import type {
  LiveSessionData,
  OpenF1Session,
  OpenF1Driver,
  OpenF1Position,
  OpenF1Stint,
  OpenF1Pit,
  OpenF1Lap,
  OpenF1RaceControl,
  DriverRow,
} from "@/lib/openf1-data";

// ═══════════════════════════════════════════════════════════════════════════════
// PATH 1 — F1 Live Timing static files (free, works after sessions end)
// ═══════════════════════════════════════════════════════════════════════════════

const F1LT = "https://livetiming.formula1.com/static";

async function ltJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-store", headers: { "User-Agent": "BestHTTP" } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch { return null; }
}

async function ltStream<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-store", headers: { "User-Agent": "BestHTTP" } });
    if (!res.ok) return null;
    return parseJsonStream<T>(await res.text());
  } catch { return null; }
}

function parseJsonStream<T>(text: string): T | null {
  try { return JSON.parse(text) as T; } catch { /* stream format */ }
  const lines = text.trim().split("\n").filter(Boolean);
  if (!lines.length) return null;
  let state: Record<string, unknown> = {};
  for (const line of lines) {
    const m = line.match(/^"[^"]*"(.+)$/);
    try { state = deepMerge(state, JSON.parse(m ? m[1] : line)) as Record<string, unknown>; }
    catch { /* skip */ }
  }
  return Object.keys(state).length ? (state as T) : null;
}

function deepMerge(target: unknown, source: unknown): unknown {
  if (source === null || source === undefined) return target;
  if (typeof source !== "object" || Array.isArray(source)) return source;
  if (typeof target !== "object" || target === null || Array.isArray(target)) target = {};
  const out = { ...(target as Record<string, unknown>) };
  for (const k of Object.keys(source as Record<string, unknown>)) {
    const v = (source as Record<string, unknown>)[k];
    out[k] = (typeof v === "object" && v !== null && !Array.isArray(v) &&
               typeof out[k] === "object" && out[k] !== null)
      ? deepMerge(out[k], v) : v;
  }
  return out;
}

interface F1SessionInfo {
  Meeting: { Key: number; Name: string; Location: string; Country: { Name: string }; Circuit: { ShortName: string } };
  Key: number; Type: string; Name: string; StartDate: string; EndDate?: string; Path: string;
}
interface F1DriverInfo { FullName?: string; Tla?: string; TeamName?: string; TeamColour?: string }
interface F1TimingLine { Position?: string; NumberOfLaps?: number; NumberOfPitStops?: number; LastLapTime?: { Value?: string }; BestLapTime?: { Value?: string } }
interface F1AppStint { Compound?: string; StartLaps?: number }
interface F1AppLine { Stints?: Record<string, F1AppStint> }
interface F1LapCount { CurrentLap: number }
interface F1RcMessage { Utc: string; Category: string; Message: string; Flag?: string; Scope?: string; Sector?: number | null; Lap?: number | null }

function parseLapTime(str?: string | null): number | null {
  if (!str) return null;
  const s = str.trim();
  if (!s || s === "0:00.000") return null;
  const m = s.match(/^(\d+):(\d+\.\d+)$/);
  if (m) return parseInt(m[1]) * 60 + parseFloat(m[2]);
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}

function toTitleCase(str: string) {
  return str.toLowerCase().split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

async function getF1LTData(): Promise<LiveSessionData | null> {
  const status = await ltJson<{ Status: string }>(`${F1LT}/StreamingStatus.json`);
  if (!status || status.Status !== "Available") return null;

  const sessionInfo = await ltJson<F1SessionInfo>(`${F1LT}/SessionInfo.json`);
  if (!sessionInfo?.Path) return null;

  const base = `${F1LT}/${sessionInfo.Path.replace(/\/$/, "")}`;

  const [driversRes, timingRes, appRes, lapRes, rcRes] = await Promise.allSettled([
    ltJson<Record<string, F1DriverInfo>>(`${base}/DriverList.json`),
    ltStream<{ Lines?: Record<string, F1TimingLine> }>(`${base}/TimingData.jsonStream`),
    ltStream<{ Lines?: Record<string, F1AppLine> }>(`${base}/TimingAppData.jsonStream`),
    ltStream<F1LapCount>(`${base}/LapCount.jsonStream`),
    ltStream<{ Messages?: Record<string, F1RcMessage> }>(`${base}/RaceControlMessages.jsonStream`),
  ]);

  const driverList = driversRes.status === "fulfilled" ? (driversRes.value ?? {}) : {};
  const timingLines = timingRes.status === "fulfilled" ? (timingRes.value?.Lines ?? {}) : {};
  const appLines = appRes.status === "fulfilled" ? (appRes.value?.Lines ?? {}) : {};
  const lapCount = lapRes.status === "fulfilled" ? lapRes.value : null;
  const rcMessages = rcRes.status === "fulfilled" ? rcRes.value : null;

  if (!Object.keys(driverList).length) return null;

  const session: OpenF1Session = {
    session_key: sessionInfo.Key, meeting_key: sessionInfo.Meeting.Key,
    session_name: sessionInfo.Name, session_type: sessionInfo.Type,
    date_start: sessionInfo.StartDate, date_end: sessionInfo.EndDate ?? null,
    location: sessionInfo.Meeting.Location, country_name: sessionInfo.Meeting.Country.Name,
    circuit_short_name: sessionInfo.Meeting.Circuit.ShortName,
    year: new Date(sessionInfo.StartDate).getFullYear(),
  };

  const driverRows: DriverRow[] = Object.entries(driverList).map(([num, driver]) => {
    const tLine = timingLines[num] ?? {};
    const stints = (appLines[num] ?? {}).Stints ?? {};
    const currentStint = Object.entries(stints).sort(([a], [b]) => parseInt(b) - parseInt(a))[0]?.[1] ?? null;
    const position = parseInt(tLine.Position ?? "99") || 99;
    const lapsCompleted = tLine.NumberOfLaps ?? 0;
    return {
      driverNumber: parseInt(num), name: toTitleCase(driver.FullName ?? `#${num}`),
      acronym: driver.Tla ?? `#${num}`, team: driver.TeamName ?? "Unknown",
      teamColor: driver.TeamColour ? `#${driver.TeamColour}` : "#ffffff",
      position, compound: currentStint?.Compound ?? "UNKNOWN",
      tyreAge: Math.max(0, lapsCompleted - (currentStint?.StartLaps ?? 0)),
      lastLapTime: parseLapTime(tLine.LastLapTime?.Value),
      bestLapTime: parseLapTime(tLine.BestLapTime?.Value),
      pitCount: tLine.NumberOfPitStops ?? 0,
    };
  });

  if (!driverRows.length) return null;
  driverRows.sort((a, b) => a.position - b.position);

  const msgMap = rcMessages?.Messages ?? {};
  const raceControl: OpenF1RaceControl[] = Object.keys(msgMap).map(Number)
    .sort((a, b) => b - a).slice(0, 30)
    .map(k => { const m = msgMap[k.toString()]; return { date: m.Utc, lap_number: m.Lap ?? null, category: m.Category, message: m.Message, flag: m.Flag ?? null, scope: m.Scope ?? null, sector: m.Sector ?? null, session_key: sessionInfo.Key }; });

  return { session, driverRows, currentLap: lapCount?.CurrentLap ?? 0, raceControl, pits: [] };
}

// ═══════════════════════════════════════════════════════════════════════════════
// PATH 2 — OpenF1 with OAuth2 (authenticated, works during live sessions)
// ═══════════════════════════════════════════════════════════════════════════════

let tokenCache: { token: string; expiresAt: number } | null = null;

async function getOpenF1Token(): Promise<string | null> {
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now + 5 * 60 * 1000) return tokenCache.token;

  const username = process.env.OPENF1_USERNAME;
  const password = process.env.OPENF1_PASSWORD;
  if (!username || !password) return null;

  try {
    const res = await fetch("https://api.openf1.org/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    const expiresIn = parseInt(data.expires_in ?? "3600");
    tokenCache = { token: data.access_token, expiresAt: now + expiresIn * 1000 };
    return tokenCache.token;
  } catch { return null; }
}

async function openf1<T>(path: string, token: string): Promise<T[]> {
  const res = await fetch(`https://api.openf1.org/v1${path}`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`OpenF1 ${res.status}`);
  return res.json();
}

function isLive(session: OpenF1Session): boolean {
  const now = Date.now();
  const start = new Date(session.date_start).getTime();
  const end = (session.date_end ? new Date(session.date_end).getTime() : start + 4 * 60 * 60 * 1000) + 30 * 60 * 1000;
  return now >= start && now <= end;
}

async function getOpenF1Data(): Promise<LiveSessionData | null> {
  const token = await getOpenF1Token();
  if (!token) return null;

  try {
    // Get latest session — fall back to current-year search if it's from a past year
    const currentYear = new Date().getFullYear();
    let sessions = await openf1<OpenF1Session>("/sessions?session_key=latest", token);
    let session = sessions[0] ?? null;

    if (!session || session.year < currentYear) {
      const yearSessions = await openf1<OpenF1Session>(`/sessions?year=${currentYear}`, token);
      session = yearSessions.sort(
        (a, b) => new Date(b.date_start).getTime() - new Date(a.date_start).getTime()
      )[0] ?? null;
    }

    if (!session || !isLive(session)) return null;

    const key = session.session_key;
    const settled = await Promise.allSettled([
      openf1<OpenF1Driver>(`/drivers?session_key=${key}`, token),
      openf1<OpenF1Position>(`/position?session_key=${key}`, token),
      openf1<OpenF1Stint>(`/stints?session_key=${key}`, token),
      openf1<OpenF1Pit>(`/pit?session_key=${key}`, token),
      openf1<OpenF1Lap>(`/laps?session_key=${key}`, token),
      openf1<OpenF1RaceControl>(`/race_control?session_key=${key}`, token),
    ]);

    const unwrap = <T,>(r: PromiseSettledResult<T[]>): T[] => r.status === "fulfilled" ? r.value : [];
    const drivers     = unwrap(settled[0] as PromiseSettledResult<OpenF1Driver[]>);
    const allPositions = unwrap(settled[1] as PromiseSettledResult<OpenF1Position[]>);
    const stints      = unwrap(settled[2] as PromiseSettledResult<OpenF1Stint[]>);
    const pits        = unwrap(settled[3] as PromiseSettledResult<OpenF1Pit[]>);
    const allLaps     = unwrap(settled[4] as PromiseSettledResult<OpenF1Lap[]>);
    const raceControl = unwrap(settled[5] as PromiseSettledResult<OpenF1RaceControl[]>);

    if (!drivers.length) return null;

    const latestPositions: Record<number, OpenF1Position> = {};
    for (const p of allPositions) {
      const ex = latestPositions[p.driver_number];
      if (!ex || new Date(p.date) > new Date(ex.date)) latestPositions[p.driver_number] = p;
    }
    const latestLaps: Record<number, OpenF1Lap> = {};
    for (const l of allLaps) {
      const ex = latestLaps[l.driver_number];
      if (!ex || l.lap_number > ex.lap_number) latestLaps[l.driver_number] = l;
    }
    const bestLaps: Record<number, number> = {};
    for (const l of allLaps) {
      if (l.lap_duration !== null) {
        const prev = bestLaps[l.driver_number];
        if (prev === undefined || l.lap_duration < prev) bestLaps[l.driver_number] = l.lap_duration;
      }
    }
    const latestStints: Record<number, OpenF1Stint> = {};
    for (const s of stints) {
      const ex = latestStints[s.driver_number];
      if (!ex || s.stint_number > ex.stint_number) latestStints[s.driver_number] = s;
    }
    const pitCounts: Record<number, number> = {};
    for (const p of pits) pitCounts[p.driver_number] = (pitCounts[p.driver_number] ?? 0) + 1;

    const driverRows: DriverRow[] = drivers.map(d => {
      const stint = latestStints[d.driver_number];
      const lap   = latestLaps[d.driver_number];
      const pos   = latestPositions[d.driver_number];
      const lapOnTyre = lap && stint ? lap.lap_number - stint.lap_start + 1 : 0;
      return {
        driverNumber: d.driver_number, name: d.full_name, acronym: d.name_acronym,
        team: d.team_name, teamColor: d.team_colour ? `#${d.team_colour}` : "#ffffff",
        position: pos?.position ?? 99, compound: stint?.compound ?? "UNKNOWN",
        tyreAge: stint ? (stint.tyre_age_at_start ?? 0) + lapOnTyre : 0,
        lastLapTime: lap?.lap_duration ?? null, bestLapTime: bestLaps[d.driver_number] ?? null,
        pitCount: pitCounts[d.driver_number] ?? 0,
      };
    });

    driverRows.sort((a, b) => a.position - b.position);
    const currentLap = allLaps.length ? Math.max(...allLaps.map(l => l.lap_number)) : 0;

    return {
      session, driverRows, currentLap,
      raceControl: [...raceControl].reverse().slice(0, 30),
      pits: [...pits].reverse(),
    };
  } catch (err) {
    console.error("[openf1-auth]", err);
    return null;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Route handler — try F1 LT (free/historical) then OpenF1 auth (live)
// ═══════════════════════════════════════════════════════════════════════════════

export async function GET() {
  try {
    const ltData = await getF1LTData();
    if (ltData) return Response.json(ltData);

    const openf1Data = await getOpenF1Data();
    if (openf1Data) return Response.json(openf1Data);

    return Response.json(null);
  } catch (err) {
    console.error("[live-timing route]", err);
    return Response.json(null);
  }
}
