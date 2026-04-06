import type { Metadata } from "next";
import {
  getNextRaceWeekend,
  getSeasonPointsProgression,
  getChampionshipMath,
  resolveProgressionColors,
} from "@/lib/f1-data";
import { getRaceWeekendWeather } from "@/lib/weather-data";
import PitWallContent from "@/components/PitWallContent";

export const metadata: Metadata = {
  title: "Pit Wall — F1 Pulse",
  description:
    "Live race tracker. Follow sessions in real time — positions, tire strategies, pit stops, and race control messages.",
};

export default async function PitWallPage() {
  const weekend = await getNextRaceWeekend();

  const sessionDates = weekend?.sessions.map((s) => s.date) ?? [];

  const [rawProgressions, championshipMath, forecasts] = await Promise.all([
    getSeasonPointsProgression(),
    getChampionshipMath(),
    weekend
      ? getRaceWeekendWeather(weekend.lat, weekend.lon, sessionDates)
      : Promise.resolve([]),
  ]);

  const progressions = resolveProgressionColors(rawProgressions);

  return (
    <PitWallContent
      weekend={weekend}
      progressions={progressions}
      championshipMath={championshipMath}
      forecasts={forecasts}
    />
  );
}
