import Link from "next/link";

const FEATURES = [
  {
    href: "/pit-wall",
    label: "Pit Wall",
    tagline: "Race day command center.",
    description:
      "Live positions, tire strategies, pit stops, and race control — follow every session as it happens.",
    accent: "#ef4444",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    href: "/circuits",
    label: "Track Atlas",
    tagline: "Every circuit on the calendar.",
    description:
      "From Monaco to Monza. Track stats, lap records, elevation data, and every past winner at each venue.",
    accent: "#3b82f6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
  },
  {
    href: "/drivers",
    label: "Drivers",
    tagline: "The full 2026 grid.",
    description:
      "All 22 drivers, their championship standings, team pairings, and season stats in one place.",
    accent: "#22c55e",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    href: "/teams",
    label: "Teams",
    tagline: "All 11 constructors.",
    description:
      "Every team's lineup, championship standing, history, and power unit — expanded on demand.",
    accent: "#f97316",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    href: "/debrief",
    label: "The Debrief",
    tagline: "New to F1? Start here.",
    description:
      "Flags, tires, terms, race format, and the points system — explained clearly, no experience needed.",
    accent: "#a855f7",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
];

export default function ExploreSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <p className="text-xs text-zinc-600 uppercase tracking-widest mb-5">
        Explore
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {FEATURES.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="group relative rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 hover:border-zinc-700 p-5 transition-all duration-200 overflow-hidden"
          >
            {/* Accent glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at top left, ${feature.accent}08 0%, transparent 60%)`,
              }}
            />

            {/* Icon */}
            <div
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg mb-4"
              style={{
                backgroundColor: `${feature.accent}15`,
                color: feature.accent,
              }}
            >
              {feature.icon}
            </div>

            {/* Content */}
            <p className="text-sm font-bold text-white mb-0.5">{feature.label}</p>
            <p
              className="text-xs font-medium mb-2"
              style={{ color: feature.accent }}
            >
              {feature.tagline}
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed">
              {feature.description}
            </p>

            {/* Arrow */}
            <p
              className="text-xs mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-medium"
              style={{ color: feature.accent }}
            >
              Go →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
