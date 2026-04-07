"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type FlagType = "solid" | "checkered" | "bw" | "black";

interface CardItem {
  label: string;
  color?: string;
  flagType?: FlagType;
  tireCompound?: string;
  description: string;
  detail?: string;
}

// ─── Flag visual ──────────────────────────────────────────────────────────────

function FlagVisual({ flagType, color }: { flagType: FlagType; color?: string }) {
  const base = "w-12 h-8 rounded-sm flex-shrink-0 overflow-hidden";

  if (flagType === "checkered") {
    return (
      <div
        className={base}
        style={{
          backgroundImage:
            "repeating-conic-gradient(#e5e5e5 0% 25%, #18181b 0% 50%)",
          backgroundSize: "10px 10px",
          outline: "1px solid #3f3f46",
        }}
      />
    );
  }

  if (flagType === "bw") {
    return (
      <div
        className={base}
        style={{
          background: "linear-gradient(135deg, #18181b 50%, #e5e5e5 50%)",
          outline: "1px solid #3f3f46",
        }}
      />
    );
  }

  if (flagType === "black") {
    return (
      <div
        className={base}
        style={{ backgroundColor: "#18181b", outline: "1px solid #3f3f46" }}
      />
    );
  }

  // solid
  return (
    <div
      className={base}
      style={{ backgroundColor: color, outline: "1px solid rgba(0,0,0,0.3)" }}
    />
  );
}

// ─── Tire visual ──────────────────────────────────────────────────────────────

