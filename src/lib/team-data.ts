export interface TeamStaticData {
  constructorId: string;
  fullName: string;
  base: string;
  teamPrincipal: string;
  powerUnit: string;
  firstEntry: number;
  worldChampionships: number;
  highestFinish: string;
  description: string;
  history: string;
}

export const TEAM_DATA: Record<string, TeamStaticData> = {
  mercedes: {
    constructorId: "mercedes",
    fullName: "Mercedes-AMG Petronas Formula One Team",
    base: "Brackley, United Kingdom",
    teamPrincipal: "Toto Wolff",
    powerUnit: "Mercedes",
    firstEntry: 1954,
    worldChampionships: 8,
    highestFinish: "1st",
    description:
      "Mercedes has been one of the most dominant forces in modern F1 history. Their unprecedented run of eight consecutive Constructors' Championships from 2014–2021 cemented them as one of the greatest teams ever. The Silver Arrows combine cutting-edge engineering with relentless pursuit of perfection.",
    history:
      "Mercedes' roots in motorsport stretch back to the Silver Arrows era of the 1930s and 1950s, when Juan Manuel Fangio won two championships. After withdrawing from the sport following the 1955 Le Mans disaster, Mercedes returned as an engine supplier in 1994 before launching their modern works team by acquiring Brawn GP in 2010. The turbo-hybrid era starting in 2014 saw Lewis Hamilton and the team rewrite the record books with an era of dominance that may never be matched.",
  },
  ferrari: {
    constructorId: "ferrari",
    fullName: "Scuderia Ferrari HP",
    base: "Maranello, Italy",
    teamPrincipal: "Frédéric Vasseur",
    powerUnit: "Ferrari",
    firstEntry: 1950,
    worldChampionships: 16,
    highestFinish: "1st",
    description:
      "Ferrari is the most iconic and storied team in Formula 1. The Prancing Horse has been part of the championship since its very first race in 1950, making them the only team to have competed in every single season. With 16 Constructors' Championships, they hold the all-time record.",
    history:
      "Founded by Enzo Ferrari, the Scuderia has been synonymous with passion, drama, and speed. Their golden eras include the dominant years with Michael Schumacher (1999–2004), the Lauda era of the 1970s, and the legendary battles of the early 2000s. Based in the historic town of Maranello, Ferrari is more than a racing team — it's a global symbol of automotive excellence and Italian craftsmanship.",
  },
  mclaren: {
    constructorId: "mclaren",
    fullName: "McLaren Formula 1 Team",
    base: "Woking, United Kingdom",
    teamPrincipal: "Andrea Stella",
    powerUnit: "Mercedes",
    firstEntry: 1966,
    worldChampionships: 8,
    highestFinish: "1st",
    description:
      "McLaren is one of the most successful teams in F1 history, with 8 Constructors' Championships and a legacy of legendary drivers. From Ayrton Senna to Mika Häkkinen to Lewis Hamilton, the Woking-based team has always attracted top talent and delivered iconic cars.",
    history:
      "Founded by New Zealander Bruce McLaren in 1963, the team entered F1 in 1966 and won their first championship in 1974. The Senna-Prost rivalry at McLaren in the late 1980s remains one of the most dramatic chapters in F1 history. After a period of rebuilding in the 2010s, McLaren has re-emerged as a frontrunning team under Andrea Stella's leadership, with Lando Norris leading their charge back to the top.",
  },
  red_bull: {
    constructorId: "red_bull",
    fullName: "Oracle Red Bull Racing",
    base: "Milton Keynes, United Kingdom",
    teamPrincipal: "Laurent Mekies",
    powerUnit: "Ford",
    firstEntry: 2005,
    worldChampionships: 6,
    highestFinish: "1st",
    description:
      "Red Bull Racing transformed from an energy drink marketing exercise into one of F1's most formidable competitors. With Max Verstappen at the wheel, they delivered one of the most dominant seasons in F1 history in 2023, winning 21 of 22 races.",
    history:
      "Red Bull purchased the Jaguar Racing team in 2004 and entered F1 in 2005 with a fresh approach. Under Adrian Newey's design genius, they won four consecutive championships with Sebastian Vettel (2010–2013). The Max Verstappen era began in 2021 with a dramatic title fight against Lewis Hamilton, followed by utter dominance in 2022 and 2023. Their partnership with Ford begins a new chapter for the team.",
  },
  aston_martin: {
    constructorId: "aston_martin",
    fullName: "Aston Martin Aramco Formula One Team",
    base: "Silverstone, United Kingdom",
    teamPrincipal: "Adrian Newey",
    powerUnit: "Honda",
    firstEntry: 2021,
    worldChampionships: 0,
    highestFinish: "2nd",
    description:
      "Aston Martin represents the ambitious revival of one of motorsport's most prestigious names. Backed by Lawrence Stroll's investment and featuring Fernando Alonso, the team has built a state-of-the-art factory at Silverstone with championship aspirations.",
    history:
      "The team's lineage traces through several identities: Jordan Grand Prix (1991), Midland (2006), Spyker (2007), Force India (2008), Racing Point (2019), before becoming Aston Martin in 2021. Under Lawrence Stroll's ownership, the team has invested heavily in new facilities, including a wind tunnel and technology campus. Fernando Alonso's arrival in 2023 immediately delivered podium finishes and raised the team's profile.",
  },
  alpine: {
    constructorId: "alpine",
    fullName: "BWT Alpine F1 Team",
    base: "Enstone, United Kingdom & Viry-Châtillon, France",
    teamPrincipal: "Flavio Briatore",
    powerUnit: "Mercedes",
    firstEntry: 2021,
    worldChampionships: 2,
    highestFinish: "1st",
    description:
      "Alpine carries the legacy of the Renault and Benetton teams, with two Constructors' Championships to their name. The French manufacturer's F1 operation is split between Enstone (chassis) and Viry-Châtillon (engine development), bringing a unique dual-nationality identity to the grid.",
    history:
      "The Enstone factory has a rich history dating back to the Toleman team of the 1980s, which became Benetton and won championships with Michael Schumacher in 1994–1995. Renault took over in 2000 and won back-to-back titles with Fernando Alonso in 2005–2006. After periods as Lotus and then Renault again, the team rebranded as Alpine in 2021 to promote Renault's sports car brand.",
  },
  williams: {
    constructorId: "williams",
    fullName: "Williams Racing",
    base: "Grove, United Kingdom",
    teamPrincipal: "James Vowles",
    powerUnit: "Mercedes",
    firstEntry: 1978,
    worldChampionships: 9,
    highestFinish: "1st",
    description:
      "Williams is one of the most successful independent teams in F1 history, with 9 Constructors' Championships. Founded by Sir Frank Williams, the team defined an era of F1 in the 1980s and 1990s with innovative engineering and legendary drivers like Nigel Mansell, Alain Prost, and Ayrton Senna.",
    history:
      "Sir Frank Williams entered F1 in 1969, but it was the partnership with Patrick Head that created the powerhouse Williams team we know today. Their first championship came in 1980, and the FW14B of 1992 is considered one of the greatest F1 cars ever built. After a difficult period in the 2010s, the Williams family sold the team to Dorilton Capital in 2020. Under James Vowles' leadership, the team is working toward returning to competitiveness.",
  },
  rb: {
    constructorId: "rb",
    fullName: "Visa Cash App RB Formula One Team",
    base: "Faenza, Italy",
    teamPrincipal: "TBA",
    powerUnit: "Ford",
    firstEntry: 2006,
    worldChampionships: 0,
    highestFinish: "1st",
    description:
      "RB F1 Team serves as Red Bull's sister team and driver development program. Based in the historic Faenza factory in Italy, the team has launched the careers of numerous F1 stars including Sebastian Vettel, Max Verstappen, and Daniel Ricciardo.",
    history:
      "The Faenza facility has housed an F1 team since Minardi was founded in 1985. Red Bull acquired the team in 2005, renaming it Toro Rosso (Italian for 'Red Bull'). The team made history in 2008 when Sebastian Vettel won a rain-soaked Italian Grand Prix at Monza, making him the youngest race winner in F1 history at the time. Rebranded as AlphaTauri in 2020 and then RB in 2024, the team continues its role as a talent incubator.",
  },
  haas: {
    constructorId: "haas",
    fullName: "MoneyGram Haas F1 Team",
    base: "Kannapolis, USA",
    teamPrincipal: "Ayao Komatsu",
    powerUnit: "Ferrari",
    firstEntry: 2016,
    worldChampionships: 0,
    highestFinish: "4th",
    description:
      "Haas F1 Team is the only American-owned team on the F1 grid. Founded by Gene Haas, the team uses an innovative partnership model with Ferrari, leveraging the Italian team's technology while keeping costs manageable. Their Kannapolis base sits alongside Haas Automation's headquarters.",
    history:
      "Gene Haas, founder of Haas Automation (the largest CNC machine tool builder in North America), announced his F1 entry in 2014. The team scored points on their very first race in Australia 2016 — a remarkable achievement for a new constructor. Under Guenther Steiner's colorful leadership (featured in Netflix's Drive to Survive), Haas became a fan favorite. Ayao Komatsu took over as team principal in 2024, bringing a more technical focus.",
  },
  audi: {
    constructorId: "audi",
    fullName: "Audi Formula Racing",
    base: "Hinwil, Switzerland",
    teamPrincipal: "Jonathan Wheatley",
    powerUnit: "Audi",
    firstEntry: 2026,
    worldChampionships: 0,
    highestFinish: "N/A",
    description:
      "Audi marks the Volkswagen Group's first full works entry into Formula 1. Taking over the former Sauber team, Audi brings decades of motorsport success from Le Mans, DTM, and Formula E to the pinnacle of single-seater racing. Their 2026 debut coincides with F1's new engine regulations.",
    history:
      "The Hinwil facility has been home to the Sauber F1 team since Peter Sauber founded it in 1993. The team competed as BMW Sauber from 2006–2009, winning their only race at the 2008 Canadian Grand Prix. After reverting to Sauber and then becoming Alfa Romeo's works team (2019–2023), Audi acquired the operation to build their F1 project. Former Ferrari team principal Mattia Binotto leads the ambitious project, which aims to leverage Audi's engineering expertise and the VW Group's vast resources.",
  },
  cadillac: {
    constructorId: "cadillac",
    fullName: "Cadillac F1 Team",
    base: "United States",
    teamPrincipal: "Graeme Lowdon",
    powerUnit: "Ferrari",
    firstEntry: 2026,
    worldChampionships: 0,
    highestFinish: "N/A",
    description:
      "Cadillac F1 Team represents General Motors' highly anticipated return to Formula 1. As the 11th team on the grid for 2026, Cadillac brings American automotive heritage and GM's engineering resources to the world championship. Their entry expands the grid to 22 cars.",
    history:
      "General Motors has a storied history in motorsport through brands like Chevrolet and Cadillac, with success in IndyCar, IMSA, and Le Mans. The Cadillac F1 project was announced after F1 approved an 11th team entry, marking the first grid expansion in years. Initially linked to Andretti Global's bid, the project evolved into a GM/Cadillac-branded works effort. They will use Ferrari power units initially while developing their own GM engine for a future season.",
  },
};
