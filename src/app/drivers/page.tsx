import { getDriversWithDetails } from "@/lib/f1-data";
import DriverGrid from "@/components/DriverGrid";

export const metadata = {
  title: "Drivers — F1 Pulse",
  description:
    "Every Formula 1 driver in the 2026 season. Championship standings, team pairings, and driver stats.",
};

export default async function DriversPage() {
  const drivers = await getDriversWithDetails();

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <DriverGrid drivers={drivers} />
      </div>
    </main>
  );
}
