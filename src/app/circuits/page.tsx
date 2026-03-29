import type { Metadata } from "next";
import { getCircuits } from "@/lib/f1-data";
import CircuitGrid from "@/components/CircuitGrid";

export const metadata: Metadata = {
  title: "Track Atlas — F1 Pulse",
  description:
    "Browse every circuit on the 2026 F1 calendar. Track stats, history, notable races, and more.",
};

export default async function CircuitsPage() {
  const circuits = await getCircuits();

  return <CircuitGrid circuits={circuits} />;
}
