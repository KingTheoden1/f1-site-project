"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import "flag-icons/css/flag-icons.min.css";
import { TEAM_COLORS, type DriverWithDetails } from "@/lib/f1-data";
import { DRIVER_DATA } from "@/lib/driver-data";

interface DriverGridProps {
  drivers: DriverWithDetails[];
}

const NATIONALITY_FLAGS: Record<string, string> = {
  British: "gb",
  Dutch: "nl",
  Spanish: "es",
  Monegasque: "mc",
  Australian: "au",
  German: "de",
  Finnish: "fi",
  French: "fr",
  Mexican: "mx",
  Canadian: "ca",
  Thai: "th",
  Japanese: "jp",
  "New Zealander": "nz",
  Italian: "it",
  Argentine: "ar",
  Brazilian: "br",
  Chinese: "cn",
  American: "us",
  Danish: "dk",
};

function calculateAge(dob: string): number {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function StatBadge({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-zinc-950/80 backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-center">
      <div className="text-[10px] uppercase tracking-wider text-zinc-400">
        {label}
      </div>
      <div className="text-lg font-bold text-white font-mono leading-tight">
        {value}
      </div>
    </div>
  );
}

function DriverCard({
  driver,
  index,
}: {
  driver: DriverWithDetails;
  index: number;
}) {
  const color = TEAM_COLORS[driver.team] || "#666";
  const staticData = DRIVER_DATA[driver.driverId];
  const imageUrl = staticData?.imageUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 + 0.2 }}
    >
      <div className="group block rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden hover:border-zinc-600 transition-all duration-300 hover:shadow-lg hover:shadow-black/20">
        {/* Team color top accent */}
        <div className="h-1" style={{ backgroundColor: color }} />

        {/* Card body */}
        <div className="relative">
          {/* Stats overlay - top corners */}
          <div className="absolute top-0 left-0 right-0 z-10 flex justify-between p-3">
            <StatBadge
              label="Wins"
              value={driver.wins.toString().padStart(2, "0")}
            />
            <StatBadge label="Points" value={driver.points} />
          </div>

          {/* Driver image */}
          <div
            className="relative h-52 sm:h-60 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${color}15 0%, transparent 50%, ${color}08 100%)`,
            }}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={driver.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-7xl font-bold font-mono opacity-20"
                  style={{ color }}
                >
                  {driver.number}
                </span>
              </div>
            )}

            {/* Gradient fade at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-900 to-transparent" />

            {/* Position badge */}
            <div
              className="absolute bottom-3 left-3 text-3xl font-black font-mono"
              style={{ color }}
            >
              P{driver.position}
            </div>

            {/* Number badge */}
            <div className="absolute bottom-3 right-3 text-2xl font-bold font-mono text-white/20">
              #{driver.number}
            </div>
          </div>

          {/* Driver info */}
          <div className="p-4">
            <h2 className="text-xl font-bold text-white leading-tight uppercase tracking-wide">
              {driver.familyName}
            </h2>
            <p className="text-sm text-zinc-400 mb-3">{driver.givenName}</p>

            {/* Team + details */}
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm text-zinc-300 truncate">
                {driver.team}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span className="inline-flex items-center gap-1.5">
                {NATIONALITY_FLAGS[driver.nationality] && (
                  <span className={`fi fi-${NATIONALITY_FLAGS[driver.nationality]} rounded-sm`} />
                )}
                {driver.nationality}
              </span>
              {driver.dateOfBirth && (
                <span>Age {calculateAge(driver.dateOfBirth)}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DriverGrid({ drivers }: DriverGridProps) {
  return (
    <div>
      {/* Page header */}
      <div className="mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-bold text-white mb-3"
        >
          Drivers
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 text-lg"
        >
          The {drivers.length} drivers competing in the{" "}
          {new Date().getFullYear()} FIA Formula One World Championship
        </motion.p>
      </div>

      {/* Driver cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {drivers.map((driver, i) => (
          <DriverCard
            key={driver.driverId}
            driver={driver}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
