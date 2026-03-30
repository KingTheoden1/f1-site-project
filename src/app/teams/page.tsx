import { getTeamsWithDrivers } from "@/lib/f1-data";
import TeamGrid from "@/components/TeamGrid";

export const metadata = {
  title: "Teams — F1 Pulse",
  description:
    "Explore every Formula 1 team in the 2026 season. Constructor standings, driver lineups, team history, and championship stats.",
};

export default async function TeamsPage() {
  const teams = await getTeamsWithDrivers();

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <TeamGrid teams={teams} />
      </div>
    </main>
  );
}
