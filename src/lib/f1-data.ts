export interface Race {
  round: number;
  raceName: string;
  circuitName: string;
  country: string;
  date: string;
  time: string;
  circuitId: string;
}

export interface DriverStanding {
  position: number;
  driver: string;
  code: string;
  team: string;
  points: number;
  wins: number;
  nationality: string;
}

export interface ConstructorStanding {
  position: number;
  team: string;
  points: number;
  wins: number;
}

export interface RaceResult {
  position: number;
  driver: string;
  code: string;
  team: string;
  time: string;
  points: number;
  fastestLap?: boolean;
}

const API_BASE = "https://api.jolpi.ca/ergast/f1";

export async function getNextRace(): Promise<Race | null> {
  try {
    const res = await fetch(`${API_BASE}/current/next.json`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    const race = data.MRData.RaceTable.Races[0];
    if (!race) return null;

    return {
      round: parseInt(race.round),
      raceName: race.raceName,
      circuitName: race.Circuit.circuitName,
      country: race.Circuit.Location.country,
      date: race.date,
      time: race.time || "14:00:00Z",
      circuitId: race.Circuit.circuitId,
    };
  } catch {
    return null;
  }
}

export async function getDriverStandings(): Promise<DriverStanding[]> {
  try {
    const res = await fetch(`${API_BASE}/current/driverStandings.json`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    const standings =
      data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];

    return standings.map(
      (s: {
        position: string;
        Driver: { givenName: string; familyName: string; code: string; nationality: string };
        Constructors: { name: string }[];
        points: string;
        wins: string;
      }) => ({
        position: parseInt(s.position),
        driver: `${s.Driver.givenName} ${s.Driver.familyName}`,
        code: s.Driver.code,
        team: s.Constructors[0]?.name || "Unknown",
        points: parseFloat(s.points),
        wins: parseInt(s.wins),
        nationality: s.Driver.nationality,
      })
    );
  } catch {
    return [];
  }
}

export async function getConstructorStandings(): Promise<
  ConstructorStanding[]
> {
  try {
    const res = await fetch(
      `${API_BASE}/current/constructorStandings.json`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    const standings =
      data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];

    return standings.map(
      (s: {
        position: string;
        Constructor: { name: string };
        points: string;
        wins: string;
      }) => ({
        position: parseInt(s.position),
        team: s.Constructor.name,
        points: parseFloat(s.points),
        wins: parseInt(s.wins),
      })
    );
  } catch {
    return [];
  }
}

export async function getLastRaceResults(): Promise<{
  raceName: string;
  results: RaceResult[];
} | null> {
  try {
    const res = await fetch(`${API_BASE}/current/last/results.json`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    const race = data.MRData.RaceTable.Races[0];
    if (!race) return null;

    return {
      raceName: race.raceName,
      results: race.Results.slice(0, 10).map(
        (r: {
          position: string;
          Driver: { givenName: string; familyName: string; code: string };
          Constructor: { name: string };
          Time?: { time: string };
          status: string;
          points: string;
          FastestLap?: { rank: string };
        }) => ({
          position: parseInt(r.position),
          driver: `${r.Driver.givenName} ${r.Driver.familyName}`,
          code: r.Driver.code,
          team: r.Constructor.name,
          time: r.Time?.time || r.status,
          points: parseFloat(r.points),
          fastestLap: r.FastestLap?.rank === "1",
        })
      ),
    };
  } catch {
    return null;
  }
}

export const TEAM_COLORS: Record<string, string> = {
  "Red Bull": "#3671C6",
  "Ferrari": "#E8002D",
  "McLaren": "#FF8000",
  "Mercedes": "#27F4D2",
  "Aston Martin": "#229971",
  "Alpine F1 Team": "#FF87BC",
  "Williams": "#64C4FF",
  "Racing Bulls": "#6692FF",
  "RB F1 Team": "#6692FF",
  "Audi": "#00A36C",
  "Kick Sauber": "#52E252",
  "Haas F1 Team": "#B6BABD",
  "Cadillac F1 Team": "#C0C0C0",
};
