# F1 Pulse

An interactive Formula 1 companion platform built with modern web technologies. F1 Pulse delivers live championship data, race countdowns, and visual analytics — designed to be a site fans *use*, not just read.

Live data is sourced from the [Jolpica F1 API](https://api.jolpi.ca/ergast/f1), the successor to the deprecated Ergast API.

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework with App Router, server-side rendering, and API route support |
| **React 19** | Component-based UI architecture |
| **TypeScript** | Type safety across all components and data layers |
| **Tailwind CSS 4** | Utility-first styling with responsive design |
| **Framer Motion** | Entrance animations, staggered transitions, and interactive motion |
| **D3.js** | Data visualization (used in upcoming pages) |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Navbar, footer, and global config
│   ├── page.tsx            # Homepage (Race Hub) — server component
│   └── globals.css         # Global styles and Tailwind directives
├── components/
│   ├── Navbar.tsx           # Sticky navigation with mobile hamburger menu
│   ├── HeroSection.tsx      # Animated hero with countdown to next race
│   ├── CountdownTimer.tsx   # Real-time countdown clock (client component)
│   ├── StandingsTable.tsx   # Reusable standings table for drivers/constructors
│   ├── RaceResultCard.tsx   # Podium visualization for latest race results
│   └── SeasonCalendar.tsx   # Full season schedule with progress tracking
└── lib/
    └── f1-data.ts           # API layer, TypeScript interfaces, and team color map
```

## Pages

### Homepage — "Race Hub" (Completed)

The Race Hub serves as the central dashboard for the 2026 F1 season. It is a **server component** that fetches all data at request time using Next.js server-side rendering, meaning the page arrives fully populated — no loading spinners or client-side fetching.

#### How It Works

**Data Fetching (Server-Side)**

The homepage (`src/app/page.tsx`) is an `async` server component. On each request, it calls five data functions in parallel using `Promise.all`:

```typescript
const [nextRace, driverStandings, constructorStandings, lastRace, seasonCalendar] =
  await Promise.all([
    getNextRace(),
    getDriverStandings(),
    getConstructorStandings(),
    getLastRaceResults(),
    getSeasonCalendar(),
  ]);
```

Each function fetches from the Jolpica F1 API and is cached with a 1-hour revalidation window (`next: { revalidate: 3600 }`), meaning the data stays fresh without hammering the API on every page load.

All API responses are transformed from the raw JSON structure into clean TypeScript interfaces (`Race`, `DriverStanding`, `ConstructorStanding`, `RaceResult`, `SeasonRace`) defined in `src/lib/f1-data.ts`. This gives type safety throughout the component tree and makes the data predictable to work with.

**Layout Architecture**

The main content uses a responsive CSS Grid layout:
- **Desktop (lg+):** 3-column grid — Driver Standings and Season Calendar span the left 2 columns, Latest Race Result and Constructor Standings sit in a sidebar on the right
- **Mobile:** Single column, all sections stacked vertically

This is handled with Tailwind's `grid-cols-1 lg:grid-cols-3` and `lg:col-span-2` utilities.

#### Component Breakdown

**Navbar** (`src/components/Navbar.tsx`)
- Sticky positioning with backdrop blur effect (`bg-zinc-950/90 backdrop-blur-md`)
- Desktop navigation links rendered from a `navLinks` array for easy maintenance
- Mobile: hamburger menu toggle with animated expand/collapse using Framer Motion's `AnimatePresence`
- Links: Race Hub, Circuits, Drivers, Teams, Strategy Room

**Hero Section** (`src/components/HeroSection.tsx`)
- Client component (requires Framer Motion)
- Animated background: subtle CSS grid pattern at 3% opacity creates a technical aesthetic
- Red accent glow: a blurred `div` positioned behind the content for depth
- Staggered entrance animations on the season badge, title, tagline, and countdown — each delayed by 100ms
- Title uses a red gradient (`bg-gradient-to-r from-red-500 to-red-600`) with `bg-clip-text` to make the "PULSE" text appear as a gradient
- Displays the next race name, circuit, country, and round number pulled from the API

**Countdown Timer** (`src/components/CountdownTimer.tsx`)
- Client component using `useState` and `useEffect` for real-time updates
- Calculates the difference between now and the target race datetime, then breaks it into days, hours, minutes, and seconds
- Updates every second via `setInterval`, cleaned up on unmount with the `useEffect` return function
- Each time block animates on value change using Framer Motion's `key` prop — when the number changes, the old one exits and the new one slides in
- Initializes as `null` to avoid hydration mismatches between server and client (server doesn't know the current time)

**Standings Table** (`src/components/StandingsTable.tsx`)
- Accepts a `type` prop of either `"drivers"` or `"constructors"`, which controls column visibility and data mapping
- Uses TypeScript discriminated unions (`DriverStandingsProps | ConstructorStandingsProps`) for type-safe prop handling
- Each row has a colored position indicator bar using the team's official color from the `TEAM_COLORS` map
- Rows animate in with a staggered delay (`delay: i * 0.05`) using Framer Motion
- Shows top 10 entries only
- Responsive: the Team column is hidden on mobile for driver standings (`hidden sm:table-cell`)

**Race Result Card** (`src/components/RaceResultCard.tsx`)
- Visualizes the latest race result with a podium graphic and full top-10 list
- The podium uses three `PodiumCard` sub-components arranged in P2-P1-P3 order (1st in the center, tallest) using CSS `order`
- Each podium block has a gradient background using the driver's team color at low opacity, with a solid top border
- The remaining P4–P10 results are listed below with compact rows showing position, team color indicator, driver name, finishing time/status, and a fastest lap badge (purple "FL" indicator) when applicable
- Entrance animations are staggered based on podium position order

**Season Calendar** (`src/components/SeasonCalendar.tsx`)
- Displays the complete 2026 season schedule (24 races including 2 cancelled)
- Animated progress bar shows season completion percentage (only counts active races)
- Each race row shows: round number, status dot, race name, country, and date
- Status dot colors: green (completed), red with pulse animation (next race), gray (upcoming), dimmed gray (cancelled)
- Cancelled races (Bahrain GP, Saudi Arabian GP) display with strikethrough text, reduced opacity, and a red "CANCELLED" label
- Scrollable container with `max-h-[400px]` to keep the layout balanced
- Cancelled races are hardcoded and merged with API data chronologically, then round numbers are reassigned sequentially

#### Data Layer

**API Functions** (`src/lib/f1-data.ts`)

| Function | Endpoint | Returns |
|---|---|---|
| `getNextRace()` | `/current/next.json` | Next scheduled race (name, circuit, date, time) |
| `getDriverStandings()` | `/current/driverStandings.json` | Current driver championship standings |
| `getConstructorStandings()` | `/current/constructorStandings.json` | Current constructor championship standings |
| `getLastRaceResults()` | `/current/last/results.json` | Most recent race results (top 10) with fastest lap |
| `getSeasonCalendar()` | `/current.json` | Full season schedule merged with cancelled race data |

**Team Colors Map**

A `TEAM_COLORS` constant maps every 2026 team name to their official hex color code. This is used across multiple components (standings tables, race results, podium cards) to maintain visual consistency with actual F1 branding. Includes all 10 teams plus alternate names (e.g., both "Racing Bulls" and "RB F1 Team" map to `#6692FF`).

## Design Decisions

- **Dark theme throughout** — matches the premium feel of F1's own branding and is easier on the eyes for a data-heavy dashboard
- **Server-side data fetching** — the page loads fully rendered, which is faster for the user and better for SEO compared to client-side fetching
- **Parallel API calls** — all five data sources are fetched simultaneously with `Promise.all`, reducing total load time versus sequential requests
- **Component reuse** — `StandingsTable` handles both driver and constructor standings through a discriminated union type pattern, avoiding code duplication
- **Framer Motion stagger pattern** — entrance animations are offset by index (`delay: i * 0.05`), giving the page a polished, sequential reveal without requiring complex orchestration
- **Responsive-first design** — every component adapts from mobile to desktop using Tailwind breakpoint utilities, not separate mobile/desktop components

## Getting Started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Upcoming Pages

- **Circuits — "Track Atlas"** — Interactive circuit maps with historical stats and side-by-side comparisons
- **Drivers & Teams — "Performance Lab"** — Career profiles, performance charts, and head-to-head driver comparisons
- **Race Dashboard — "Strategy Room"** — Lap-by-lap race replays with pit stop timelines and tire strategy visualization
- **Predictor — "Grid Picks"** — Pre-race prediction game with season-long accuracy tracking
