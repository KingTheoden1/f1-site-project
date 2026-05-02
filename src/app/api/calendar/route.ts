import { getSeasonCalendar } from "@/lib/f1-data";

function toICSDate(dateStr: string, timeStr: string): string {
  const dt = new Date(`${dateStr}T${timeStr}`);
  return dt.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function toICSDateEnd(dateStr: string, timeStr: string): string {
  const dt = new Date(`${dateStr}T${timeStr}`);
  dt.setHours(dt.getHours() + 2);
  return dt.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function sanitize(str: string): string {
  return str.replace(/[,;\\]/g, "\\$&").replace(/\n/g, "\\n");
}

export async function GET() {
  const races = await getSeasonCalendar();
  const active = races.filter((r) => r.status !== "cancelled");

  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//F1 Pulse//2026 Season Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:F1 2026 Season",
    "X-WR-TIMEZONE:UTC",
  ];

  for (const race of active) {
    const time = race.time && race.time !== "00:00:00Z" ? race.time : "13:00:00Z";
    const uid = `f1-2026-r${race.round}-race@f1pulse`;

    lines.push(
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTART:${toICSDate(race.date, time)}`,
      `DTEND:${toICSDateEnd(race.date, time)}`,
      `SUMMARY:🏁 ${sanitize(race.raceName)}`,
      `DESCRIPTION:Round ${race.round} — ${sanitize(race.circuitName)}\\n${sanitize(race.country)}`,
      `LOCATION:${sanitize(race.circuitName)}, ${sanitize(race.country)}`,
      "END:VEVENT"
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
