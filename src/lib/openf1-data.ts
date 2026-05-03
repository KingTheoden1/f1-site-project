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

export async function getF1LiveTimingData(): Promise<LiveSessionData | null> {
  try {
    const res = await fetch("/api/live-timing", { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