function TireVisual({ compound, color }: { compound: string; color: string }) {
  return (
    <div className="relative w-11 h-11 flex-shrink-0">
      {/* Outer tyre */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: "#27272a" }}
      />
      {/* Coloured sidewall band */}
      <div
        className="absolute inset-[3px] rounded-full"
        style={{ backgroundColor: color, opacity: 0.25 }}
      />
      <div
        className="absolute inset-[3px] rounded-full border-[3px]"
        style={{ borderColor: color }}
      />
      {/* Inner rim */}
      <div className="absolute inset-[10px] rounded-full bg-zinc-950 flex items-center justify-center">
        <span
          className="text-[11px] font-black leading-none"
          style={{ color }}
        >
          {compound}
        </span>
      </div>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, subtitle, children }: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {subtitle && <p className="text-zinc-500 text-sm mt-1">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

// ─── Expandable card ──────────────────────────────────────────────────────────

function InfoCard({ item }: { item: CardItem }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-150 overflow-hidden"
    >
      <div className="px-4 py-3 flex items-center gap-3">
        {item.flagType && (
          <FlagVisual flagType={item.flagType} color={item.color} />
        )}
        {item.tireCompound && item.color && (
          <TireVisual compound={item.tireCompound} color={item.color} />
        )}
        {!item.flagType && !item.tireCompound && item.color && (
          <span
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: item.color }}
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">{item.label}</p>
          <p className="text-xs text-zinc-500 mt-0.5 leading-snug">{item.description}</p>
        </div>
        <svg
          className={`w-4 h-4 text-zinc-600 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {open && item.detail && (
        <div className="px-4 pb-4 pt-1 border-t border-zinc-800/60">
          <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
        </div>
      )}
    </button>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const FLAGS: CardItem[] = [
  {
    label: "Green Flag",
    color: "#22c55e",
    flagType: "solid",
    description: "Track is clear. Go racing.",
    detail: "Shown at the start of a session or after a hazard has been cleared. Drivers can push to full speed.",
  },
  {
    label: "Yellow Flag",
    color: "#eab308",
    flagType: "solid",
    description: "Hazard ahead. No overtaking.",
    detail: "Shown when there's danger on or near the track — a crash, a car stopped, or debris. Drivers must slow down and cannot overtake in the yellow zone. A double yellow means the hazard is more serious and drivers must be prepared to stop.",
  },
  {
    label: "Red Flag",
    color: "#ef4444",
    flagType: "solid",
    description: "Session stopped immediately.",
    detail: "Shown when conditions are too dangerous to continue — a serious crash, heavy rain, or debris across the track. All cars must slow down and return to the pit lane. In a race, the results may be taken from the last completed lap.",
  },
  {
    label: "Blue Flag",
    color: "#3b82f6",
    flagType: "solid",
    description: "A faster car is about to lap you.",
    detail: "Shown to a driver who is about to be lapped by the race leader. They must let the faster car past within three blue flags, or they risk a penalty. This is why you'll sometimes see the leader seemingly 'catch' a slower car mid-race.",
  },
  {
    label: "White Flag",
    color: "#e5e5e5",
    flagType: "solid",
    description: "Slow car on track ahead.",
    detail: "Usually signals a slow-moving vehicle — a safety car, a medical car, or a car limping back to the pits. Drivers should be cautious.",
  },
  {
    label: "Black & White Flag",
    flagType: "bw",
    description: "Official warning for unsporting behavior.",
    detail: "Shown alongside a driver's number. It's a formal warning — one more infringement and a penalty is likely. Common for track limits violations or aggressive driving.",
  },
  {
    label: "Black Flag",
    flagType: "black",
    description: "Driver must return to the pits immediately.",
    detail: "The most serious flag shown to an individual driver. It means disqualification from the race — either for a serious rules violation or a dangerous car condition. Rare but decisive.",
  },
  {
    label: "Chequered Flag",
    flagType: "checkered",
    description: "Session over.",
    detail: "Waved at the finish line when the leader crosses it to end the race. All other drivers complete their current lap and then the session ends. It's the most iconic symbol in motorsport.",
  },
];

const TIRES: CardItem[] = [
  {
    label: "Soft (S)",
    color: "#ff3333",
    tireCompound: "S",
    description: "Fastest, but wears out quickest.",
    detail: "The softest rubber compound — it heats up fast and gives maximum grip, making it the go-to for qualifying. In a race, most drivers avoid running it for long because it degrades quickly and loses performance. Great for short stints or when you need to set a fast lap immediately.",
  },
  {
    label: "Medium (M)",
    color: "#ffd700",
    tireCompound: "M",
    description: "The balanced option.",
    detail: "A middle ground between grip and durability. Used heavily in races as a 'bridge' compound — not as fast as the soft, but lasts considerably longer. Often the default choice for longer stints and is usually what teams base their strategy around.",
  },
  {
    label: "Hard (H)",
    color: "#e5e5e5",
    tireCompound: "H",
    description: "Slowest, but lasts the longest.",
    detail: "The most durable compound. Takes longer to warm up and never provides peak grip, but a driver can run it for many more laps without stopping. Teams use it when they want to minimise pit stops — sometimes one team will run a hard for 40+ laps while others stop twice.",
  },
  {
    label: "Intermediate (I)",
    color: "#22c55e",
    tireCompound: "I",
    description: "Light rain or a drying track.",
    detail: "A grooved wet-weather tire used when the track is damp but not fully wet — after rain has stopped but the surface hasn't fully dried, or during light drizzle. Getting the timing right between inters and slicks (dry tires) is one of the most strategic calls in motorsport.",
  },
  {
    label: "Wet (W)",
    color: "#3b82f6",
    tireCompound: "W",
    description: "Heavy rain. Maximum water clearance.",
    detail: "The extreme wet tire, used only in heavy rain. Each tire can clear 65 litres of water per second. Much slower than dry tires on a dry surface — so teams switch off them the moment the track starts drying. If a driver stays on wets too long on a drying track, they lose enormous amounts of time.",
  },
];

const TERMS: CardItem[] = [
  {
    label: "Undercut",
    description: "Pit early to jump a rival.",
    detail: "When your car is stuck behind someone, you pit a lap or two before them. On fresh tires, you drive faster lap times and come out ahead when they eventually pit too. It works when new tires give a big enough speed advantage to make up the time lost in the pit lane.",
  },
  {
    label: "Overcut",
    description: "Stay out longer to jump a rival.",
    detail: "The opposite of the undercut. You stay on track while your rival pits, banking on being able to go faster on your older tires (sometimes possible when tires are still performing well) or gaining track position. Works best when the pit lane is slow or when tires degrade less than expected.",
  },
  {
    label: "DRS",
    description: "Drag Reduction System — a movable rear wing flap.",
    detail: "When a driver is within one second of the car ahead at a designated DRS detection point, they can open a flap in their rear wing on the following straight. This reduces aerodynamic drag and adds around 10-15 km/h of top speed, making overtaking much easier. It's only available in specific zones on each track.",
  },
  {
    label: "Delta",
    description: "The time gap between a driver and a reference time.",
    detail: "You'll hear 'the delta' during safety cars. Drivers must stay above a minimum lap time to avoid overtaking under yellow flag conditions. If they go faster than the delta, they get a penalty. It essentially sets a speed limit during caution periods.",
  },
  {
    label: "VSC",
    description: "Virtual Safety Car — a speed limit without a physical car.",
    detail: "When there's a hazard that needs attention but not full neutralisation, the VSC is deployed. All drivers must drive at a set minimum time per sector (around 40% slower). Unlike a real safety car, drivers can be spread across the track — their gaps are broadly preserved. Teams often pit under VSC to minimise time lost.",
  },
  {
    label: "Safety Car (SC)",
    description: "A physical car leads the field at reduced speed.",
    detail: "When there's a serious incident, a Mercedes AMG safety car joins the track ahead of the race leader. All other cars must line up behind it in race order. This bunches the field together — which is why races get exciting again after a safety car. Teams scramble to pit during this period since everyone is slow anyway.",
  },
  {
    label: "Graining",
    description: "Torn rubber on the tire surface causing a loss of grip.",
    detail: "When a tire doesn't reach its optimal temperature quickly enough, the rubber tears in small chunks rather than wearing smoothly. The driver experiences sudden understeer or oversteer and slower lap times. It usually clears after several laps as the surface wears down, but it can cost significant time.",
  },
  {
    label: "Snap Oversteer",
    description: "The rear of the car suddenly loses grip.",
    detail: "When a driver turns in and the rear snaps out unexpectedly — you'll see them catch it with a big steering correction. Common when pushing too hard on cold tires, or when the car setup is very aggressive. The opposite of understeer, where the front doesn't turn enough.",
  },
  {
    label: "Parc Fermé",
    description: "Cars are sealed and cannot be worked on.",
    detail: "From the end of qualifying until the race start, teams cannot make significant changes to the car. This locks in the setup — so if a team makes a strategic gamble in qualifying (like fitting the soft tire to start the race), they're committed to it.",
  },
  {
    label: "DNF",
    description: "Did Not Finish.",
    detail: "A driver who retires from the race — mechanical failure, crash, or driver error. In a championship battle, a DNF can be catastrophic since a rival might score 25 points while you score zero.",
  },
];

const WEEKEND: CardItem[] = [
  {
    label: "Practice 1 & 2 (FP1, FP2)",
    description: "Friday — teams gather data and set up the car.",
    detail: "The first two sessions of a race weekend, each 60 minutes long. Teams run different programs: long runs to understand tire wear, short runs to check car balance, and gathering data for engineers. Results mean nothing. FP1 is also used by teams to give rookie drivers track time.",
  },
  {
    label: "Practice 3 (FP3)",
    description: "Saturday morning — final setup before qualifying.",
    detail: "The last chance to dial in the setup before qualifying. Teams usually simulate their qualifying runs and make final adjustments. Only 60 minutes, so every lap matters. On sprint weekends, FP3 doesn't exist.",
  },
  {
    label: "Qualifying (Q1 / Q2 / Q3)",
    description: "Saturday — determines the starting grid.",
    detail: "A three-part knockout session. In Q1 (18 minutes), all 20 drivers set times — the slowest 5 are eliminated and locked into positions 16-20. Q2 eliminates the next 5 (positions 11-15). Q3 is the final 12-minute shootout for the top 10. Pole position — starting first — is one of the most coveted results in F1.",
  },
  {
    label: "The Race",
    description: "Sunday — the main event.",
    detail: "Each race is around 300 km, which usually takes 1.5 to 2 hours. Drivers must use at least two different tire compounds during the race (unless it rains). Points are awarded to the top 10 finishers: 25, 18, 15, 12, 10, 8, 6, 4, 2, 1. One bonus point goes to the driver who sets the fastest lap — but only if they finish in the top 10.",
  },
  {
    label: "Sprint Weekend",
    description: "Shortened format with a mini-race on Saturday.",
    detail: "Held at 6 circuits per season. The format changes: FP1 is the only practice, then Sprint Qualifying sets the grid for a 100km sprint race on Saturday (no championship points for qualifying itself, but points for the sprint). Sunday qualifying sets the main race grid. It compresses everything and creates more action across the weekend.",
  },
];

const SCORING: { pos: number; pts: number }[] = [
  { pos: 1, pts: 25 },
  { pos: 2, pts: 18 },
  { pos: 3, pts: 15 },
  { pos: 4, pts: 12 },
  { pos: 5, pts: 10 },
  { pos: 6, pts: 8 },
  { pos: 7, pts: 6 },
  { pos: 8, pts: 4 },
  { pos: 9, pts: 2 },
  { pos: 10, pts: 1 },
];

// ─── Scoring table ────────────────────────────────────────────────────────────

function ScoringTable() {
  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      <div className="grid grid-cols-10 divide-x divide-zinc-800">
        {SCORING.map(({ pos, pts }) => (
          <div key={pos} className="flex flex-col items-center py-4 gap-1">
            <span className={`text-xs font-semibold ${pos === 1 ? "text-yellow-400" : pos <= 3 ? "text-zinc-300" : "text-zinc-500"}`}>
              P{pos}
            </span>
            <span className="text-white font-bold tabular-nums text-sm">{pts}</span>
          </div>
        ))}
      </div>
      <div className="px-4 py-2.5 border-t border-zinc-800 bg-zinc-900/40">
        <p className="text-xs text-zinc-500">
          +1 bonus point for the fastest lap — only if the driver finishes in the top 10.
        </p>
      </div>
    </div>
  );
}

// ─── Championship explainer ───────────────────────────────────────────────────

function ChampionshipExplainer() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Drivers Championship</p>
        <p className="text-white font-semibold mb-2">Points belong to the driver.</p>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Every time a driver finishes in the top 10, they personally earn points. At the end of the season, whoever has the most points is the World Driver's Champion. It doesn't matter which team they drove for.
        </p>
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Constructors Championship</p>
        <p className="text-white font-semibold mb-2">Points belong to the team.</p>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Both drivers' points are combined into one total for the team. A team with two strong drivers can beat a team with only one. Worth hundreds of millions in prize money — which is why teams sometimes prioritise the constructors over the drivers title.
        </p>
      </div>
    </div>
  );
}

// ─── Nav tabs ─────────────────────────────────────────────────────────────────

const TABS = ["Flags", "Tires", "Terms", "Race Weekend", "Points & Championships"] as const;
type Tab = typeof TABS[number];

// ─── Main component ───────────────────────────────────────────────────────────

export default function DebriefContent() {
  const [activeTab, setActiveTab] = useState<Tab>("Flags");

  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <p className="text-xs text-zinc-600 uppercase tracking-widest mb-2">F1 Pulse</p>
          <h1 className="text-3xl sm:text-4xl font-bold italic text-white font-[family-name:var(--font-orbitron)] mb-3">
            The Debrief
          </h1>
          <p className="text-zinc-400 text-base max-w-xl">
            Everything you need to follow a race weekend — flags, tires, terms, and how it all fits together. No experience needed.
          </p>
        </div>

        {/* Tab bar */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto pb-px scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-red-500 text-white"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === "Flags" && (
          <Section
            title="Race Flags"
            subtitle="Flags communicate track conditions to drivers instantly. Here's what each one means."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FLAGS.map((item) => <InfoCard key={item.label} item={item} />)}
            </div>
          </Section>
        )}

        {activeTab === "Tires" && (
          <Section
            title="Tire Compounds"
            subtitle="Pirelli supplies five tire types. The choice of when to use each one is half the strategy of F1."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TIRES.map((item) => <InfoCard key={item.label} item={item} />)}
            </div>
            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4">
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Rule to know</p>
              <p className="text-sm text-zinc-300 leading-relaxed">
                In a dry race, every driver must use <span className="text-white font-semibold">at least two different dry compounds</span> during the race. That's why you'll always see at least one pit stop — it's mandatory, not just a choice.
              </p>
            </div>
          </Section>
        )}

        {activeTab === "Terms" && (
          <Section
            title="Common Terms"
            subtitle="Words you'll hear in commentary constantly. Tap any to expand."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TERMS.map((item) => <InfoCard key={item.label} item={item} />)}
            </div>
          </Section>
        )}

        {activeTab === "Race Weekend" && (
          <Section
            title="Race Weekend Format"
            subtitle="A Formula 1 race weekend runs Thursday to Sunday. Here's what happens at each stage."
          >
            <div className="flex flex-col gap-3">
              {WEEKEND.map((item) => <InfoCard key={item.label} item={item} />)}
            </div>
          </Section>
        )}

        {activeTab === "Points & Championships" && (
          <div>
            <Section
              title="Points System"
              subtitle="The top 10 finishers score points after every race. Here's the breakdown."
            >
              <ScoringTable />
            </Section>

            <Section
              title="Two Championships"
              subtitle="F1 runs two separate title battles simultaneously throughout the season."
            >
              <ChampionshipExplainer />
              <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Why it matters</p>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  A driver can win the Drivers Championship while their team loses the Constructors Championship if their teammate performs poorly — and vice versa. This creates situations where a team might ask a driver to sacrifice their own result to help their teammate score points. Team orders are a real, legal, and controversial part of F1.
                </p>
              </div>
            </Section>
          </div>
        )}
      </div>
    </main>
  );
}
