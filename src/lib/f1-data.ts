export interface Race {
  round: number;
  raceName: string;
  circuitName: string;
  country: string;
  city: string;
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

export interface RaceSession {
  name: string;
  date: string;
  time: string;
}

export interface RaceWeekend extends Race {
  sessions: RaceSession[];
}

export async function getNextRaceWeekend(): Promise<RaceWeekend | null> {
  try {
    const res = await fetch(`${API_BASE}/current/next.json`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    const race = data.MRData.RaceTable.Races[0];
    if (!race) return null;

    const sessions: RaceSession[] = [];

    if (race.FirstPractice) {
      sessions.push({ name: "Practice 1", date: race.FirstPractice.date, time: race.FirstPractice.time });
    }
    if (race.SprintQualifying) {
      sessions.push({ name: "Sprint Qualifying", date: race.SprintQualifying.date, time: race.SprintQualifying.time });
    } else if (race.SecondPractice) {
      sessions.push({ name: "Practice 2", date: race.SecondPractice.date, time: race.SecondPractice.time });
    }
    if (race.Sprint) {
      sessions.push({ name: "Sprint", date: race.Sprint.date, time: race.Sprint.time });
    } else if (race.ThirdPractice) {
      sessions.push({ name: "Practice 3", date: race.ThirdPractice.date, time: race.ThirdPractice.time });
    }
    if (race.Qualifying) {
      sessions.push({ name: "Qualifying", date: race.Qualifying.date, time: race.Qualifying.time });
    }
    sessions.push({ name: "Race", date: race.date, time: race.time || "14:00:00Z" });

    return {
      round: parseInt(race.round),
      raceName: race.raceName,
      circuitName: race.Circuit.circuitName,
      country: race.Circuit.Location.country,
      city: race.Circuit.Location.locality,
      date: race.date,
      time: race.time || "14:00:00Z",
      circuitId: race.Circuit.circuitId,
      sessions,
    };
  } catch {
    return null;
  }
}

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
      city: race.Circuit.Location.locality,
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

export interface SeasonRace {
  round: number;
  raceName: string;
  country: string;
  city: string;
  date: string;
  time: string;
  circuitName: string;
  status: "completed" | "upcoming" | "cancelled";
  winner?: string;
}

const CANCELLED_RACES: SeasonRace[] = [
  {
    round: 0,
    raceName: "Bahrain Grand Prix",
    country: "Bahrain",
    city: "Sakhir",
    date: "2026-04-12",
    time: "00:00:00Z",
    circuitName: "Bahrain International Circuit",
    status: "cancelled",
  },
  {
    round: 0,
    raceName: "Saudi Arabian Grand Prix",
    country: "Saudi Arabia",
    city: "Jeddah",
    date: "2026-04-19",
    time: "00:00:00Z",
    circuitName: "Jeddah Corniche Circuit",
    status: "cancelled",
  },
];

export async function getSeasonCalendar(): Promise<SeasonRace[]> {
  try {
    const res = await fetch(`${API_BASE}/current.json`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    const races = data.MRData.RaceTable.Races || [];
    const today = new Date();

    const apiRaces: SeasonRace[] = races.map(
      (race: {
        round: string;
        raceName: string;
        Circuit: {
          circuitId: string;
          circuitName: string;
          Location: { country: string; locality: string };
        };
        date: string;
        time?: string;
      }) => {
        const raceDate = new Date(race.date);
        // Mark as completed only the day after the race
        const dayAfterRace = new Date(raceDate);
        dayAfterRace.setDate(dayAfterRace.getDate() + 1);

        return {
          round: parseInt(race.round),
          raceName: race.raceName,
          country: race.Circuit.Location.country,
          city: race.Circuit.Location.locality,
          date: race.date,
          time: race.time || "00:00:00Z",
          circuitName: race.Circuit.circuitName,
          status: today >= dayAfterRace ? "completed" as const : "upcoming" as const,
        };
      }
    );

    // Fetch race winners — also used to determine completed status
    const winners: Record<number, string> = {};
    try {
      const resultsRes = await fetch(
        `${API_BASE}/current/results/1.json`,
        { next: { revalidate: 3600 } }
      );
      const resultsData = await resultsRes.json();
      const resultRaces = resultsData.MRData.RaceTable.Races || [];
      for (const race of resultRaces) {
        const round = parseInt(race.round);
        const winner = race.Results?.[0];
        if (winner) {
          winners[round] = `${winner.Driver.givenName} ${winner.Driver.familyName}`;
        }
      }
    } catch {
      // Winners just won't show if this fails
    }

    // Attach winners and mark races with results as completed
    const apiRacesWithWinners = apiRaces.map((race) => ({
      ...race,
      winner: winners[race.round],
      status: winners[race.round]
        ? "completed" as const
        : race.status,
    }));

    // Merge cancelled races with API races, sorted by date
    const allRaces = [...CANCELLED_RACES, ...apiRacesWithWinners].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Re-assign round numbers sequentially
    return allRaces.map((race, i) => ({ ...race, round: i + 1 }));
  } catch {
    return [];
  }
}

// ============ CIRCUITS ============

import { CIRCUIT_DATA, type CircuitStaticData } from "./circuit-data";

export interface CircuitWithDetails extends CircuitStaticData {
  circuitName: string;
  country: string;
  city: string;
  lat: string;
  long: string;
  round?: number;
  raceName?: string;
  raceDate?: string;
  raceTime?: string;
  raceCancelled?: boolean;
}

export interface CircuitWinner {
  season: number;
  raceName: string;
  date: string;
  driver: string;
  team: string;
}

export async function getCircuits(): Promise<CircuitWithDetails[]> {
  try {
    const [circuitsRes, scheduleRes] = await Promise.all([
      fetch(`${API_BASE}/current/circuits.json?limit=30`, {
        next: { revalidate: 3600 },
      }),
      fetch(`${API_BASE}/current.json`, {
        next: { revalidate: 3600 },
      }),
    ]);

    const circuitsData = await circuitsRes.json();
    const scheduleData = await scheduleRes.json();

    const circuits = circuitsData.MRData.CircuitTable.Circuits || [];
    const races = scheduleData.MRData.RaceTable.Races || [];

    // Build a schedule lookup by circuitId
    const scheduleLookup: Record<
      string,
      { round: number; raceName: string; date: string; time: string }
    > = {};
    for (const race of races) {
      scheduleLookup[race.Circuit.circuitId] = {
        round: parseInt(race.round),
        raceName: race.raceName,
        date: race.date,
        time: race.time || "00:00:00Z",
      };
    }

    // Cancelled circuit IDs
    const cancelledIds = new Set(["bahrain", "jeddah"]);

    const result: CircuitWithDetails[] = circuits.map(
      (c: {
        circuitId: string;
        circuitName: string;
        Location: {
          country: string;
          locality: string;
          lat: string;
          long: string;
        };
      }) => {
        const staticData = CIRCUIT_DATA[c.circuitId];
        const schedule = scheduleLookup[c.circuitId];

        return {
          // Static data (fallback defaults if circuit not in our data file)
          circuitId: c.circuitId,
          trackType: staticData?.trackType || "permanent",
          lengthKm: staticData?.lengthKm || 0,
          turns: staticData?.turns || 0,
          drsZones: staticData?.drsZones || 0,
          laps: staticData?.laps || 0,
          lapRecord: staticData?.lapRecord,
          elevationChangeM: staticData?.elevationChangeM,
          description: staticData?.description || "",
          history: staticData?.history || "",
          notableRaces: staticData?.notableRaces || [],
          // API data
          circuitName: c.circuitName,
          country: c.Location.country,
          city: c.Location.locality,
          lat: c.Location.lat,
          long: c.Location.long,
          round: schedule?.round,
          raceName: schedule?.raceName,
          raceDate: schedule?.date,
          raceTime: schedule?.time,
          raceCancelled: cancelledIds.has(c.circuitId),
        };
      }
    );

    // Sort by round number (circuits without a round go last)
    return result.sort((a, b) => (a.round ?? 999) - (b.round ?? 999));
  } catch {
    return [];
  }
}

export async function getCircuitById(
  circuitId: string
): Promise<CircuitWithDetails | null> {
  const circuits = await getCircuits();
  return circuits.find((c) => c.circuitId === circuitId) || null;
}

export async function getCircuitWinners(
  circuitId: string
): Promise<CircuitWinner[]> {
  try {
    const res = await fetch(
      `${API_BASE}/circuits/${circuitId}/results/1.json?limit=100`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    const races = data.MRData.RaceTable.Races || [];

    return races
      .map(
        (race: {
          season: string;
          raceName: string;
          date: string;
          Results: {
            Driver: { givenName: string; familyName: string };
            Constructor: { name: string };
          }[];
        }) => ({
          season: parseInt(race.season),
          raceName: race.raceName,
          date: race.date,
          driver: `${race.Results[0].Driver.givenName} ${race.Results[0].Driver.familyName}`,
          team: race.Results[0].Constructor.name,
        })
      )
      .reverse();
  } catch {
    return [];
  }
}

// ============ TEAMS ============

import { TEAM_DATA, type TeamStaticData } from "./team-data";

export interface TeamDriver {
  name: string;
  code: string;
  number: string;
  nationality: string;
  points: number;
  wins: number;
  position: number;
}

export interface TeamWithDetails extends TeamStaticData {
  name: string;
  nationality: string;
  position: number;
  points: number;
  wins: number;
  drivers: TeamDriver[];
  websiteUrl: string;
}

export async function getTeamsWithDrivers(): Promise<TeamWithDetails[]> {
  try {
    const [standingsRes, driverStandingsRes] = await Promise.all([
      fetch(`${API_BASE}/current/constructorStandings.json`, {
        next: { revalidate: 3600 },
      }),
      fetch(`${API_BASE}/current/driverStandings.json`, {
        next: { revalidate: 3600 },
      }),
    ]);

    const standingsData = await standingsRes.json();
    const driverData = await driverStandingsRes.json();

    const constructorStandings =
      standingsData.MRData.StandingsTable.StandingsLists[0]
        ?.ConstructorStandings || [];
    const driverStandings =
      driverData.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];

    // Group drivers by constructor
    const driversByTeam: Record<string, TeamDriver[]> = {};
    for (const ds of driverStandings) {
      const constructorId = ds.Constructors[0]?.constructorId;
      if (!constructorId) continue;

      if (!driversByTeam[constructorId]) {
        driversByTeam[constructorId] = [];
      }

      driversByTeam[constructorId].push({
        name: `${ds.Driver.givenName} ${ds.Driver.familyName}`,
        code: ds.Driver.code || ds.Driver.familyName.substring(0, 3).toUpperCase(),
        number: ds.Driver.permanentNumber || "0",
        nationality: ds.Driver.nationality || "",
        points: parseFloat(ds.points),
        wins: parseInt(ds.wins),
        position: parseInt(ds.position),
      });
    }

    return constructorStandings.map(
      (cs: {
        position: string;
        points: string;
        wins: string;
        Constructor: {
          constructorId: string;
          name: string;
          nationality: string;
          url: string;
        };
      }) => {
        const id = cs.Constructor.constructorId;
        const staticData = TEAM_DATA[id];

        return {
          // Static data (fallback defaults)
          constructorId: id,
          fullName: staticData?.fullName || cs.Constructor.name,
          base: staticData?.base || "Unknown",
          teamPrincipal: staticData?.teamPrincipal || "Unknown",
          powerUnit: staticData?.powerUnit || "Unknown",
          firstEntry: staticData?.firstEntry || 0,
          worldChampionships: staticData?.worldChampionships || 0,
          highestFinish: staticData?.highestFinish || "N/A",
          description: staticData?.description || "",
          history: staticData?.history || "",
          // API data
          name: cs.Constructor.name,
          nationality: cs.Constructor.nationality,
          position: parseInt(cs.position),
          points: parseFloat(cs.points),
          wins: parseInt(cs.wins),
          drivers: driversByTeam[id] || [],
          websiteUrl: staticData?.websiteUrl || cs.Constructor.url,
        };
      }
    );
  } catch {
    return [];
  }
}

// ============ DRIVERS ============

export interface DriverWithDetails {
  position: number;
  points: number;
  wins: number;
  driverId: string;
  name: string;
  givenName: string;
  familyName: string;
  code: string;
  number: string;
  dateOfBirth: string;
  nationality: string;
  team: string;
  constructorId: string;
  wikiUrl: string;
}

export async function getDriversWithDetails(): Promise<DriverWithDetails[]> {
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
        points: string;
        wins: string;
        Driver: {
          driverId: string;
          givenName: string;
          familyName: string;
          code?: string;
          permanentNumber?: string;
          dateOfBirth?: string;
          nationality?: string;
          url?: string;
        };
        Constructors: {
          constructorId: string;
          name: string;
        }[];
      }) => ({
        position: parseInt(s.position),
        points: parseFloat(s.points),
        wins: parseInt(s.wins),
        driverId: s.Driver.driverId,
        name: `${s.Driver.givenName} ${s.Driver.familyName}`,
        givenName: s.Driver.givenName,
        familyName: s.Driver.familyName,
        code: s.Driver.code || s.Driver.familyName.substring(0, 3).toUpperCase(),
        number: s.Driver.permanentNumber || "0",
        dateOfBirth: s.Driver.dateOfBirth || "",
        nationality: s.Driver.nationality || "",
        team: s.Constructors[0]?.name || "Unknown",
        constructorId: s.Constructors[0]?.constructorId || "",
        wikiUrl: s.Driver.url || "",
      })
    );
  } catch {
    return [];
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
