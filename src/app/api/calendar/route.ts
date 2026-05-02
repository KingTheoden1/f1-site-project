const API_BASE = "https://api.jolpi.ca/ergast/f1";

interface Session {
  date: string;
  time: string;
}

interface ApiRace {
  round: string;
  raceName: string;
  Circuit: { circuitName: string; Location: { country: string; locality: string } };
  date: string;
  time?: string;
  FirstPractice?: Session;
  SecondPractice?: Session;
  ThirdPractice?: Session;
  SprintQualifying?: Session;
  Sprint?: Session;
  Qualifying?: Session;
}

const SESSION_META: Record<string, { label: string; emoji: string; durationMins: number }> = {
  FirstPractice:     { label: "Practice 1",          emoji: "🔧", durationMins: 60 },
  SecondPractice:    { label: "Practice 2",          emoji: "🔧", durationMins: 60 },
  ThirdPractice:     { label: "Practice 3",          emoji: "🔧", durationMins: 60 },
  SprintQualifying:  { label: "Sprint Qualifying",   emoji: "⚡", durationMins: 60 },
  Sprint:            { label: "Sprint Race",         emoji: "⚡", durationMins: 45 },
  Qualifying:        { label: "Qualifying",          emoji: "🏎️", durationMins: 60 },
  Race:              { label: "Grand Prix",          emoji: "🏁", durationMins: 120 },
};

function toICSDate(dateStr: string, timeStr: string): string {
  const dt = new Date(`${dateStr}T${timeStr}`);
  return dt.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function toICSDateEnd(dateStr: string, timeStr: string, durationMins: number): string {
  const dt = new Date(`${dateStr}T${timeStr}`);
  dt.setMinutes(dt.getMinutes() + durationMins);
  return dt.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function sanitize(str: string): string {
  return str.replace(/[,;\\]/g, "\\$&").replace(/\n/g, "\\n");
}

function makeEvent(
  uid: string,
  dateStr: string,
  timeStr: string,
  summary: string,
  description: string,
  location: string,
  durationMins: number
): string[] {
  return [
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTART:${toICSDate(dateStr, timeStr)}`,
    `DTEND:${toICSDateEnd(dateStr, timeStr, durationMins)}`,
    `SUMMARY:${sanitize(summary)}`,
    `DESCRIPTION:${sanitize(description)}`,
    `LOCATION:${sanitize(location)}`,
    "END:VEVENT",
  ];
}

export async function GET() {
  const res = await fetch(`${API_BASE}/current.json?limit=30`, {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  const races: ApiRace[] = data.MRData.RaceTable.Races || [];

  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//F1 Pulse//2026 Season Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:F1 2026 Season",
    "X-WR-TIMEZONE:UTC",
  ];

  for (const race of races) {
    const round = parseInt(race.round);
    const circuitName = race.Circuit.circuitName;
    const country = race.Circuit.Location.country;
    const location = `${circuitName}, ${country}`;

    const sessionKeys = [
      "FirstPractice",
      "SecondPractice",
      "ThirdPractice",
      "SprintQualifying",
      "Sprint",
      "Qualifying",
    ] as const;

    for (const key of sessionKeys) {
      const session = race[key];
      if (!session) continue;
      const meta = SESSION_META[key];
      const uid = `f1-2026-r${round}-${key.toLowerCase()}@f1pulse`;
      lines.push(
        ...makeEvent(
          uid,
          session.date,
          session.time,
          `${meta.emoji} ${race.raceName} — ${meta.label}`,
          `Round ${round} · ${race.raceName}\\n${circuitName}, ${country}`,
          location,
          meta.durationMins
        )
      );
    }

    // Race itself
    const raceTime = race.time && race.time !== "00:00:00Z" ? race.time : "13:00:00Z";
    lines.push(
      ...makeEvent(
        `f1-2026-r${round}-race@f1pulse`,
        race.date,
        raceTime,
        `🏁 ${race.raceName}`,
        `Round ${round} · ${race.raceName}\\n${circuitName}, ${country}`,
        location,
        SESSION_META.Race.durationMins
      )
    );
  }

  lines.push("END:VCALENDAR");

  return new Response(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="f1-2026-season.ics"',
    },
  });
}
