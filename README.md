# F1 Pulse

An interactive Formula 1 companion platform built with modern web technologies. F1 Pulse delivers live race tracking, championship analytics, circuit guides, driver profiles, team information, and an educational section for new fans — designed to be a site fans *use*, not just read.

Live data is sourced from the [Jolpica F1 API](https://api.jolpi.ca/ergast/f1) (successor to the deprecated Ergast API) and the [OpenF1 API](https://openf1.org) for real-time session telemetry. Weather forecasts use the [Open-Meteo API](https://open-meteo.com).

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework with App Router, server-side rendering, and ISR |
| **React 19** | Component-based UI architecture |
| **TypeScript** | Type safety across all components and data layers |
| **Tailwind CSS 4** | Utility-first styling with responsive design |
| **Framer Motion** | Entrance animations, staggered transitions, and interactive motion |
| **D3.js** | Points progression line chart with animations and hover interactions |
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
│   ├── pit-wall/
│   │   ├── page.tsx            # Pit Wall — server component, fetches weekend/analytics data
│   │   └── loading.tsx         # Skeleton loading UI
│   ├── debrief/
│   │   ├── page.tsx            # The Debrief — static educational page
│   │   └── loading.tsx         # Skeleton loading UI
│   ├── icon.png                # Tab favicon (official F1 logo)
│   └── globals.css             # Global styles and Tailwind directives
├── components/
│   ├── Navbar.tsx              # Sticky navigation with mobile hamburger menu
│   ├── HeroSection.tsx         # Animated hero with countdown and sprint weekend badge
│   ├── CountdownTimer.tsx      # Real-time countdown clock (client component)
│   ├── StandingsTable.tsx      # Reusable standings table for drivers/constructors
│   ├── RaceResultCard.tsx      # Podium visualization for latest race results
│   ├── SeasonCalendar.tsx      # Full season schedule with progress tracking
│   ├── DriverGrid.tsx          # Driver cards grid with headshots and flags
│   ├── TeamGrid.tsx            # Expandable team panels with driver lineups
│   ├── CircuitList.tsx         # Circuit cards with track details
│   ├── F1Logo.tsx              # Official F1 logo SVG component
│   ├── PitWallContent.tsx      # Pit Wall orchestrator — session polling, layout
│   ├── RaceWeekendSchedule.tsx # Race weekend session cards with countdown timers
│   ├── WeatherForecast.tsx     # Per-day weather cards for the race weekend
│   ├── LiveSessionTracker.tsx  # Live position table, tire compounds, pit log, race control
│   ├── PointsProgressionChart.tsx # D3 animated line chart — cumulative points by driver
│   ├── ChampionshipMath.tsx    # Who can still win and what they need
│   └── DebriefContent.tsx      # Tabbed educational reference — flags, tires, terms, format
└── lib/
    ├── f1-data.ts              # Jolpica API layer, TypeScript interfaces, and team color map
    ├── openf1-data.ts          # OpenF1 API layer for live session telemetry
    ├── weather-data.ts         # Open-Meteo API for race venue forecasts
    ├── driver-data.ts          # Static driver headshot URLs (F1 media CDN)
    ├── team-data.ts            # Static team info: history, base, TP, website URLs
    └── circuit-data.ts         # Static circuit info: length, turns, DRS zones, history
```

## Pages

### Homepage — "Race Hub" ✅

The Race Hub is the central dashboard for the 2026 F1 season. A **server component** that fetches all data at request time — the page arrives fully populated with no client-side loading spinners.

Fetches five data sources in parallel via `Promise.all`: next race weekend, driver standings, constructor standings, last race results, and season calendar. Each is cached with a 1-hour revalidation window (`next: { revalidate: 3600 }`).

**Features:** Hero section with countdown to next race, sprint weekend badge, driver/constructor standings tables, latest race podium, full season calendar with cancelled race handling.

---

### Circuits — "Track Atlas" ✅

A full guide to every circuit on the 2026 calendar. The list view shows track type, length, turns, and DRS zones. Clicking a circuit opens a detail page with lap record, elevation change, a written history, notable races, and past winners at that venue.

Circuit detail pages use `generateStaticParams` to pre-render all 24 circuits at build time, with 1-hour ISR revalidation for winner data.

---

### Drivers ✅

A grid of all 22 current-season drivers sorted by championship standing. Each card shows the official F1 media CDN headshot, team color accent, current season stats, championship position, nationality flag, and age.

Client component with Framer Motion staggered entrance animations.

---

### Teams ✅

Expandable panels for all 11 constructors sorted by championship standing. Collapsed view shows position, points, drivers, wins, titles, and power unit. Expanded view shows full team details, driver lineup with standings, about/history text, and a link to the official website.

---

### Pit Wall ✅

The race weekend command center. Adapts based on whether a session is currently active.

**When a session is live** (polls OpenF1 every 10 seconds):
- Real-time position table — driver, team color, tire compound + age, pit count, last lap time
- Race control log — safety car deployments, flags, DRS, steward messages
- Pit stop log — lap number and pit duration for every stop

**When no session is active:**
- Race weekend schedule — session cards (FP1 → Race) with live countdowns, sprint weekend badge
- Weather forecast — per-day temperature and rain probability for the race venue (Open-Meteo, within 16-day window)
- Points progression chart — animated D3 line chart, top 8 drivers, colored by team, hover tooltips
- Championship math — every driver's current points, deficit to the leader, max possible points, and eliminated status

Session detection runs every 30 seconds client-side via the OpenF1 API, automatically switching between the live and off-race layouts.

---

### The Debrief ✅

An educational reference for fans who are new to Formula 1. Tabbed layout with expandable cards — tap any item to read a plain-English explanation.

**Tabs:**
- **Flags** — all 8 flag types with accurate visual representations (solid colors, checkered pattern, diagonal B&W)
- **Tires** — all 5 Pirelli compounds with Pirelli-style compound badges (S/M/H/I/W)
- **Terms** — 10 common F1 terms: undercut, overcut, DRS, VSC, safety car, graining, and more
- **Race Weekend** — FP1 through Race explained, including sprint weekend format
- **Points & Championships** — full points table, Drivers vs Constructors championship explainer

---

## Data Layer

### Jolpica API Functions (`src/lib/f1-data.ts`)

| Function | Endpoint | Returns |
|---|---|---|
| `getNextRaceWeekend()` | `/current/next.json` | Next race with all session times, lat/lon, sprint flag |
| `getDriverStandings()` | `/current/driverStandings.json` | Driver championship standings |
| `getConstructorStandings()` | `/current/constructorStandings.json` | Constructor standings |
| `getLastRaceResults()` | `/current/last/results.json` | Latest race top 10 + fastest lap |
| `getSeasonCalendar()` | `/current.json` + `/current/results/1.json` | Full schedule with winners |
| `getDriversWithDetails()` | `/current/driverStandings.json` | Full driver profiles for the grid |
| `getTeamsWithDrivers()` | `/current/constructorStandings.json` + `/current/driverStandings.json` | Constructor standings with driver lineups |
| `getCircuits()` | `/current/circuits.json` + `/current.json` | All circuits with schedule data |
| `getCircuitById()` | — | Single circuit detail (from cached list) |
| `getCircuitWinners()` | `/circuits/{id}/results/1.json` | All-time race winners at a circuit |
| `getSeasonPointsProgression()` | `/current/results.json` | Cumulative points per driver per round |
| `getChampionshipMath()` | — (derived) | Remaining races, max points available, contender status |

### OpenF1 API Functions (`src/lib/openf1-data.ts`)

| Function | Endpoint | Returns |
|---|---|---|
| `getLatestSession()` | `/sessions?session_key=latest` | Most recent session metadata |
| `getLiveSessionData()` | `/drivers`, `/position`, `/stints`, `/pit`, `/laps`, `/race_control` | Full live session snapshot |
| `isSessionLive()` | — | Whether a session is currently in progress |

### Weather (`src/lib/weather-data.ts`)

| Function | Endpoint | Returns |
|---|---|---|
| `getRaceWeekendWeather()` | Open-Meteo `/v1/forecast` | Per-day max/min temp, precipitation probability, weather code |

### Static Data Files

- `driver-data.ts` — maps driver IDs to official F1 media CDN headshot URLs
- `team-data.ts` — team history, base, principal, power unit, and website for all 11 constructors
- `circuit-data.ts` — circuit length, turns, DRS zones, laps, lap records, elevation, and history for all 24 circuits

### Team Colors

`TEAM_COLORS` maps every 2026 constructor name to their official hex color, used consistently across standings tables, race results, driver cards, team panels, and the points progression chart.

---

## Design Decisions

- **Dark theme throughout** — matches the premium feel of F1's own branding and suits a data-heavy dashboard
- **Server-side rendering + ISR** — pages load fully rendered with 1-hour cache revalidation, fast for users and good for SEO
- **Parallel API calls** — all data sources fetched simultaneously with `Promise.all` to minimise load time
- **Static + dynamic split** — time-sensitive data (standings, results) comes from the API; stable data (circuit history, team info, driver headshots) lives in static TypeScript files to avoid unnecessary API calls
- **Client-side polling for live data** — OpenF1 session detection runs every 30s; live data refreshes every 10s during an active session, without requiring a page reload
- **DOM-based tooltips on D3 chart** — tooltip state is managed via a `ref` and direct DOM manipulation rather than React state, preventing re-renders that would cause chart flickering on hover
- **Framer Motion stagger pattern** — entrance animations offset by index give pages a polished sequential reveal without complex orchestration

---

## Getting Started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Upcoming Features

- **Head-to-Head Driver Comparison** — pick any two drivers and compare stats side-by-side across the season
- **Qualifying Gap Tracker** — how far each driver is from pole each weekend, visualized over the season
- **Teammate Battle Tracker** — intra-team points comparison across all constructors
- **Race Pace vs Qualifying Split** — identify which drivers perform better on race day vs Saturday
- **Grid Picks** — pre-race prediction game with season-long accuracy tracking
