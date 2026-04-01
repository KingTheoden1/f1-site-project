# F1 Pulse

An interactive Formula 1 companion platform built with modern web technologies. F1 Pulse delivers live championship data, race countdowns, circuit guides, driver profiles, and team information — designed to be a site fans *use*, not just read.

Live data is sourced from the [Jolpica F1 API](https://api.jolpi.ca/ergast/f1), the successor to the deprecated Ergast API.

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework with App Router, server-side rendering, and ISR |
| **React 19** | Component-based UI architecture |
| **TypeScript** | Type safety across all components and data layers |
| **Tailwind CSS 4** | Utility-first styling with responsive design |
| **Framer Motion** | Entrance animations, staggered transitions, and interactive motion |
| **flag-icons** | CSS-based country flag icons for driver nationalities |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Navbar, footer, fonts, and global config
│   ├── page.tsx                # Homepage (Race Hub) — server component
│   ├── drivers/
│   │   ├── page.tsx            # Drivers page — server component
│   │   └── loading.tsx         # Skeleton loading UI
│   ├── teams/
│   │   ├── page.tsx            # Teams page — server component
│   │   └── loading.tsx         # Skeleton loading UI
│   ├── circuits/
│   │   ├── page.tsx            # Circuit list — server component
│   │   ├── loading.tsx         # Skeleton loading UI
│   │   └── [id]/
│   │       └── page.tsx        # Individual circuit detail page
│   ├── icon.png                # Tab favicon (official F1 logo)
│   └── globals.css             # Global styles and Tailwind directives
├── components/
│   ├── Navbar.tsx              # Sticky navigation with mobile hamburger menu
│   ├── HeroSection.tsx         # Animated hero with countdown to next race
│   ├── CountdownTimer.tsx      # Real-time countdown clock (client component)
│   ├── StandingsTable.tsx      # Reusable standings table for drivers/constructors
│   ├── RaceResultCard.tsx      # Podium visualization for latest race results
│   ├── SeasonCalendar.tsx      # Full season schedule with progress tracking
│   ├── DriverGrid.tsx          # Driver cards grid with headshots and flags
│   ├── TeamGrid.tsx            # Expandable team panels with driver lineups
│   ├── CircuitList.tsx         # Circuit cards with track details
│   └── F1Logo.tsx              # Official F1 logo SVG component
└── lib/
    ├── f1-data.ts              # API layer, TypeScript interfaces, and team color map
    ├── driver-data.ts          # Static driver headshot URLs (F1 media CDN)
    ├── team-data.ts            # Static team info: history, base, TP, website URLs
    └── circuit-data.ts         # Static circuit info: length, turns, DRS zones, history
```

## Pages

### Homepage — "Race Hub" ✅

The Race Hub is the central dashboard for the 2026 F1 season. A **server component** that fetches all data at request time — the page arrives fully populated with no client-side loading spinners.

Fetches five data sources in parallel via `Promise.all`: next race, driver standings, constructor standings, last race results, and season calendar. Each is cached with a 1-hour revalidation window (`next: { revalidate: 3600 }`).

**Components:** Hero with countdown, driver/constructor standings tables, latest race podium, full season calendar with cancelled race handling.

---

### Circuits — "Track Atlas" ✅

A full guide to every circuit on the 2026 calendar. The list view shows track type, length, turns, and DRS zones. Clicking a circuit opens a detail page with lap record, elevation change, a written history, notable races, and past winners at that venue.

Circuit detail pages use `generateStaticParams` to pre-render all 24 circuits at build time, with 1-hour ISR revalidation for winner data.

**Components:** `CircuitList.tsx` — card grid with track metadata. Dynamic `[id]` pages pull winner history from the API.

---

### Drivers ✅

A grid of all 22 current-season drivers sorted by championship standing. Each card shows:
- Official driver headshot from the F1 media CDN
- Team color accent bar
- Current season wins and points
- Championship position
- Nationality flag (via `flag-icons` CSS library) and age

**Components:** `DriverGrid.tsx` — client component with Framer Motion staggered entrance animations. Driver headshots are served via Next.js `Image` with the `media.formula1.com` remote pattern configured.

---

### Teams ✅

Expandable panels for all 11 constructors, sorted by championship standing. The collapsed view shows position, points, drivers, wins, titles, power unit, and founding year. Expanding a panel reveals:
- Full team details (principal, base, nationality)
- Driver lineup with current standings
- About and history text
- Link to the team's official website

**Components:** `TeamGrid.tsx` — client component with accordion-style expand/collapse via Framer Motion.

---

## Data Layer

**API Functions** (`src/lib/f1-data.ts`)

| Function | Endpoint | Returns |
|---|---|---|
| `getNextRace()` | `/current/next.json` | Next scheduled race |
| `getDriverStandings()` | `/current/driverStandings.json` | Driver championship standings |
| `getConstructorStandings()` | `/current/constructorStandings.json` | Constructor standings |
| `getLastRaceResults()` | `/current/last/results.json` | Latest race top 10 + fastest lap |
| `getSeasonCalendar()` | `/current.json` + `/current/results/1.json` | Full schedule with winners |
| `getDriversWithDetails()` | `/current/driverStandings.json` | Full driver profiles for the grid |
| `getTeamsWithDrivers()` | `/current/constructorStandings.json` + `/current/driverStandings.json` | Constructor standings with driver lineups |
| `getCircuits()` | `/current/circuits.json` + `/current.json` | All circuits with schedule data |
| `getCircuitById()` | — | Single circuit detail (from cached list) |
| `getCircuitWinners()` | `/circuits/{id}/results/1.json` | All-time race winners at a circuit |

**Static Data Files**

- `driver-data.ts` — maps driver IDs to their official F1 media CDN headshot URLs
- `team-data.ts` — stores team history, base location, team principal, power unit, and official website URL for all 11 constructors
- `circuit-data.ts` — stores circuit length, turns, DRS zones, laps, lap records, elevation change, and written history for all 24 circuits

**Team Colors**

`TEAM_COLORS` maps every 2026 constructor name to their official hex color, used consistently across standings tables, race results, driver cards, and team panels.

## Design Decisions

- **Dark theme throughout** — matches the premium feel of F1's own branding and suits a data-heavy dashboard
- **Server-side rendering + ISR** — pages load fully rendered with 1-hour cache revalidation, fast for users and good for SEO
- **Parallel API calls** — all data sources fetched simultaneously with `Promise.all` to minimize load time
- **Static + dynamic split** — time-sensitive data (standings, results) comes from the API; stable data (circuit history, team info, driver headshots) lives in static TypeScript files to avoid unnecessary API calls
- **Framer Motion stagger pattern** — entrance animations offset by index give pages a polished sequential reveal without complex orchestration

## Getting Started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Upcoming Pages

- **Strategy Room** — Lap-by-lap race replays with pit stop timelines and tire strategy visualization
- **Grid Picks** — Pre-race prediction game with season-long accuracy tracking
