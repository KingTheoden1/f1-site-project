import type { Metadata } from "next";
import DebriefContent from "@/components/DebriefContent";

export const metadata: Metadata = {
  title: "The Debrief — F1 Pulse",
  description:
    "New to Formula 1? Learn the flags, tires, terms, race format, and everything else you need to follow a race weekend.",
};

export default function DebriefPage() {
  return <DebriefContent />;
}
