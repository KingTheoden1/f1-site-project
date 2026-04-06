import type { Metadata } from "next";
import { getNextRaceWeekend } from "@/lib/f1-data";
import PitWallContent from "@/components/PitWallContent";

export const metadata: Metadata = {
  title: "Pit Wall — F1 Pulse",
  description:
    "Live race tracker. Follow sessions in real time — positions, tire strategies, pit stops, and race control messages.",
};

export default async function PitWallPage() {
  const weekend = await getNextRaceWeekend();

  return <PitWallContent weekend={weekend} />;
}
