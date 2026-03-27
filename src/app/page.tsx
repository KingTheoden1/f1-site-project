import HeroSection from "@/components/HeroSection";
import StandingsTable from "@/components/StandingsTable";
import RaceResultCard from "@/components/RaceResultCard";
import {
  getNextRace,
  getDriverStandings,
  getConstructorStandings,
  getLastRaceResults,
} from "@/lib/f1-data";

export default async function Home() {
  const [nextRace, driverStandings, constructorStandings, lastRace] =
    await Promise.all([
      getNextRace(),
      getDriverStandings(),
      getConstructorStandings(),
      getLastRaceResults(),
    ]);

  return (
    <div>
      {/* Hero with countdown */}
      <HeroSection nextRace={nextRace} />

      {/* Main content grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Driver Standings - takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                Driver Standings
              </h2>
              <span className="text-xs text-zinc-600 uppercase tracking-widest">
                2026 Season
              </span>
            </div>
            <StandingsTable type="drivers" standings={driverStandings} />
          </div>

          {/* Sidebar - Last Race + Constructor Standings */}
          <div className="space-y-8">
            {lastRace && (
              <RaceResultCard
                raceName={lastRace.raceName}
                results={lastRace.results}
              />
            )}

            <div>
              <h2 className="text-xl font-bold text-white mb-4">
                Constructor Standings
              </h2>
              <StandingsTable
                type="constructors"
                standings={constructorStandings}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
