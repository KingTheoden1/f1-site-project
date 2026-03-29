import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import {
  getCircuits,
  getCircuitById,
  getCircuitWinners,
} from "@/lib/f1-data";
import CircuitDetailContent from "@/components/CircuitDetailContent";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const circuit = await getCircuitById(id);

  if (!circuit) {
    return { title: "Circuit Not Found — F1 Pulse" };
  }

  return {
    title: `${circuit.raceName || circuit.circuitName} — F1 Pulse`,
    description: circuit.description || `Explore ${circuit.circuitName} — stats, history, and notable races.`,
  };
}

export async function generateStaticParams() {
  const circuits = await getCircuits();
  return circuits.map((c) => ({ id: c.circuitId }));
}

export default async function CircuitDetailPage({ params }: Props) {
  const { id } = await params;
  const [circuit, winners] = await Promise.all([
    getCircuitById(id),
    getCircuitWinners(id),
  ]);

  if (!circuit) notFound();

  return <CircuitDetailContent circuit={circuit} winners={winners} />;
}
