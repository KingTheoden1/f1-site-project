export interface CircuitStaticData {
  circuitId: string;
  trackType: "street" | "permanent";
  lengthKm: number;
  turns: number;
  drsZones: number;
  laps: number;
  lapRecord?: { time: string; driver: string; year: number };
  elevationChangeM?: number;
  description: string;
  history: string;
  notableRaces: { year: number; title: string; description: string }[];
}

export const CIRCUIT_DATA: Record<string, CircuitStaticData> = {
  albert_park: {
    circuitId: "albert_park",
    trackType: "permanent",
    lengthKm: 5.278,
    turns: 14,
    drsZones: 4,
    laps: 58,
    lapRecord: { time: "1:19.813", driver: "Charles Leclerc", year: 2024 },
    elevationChangeM: 11,
    description:
      "A fast, flowing layout winding through Melbourne's Albert Park. The circuit combines long straights with quick chicanes and a mix of low- and medium-speed corners, rewarding drivers who can brake late and carry speed. The lakeside setting makes it one of the most scenic tracks on the calendar.",
    history:
      "Albert Park has hosted the Australian Grand Prix since 1996, when the race moved from Adelaide. The track was significantly redesigned in 2022, removing two chicanes and creating faster, more flowing sections. Melbourne's event traditionally opens the F1 season and is known for producing unpredictable results.",
    notableRaces: [
      {
        year: 2024,
        title: "Sainz's Stunning Post-Surgery Win",
        description:
          "Carlos Sainz won just two weeks after having his appendix removed, holding off Lando Norris in a remarkable comeback drive.",
      },
      {
        year: 2009,
        title: "Button's Brawn Fairy Tale",
        description:
          "Jenson Button led a Brawn GP 1-2 in the team's debut race — a team that had been saved from closure just weeks earlier.",
      },
      {
        year: 1996,
        title: "The First Melbourne Grand Prix",
        description:
          "The inaugural race at Albert Park saw Jacques Villeneuve challenge Damon Hill on debut, with Hill ultimately taking the win.",
      },
    ],
  },

  americas: {
    circuitId: "americas",
    trackType: "permanent",
    lengthKm: 5.513,
    turns: 20,
    drsZones: 2,
    laps: 56,
    lapRecord: { time: "1:36.169", driver: "Charles Leclerc", year: 2019 },
    elevationChangeM: 41,
    description:
      "The Circuit of the Americas in Austin, Texas features dramatic elevation changes, a stunning uphill run to Turn 1, and a mix of high-speed sweeps inspired by classic European circuits. Sector one echoes Silverstone's Maggotts-Becketts, while the technical back section demands precision.",
    history:
      "Purpose-built for Formula 1, COTA opened in 2012 and brought the US Grand Prix back to the calendar after a five-year absence. Designed by Hermann Tilke, it's one of the few modern circuits universally praised by drivers for its challenging, varied layout. The venue has become a massive event combining racing with live music.",
    notableRaces: [
      {
        year: 2015,
        title: "Hamilton Clinches Third Title in the Rain",
        description:
          "Lewis Hamilton won a rain-soaked thriller to seal his third World Championship, fending off Nico Rosberg in treacherous conditions.",
      },
      {
        year: 2012,
        title: "The Inaugural US Grand Prix",
        description:
          "Lewis Hamilton won the very first race at COTA, beating Sebastian Vettel in front of over 100,000 fans as F1 returned to America.",
      },
      {
        year: 2023,
        title: "Verstappen's Sprint Weekend Dominance",
        description:
          "Max Verstappen won both the sprint and the main race, clinching his third consecutive World Championship at the Austin circuit.",
      },
    ],
  },

  bahrain: {
    circuitId: "bahrain",
    trackType: "permanent",
    lengthKm: 5.412,
    turns: 15,
    drsZones: 3,
    laps: 57,
    lapRecord: { time: "1:31.447", driver: "Pedro de la Rosa", year: 2005 },
    elevationChangeM: 12,
    description:
      "Set in the Bahrain desert, this circuit features long straights connected by tight, technical braking zones. The abrasive sand-blown surface is tough on tires, and races held under floodlights create a dramatic atmosphere. Wind and sand can drastically change grip levels throughout the weekend.",
    history:
      "Bahrain International Circuit became the first F1 venue in the Middle East when it hosted its inaugural race in 2004. The circuit has been a season opener multiple times and hosted a unique outer-layout race during the pandemic in 2020. It was designed to promote overtaking with its heavy-braking corners.",
    notableRaces: [
      {
        year: 2014,
        title: "Hamilton vs Rosberg Under Lights",
        description:
          "The first night race at Bahrain delivered an epic wheel-to-wheel battle between Mercedes teammates, with Hamilton narrowly prevailing.",
      },
      {
        year: 2020,
        title: "Grosjean's Miraculous Escape",
        description:
          "Romain Grosjean survived a horrifying 137mph crash that split his car in half and burst into flames, walking away with minor burns.",
      },
      {
        year: 2024,
        title: "Verstappen Opens Title Defense",
        description:
          "Max Verstappen dominated the season opener, leading from start to finish as Red Bull showcased their continued dominance.",
      },
    ],
  },

  baku: {
    circuitId: "baku",
    trackType: "street",
    lengthKm: 6.003,
    turns: 20,
    drsZones: 2,
    laps: 51,
    lapRecord: { time: "1:43.009", driver: "Charles Leclerc", year: 2019 },
    elevationChangeM: 28,
    description:
      "The Baku City Circuit is one of the fastest street circuits in the world, featuring a 2.2km blast along the Caspian Sea waterfront followed by a tight, winding section through the medieval Old City. The contrast between flat-out straights and narrow castle walls makes setup a real compromise.",
    history:
      "Azerbaijan joined the F1 calendar in 2016, initially branded as the European Grand Prix. The circuit weaves through the streets of Baku, passing UNESCO World Heritage sites including the Maiden Tower. It has earned a reputation for chaos and drama, with almost every edition producing safety cars and surprise results.",
    notableRaces: [
      {
        year: 2017,
        title: "Ricciardo's Chaos Victory",
        description:
          "Daniel Ricciardo won a race that featured Vettel deliberately hitting Hamilton under the safety car, multiple restarts, and constant drama.",
      },
      {
        year: 2021,
        title: "Verstappen's Tire Blowout Heartbreak",
        description:
          "Leading comfortably, Max Verstappen suffered a high-speed tire blowout on the main straight. Perez inherited the lead but Hamilton locked up at the restart, finishing off the podium.",
      },
      {
        year: 2023,
        title: "Perez's Sprint Mastery",
        description:
          "Sergio Perez demonstrated his street circuit prowess, winning the race and extending his remarkable record in Baku.",
      },
    ],
  },

  catalunya: {
    circuitId: "catalunya",
    trackType: "permanent",
    lengthKm: 4.657,
    turns: 14,
    drsZones: 2,
    laps: 66,
    lapRecord: { time: "1:16.330", driver: "Max Verstappen", year: 2024 },
    elevationChangeM: 30,
    description:
      "Barcelona's Circuit de Catalunya is the ultimate all-rounder test. Its mix of high-speed corners, slow hairpins, and long straights means a car must be competitive everywhere to win here. The demanding Turn 3 right-hander and the fast final sector separate the best from the rest.",
    history:
      "Home of the Spanish Grand Prix since 1991, Catalunya is also F1's most-used winter testing venue, meaning teams know every inch of this track. The familiarity makes it a reliable barometer of car performance. The circuit was modified in 2023, removing the final chicane in favor of a faster layout.",
    notableRaces: [
      {
        year: 2016,
        title: "Verstappen's Historic Debut Win",
        description:
          "18-year-old Max Verstappen won on his very first race for Red Bull, becoming the youngest-ever F1 race winner after the Mercedes pair collided.",
      },
      {
        year: 1996,
        title: "Schumacher's Rain Masterclass",
        description:
          "Michael Schumacher lapped the entire field up to third place in torrential rain, winning by over 45 seconds in one of the greatest wet-weather drives ever.",
      },
      {
        year: 2012,
        title: "Maldonado's Shock Victory",
        description:
          "Pastor Maldonado stunned the field with Williams' first victory in eight years, beating Fernando Alonso at his home race.",
      },
    ],
  },

  hungaroring: {
    circuitId: "hungaroring",
    trackType: "permanent",
    lengthKm: 4.381,
    turns: 14,
    drsZones: 2,
    laps: 70,
    lapRecord: { time: "1:16.627", driver: "Lewis Hamilton", year: 2020 },
    elevationChangeM: 36,
    description:
      "Often called 'Monaco without the walls,' the Hungaroring is a tight, twisty circuit set in a natural amphitheater outside Budapest. Overtaking is notoriously difficult, making qualifying position and pit strategy crucial. The track's low-speed nature puts a premium on mechanical grip and downforce.",
    history:
      "The Hungaroring made history in 1986 as the first circuit behind the Iron Curtain to host an F1 race. Located in Mogyoród near Budapest, it has been a permanent fixture ever since. Despite its reputation for processional races, it has produced many dramatic moments thanks to its strategic complexity and summer heat.",
    notableRaces: [
      {
        year: 2021,
        title: "Ocon's Maiden Victory in Chaos",
        description:
          "Esteban Ocon won his first Grand Prix after a first-lap pile-up eliminated several frontrunners, then held off Sebastian Vettel to the finish.",
      },
      {
        year: 2024,
        title: "Piastri's Breakthrough Win",
        description:
          "Oscar Piastri took his maiden F1 victory after McLaren controversially asked Lando Norris to hand back a position gained via pit strategy.",
      },
      {
        year: 2006,
        title: "Button's First Win",
        description:
          "Jenson Button finally broke his duck after 113 races, winning in dominant fashion for Honda in changeable conditions.",
      },
    ],
  },

  interlagos: {
    circuitId: "interlagos",
    trackType: "permanent",
    lengthKm: 4.309,
    turns: 15,
    drsZones: 2,
    laps: 71,
    lapRecord: { time: "1:10.540", driver: "Valtteri Bottas", year: 2018 },
    elevationChangeM: 50,
    description:
      "Interlagos runs counter-clockwise through the hills of São Paulo, with dramatic elevation changes and a layout that rewards bravery. The long, banked left-hander of Curva do Sol and the tight Senna S create natural overtaking opportunities. Its short lap length means traffic is always a factor.",
    history:
      "One of F1's most historic venues, Interlagos has hosted the Brazilian Grand Prix since 1990 (and earlier from 1973-1980). Named after its location 'between lakes,' the circuit was shortened from its original 7.96km layout. Brazil's passionate fans and the track's championship-deciding history make it one of the sport's most emotional venues.",
    notableRaces: [
      {
        year: 2008,
        title: "Hamilton's Last-Corner Championship",
        description:
          "Lewis Hamilton overtook Timo Glock on the final corner of the final lap to snatch the World Championship from Felipe Massa, who had already begun celebrating.",
      },
      {
        year: 2012,
        title: "Vettel's Championship Rescue",
        description:
          "Sebastian Vettel was hit on lap one and dropped to last, but drove through the field to finish sixth and clinch the title by three points over Fernando Alonso.",
      },
      {
        year: 2003,
        title: "Fisichella's Rain-Soaked Win",
        description:
          "A rain-drenched race was red-flagged after multiple crashes. Giancarlo Fisichella was initially classified second but later awarded the victory for Jordan.",
      },
    ],
  },

  jeddah: {
    circuitId: "jeddah",
    trackType: "street",
    lengthKm: 6.174,
    turns: 27,
    drsZones: 3,
    laps: 50,
    lapRecord: { time: "1:30.734", driver: "Lewis Hamilton", year: 2021 },
    elevationChangeM: 12,
    description:
      "The Jeddah Corniche Circuit is the fastest street circuit in F1, with an average speed exceeding 250 km/h. Its 27 corners flow together almost like a permanent circuit, with high-speed sweeps separated by concrete walls. The narrow confines and blind corners make it one of the most demanding tracks on the calendar.",
    history:
      "Saudi Arabia's first Grand Prix took place in Jeddah in 2021 as part of the country's push to host major sporting events. The circuit runs along the Red Sea corniche and was built in record time. Its inaugural races were among the most controversial and dramatic in modern F1 history.",
    notableRaces: [
      {
        year: 2021,
        title: "The Most Controversial Race in Years",
        description:
          "Hamilton and Verstappen collided multiple times in a chaotic title-deciding race featuring red flags, penalties, and accusations of brake-testing.",
      },
      {
        year: 2024,
        title: "Verstappen's Dominant Season Start",
        description:
          "Max Verstappen controlled the race from pole position, continuing his dominant form from the previous season.",
      },
      {
        year: 2022,
        title: "Verstappen Passes Leclerc on Final Lap",
        description:
          "An incredible last-lap duel saw Verstappen use DRS to pass Leclerc on the main straight, snatching victory at the line.",
      },
    ],
  },

  losail: {
    circuitId: "losail",
    trackType: "permanent",
    lengthKm: 5.419,
    turns: 16,
    drsZones: 2,
    laps: 57,
    lapRecord: { time: "1:24.319", driver: "Max Verstappen", year: 2023 },
    elevationChangeM: 9,
    description:
      "The Losail International Circuit in Qatar features a flowing layout with long sweeping corners that test sustained high-speed grip. Originally built for MotoGP, its wide track and generous run-off areas create good racing. Night racing under floodlights adds drama to the desert setting.",
    history:
      "Losail first hosted F1 in 2021 as a replacement venue, then became a permanent fixture from 2023 on a 10-year deal. The circuit was modified from its MotoGP configuration to better suit F1 cars, with new grandstands and facilities. Qatar's hosting coincides with the country's broader sports investment strategy.",
    notableRaces: [
      {
        year: 2023,
        title: "Extreme Heat Tests Driver Limits",
        description:
          "Temperatures exceeded 50°C on track, pushing drivers to their physical limits. Several drivers reported feeling unwell, sparking discussions about race conditions.",
      },
      {
        year: 2021,
        title: "Hamilton Keeps Title Fight Alive",
        description:
          "Lewis Hamilton won the inaugural Qatar Grand Prix from pole, cutting Verstappen's championship lead in the final stages of their epic title battle.",
      },
    ],
  },

  madring: {
    circuitId: "madring",
    trackType: "permanent",
    lengthKm: 5.47,
    turns: 16,
    drsZones: 3,
    laps: 56,
    elevationChangeM: 30,
    description:
      "The Madrid circuit is a brand-new purpose-built facility featuring a modern layout designed to promote close racing and overtaking. With three DRS zones and a mix of high-speed and technical sections, it aims to be one of the most exciting new additions to the calendar.",
    history:
      "Madrid joins the F1 calendar in 2026 as part of a long-term agreement, marking Spain's second race alongside Barcelona. The circuit was designed with modern F1 car characteristics in mind, prioritizing wheel-to-wheel racing. It represents a new generation of purpose-built F1 facilities.",
    notableRaces: [
      {
        year: 2026,
        title: "Inaugural Madrid Grand Prix",
        description:
          "The first-ever F1 race at the brand-new Madrid circuit, marking the debut of Spain's newest addition to the calendar.",
      },
    ],
  },

  marina_bay: {
    circuitId: "marina_bay",
    trackType: "street",
    lengthKm: 4.94,
    turns: 19,
    drsZones: 3,
    laps: 62,
    lapRecord: { time: "1:35.867", driver: "Lewis Hamilton", year: 2023 },
    elevationChangeM: 5,
    description:
      "The Marina Bay Street Circuit is F1's original night race, held under lights in the heart of Singapore. The bumpy, humid conditions across 19 corners make it one of the most physically demanding races. The two-hour time limit is often approached, and the combination of heat, walls, and safety cars makes strategy unpredictable.",
    history:
      "Singapore hosted the first-ever night race in F1 history in 2008, illuminated by over 1,500 lighting projectors. The street circuit wraps around Marina Bay, passing landmarks like the Esplanade, Singapore Flyer, and the iconic Marina Bay Sands hotel. It quickly became one of the most prestigious races on the calendar.",
    notableRaces: [
      {
        year: 2008,
        title: "Crashgate Scandal",
        description:
          "Fernando Alonso won the inaugural race, but it was later revealed that his teammate Piquet Jr. had deliberately crashed to trigger a safety car, leading to team principal Flavio Briatore's ban.",
      },
      {
        year: 2023,
        title: "Sainz Ends Verstappen's Winning Streak",
        description:
          "Carlos Sainz broke Max Verstappen's run of 10 consecutive victories, winning in Singapore where Red Bull traditionally struggles.",
      },
      {
        year: 2017,
        title: "First-Lap Ferrari Disaster",
        description:
          "Both Ferraris and Verstappen collided at Turn 1 in wet conditions, handing a straightforward victory to Lewis Hamilton and a huge championship advantage.",
      },
    ],
  },

  miami: {
    circuitId: "miami",
    trackType: "permanent",
    lengthKm: 5.412,
    turns: 19,
    drsZones: 3,
    laps: 57,
    lapRecord: { time: "1:29.708", driver: "Max Verstappen", year: 2023 },
    elevationChangeM: 4,
    description:
      "The Miami International Autodrome is built around Hard Rock Stadium in Miami Gardens. The circuit features a long back straight, tight chicanes, and a mix of medium- and high-speed corners. Its flat layout puts emphasis on mechanical grip, and the Florida humidity adds to tire degradation challenges.",
    history:
      "Miami joined the F1 calendar in 2022 as the second US race, reflecting F1's growing popularity in America. The track is built on the grounds surrounding the Miami Dolphins' stadium. The event has become one of the biggest on the calendar, blending racing with entertainment and celebrity culture.",
    notableRaces: [
      {
        year: 2024,
        title: "Norris's Breakthrough Victory",
        description:
          "Lando Norris won his first-ever Grand Prix in Miami, capitalizing on a well-timed safety car and demonstrating McLaren's return to competitiveness.",
      },
      {
        year: 2022,
        title: "The Inaugural Miami Grand Prix",
        description:
          "Max Verstappen won the first-ever Miami Grand Prix, passing Charles Leclerc during a late safety car restart in front of a star-studded crowd.",
      },
      {
        year: 2023,
        title: "Perez Dominates on Alternate Strategy",
        description:
          "Sergio Perez won after committing to a different tire strategy than the rest of the front-runners, showcasing the circuit's strategic variety.",
      },
    ],
  },

  monaco: {
    circuitId: "monaco",
    trackType: "street",
    lengthKm: 3.337,
    turns: 19,
    drsZones: 1,
    laps: 78,
    lapRecord: { time: "1:12.909", driver: "Lewis Hamilton", year: 2021 },
    elevationChangeM: 42,
    description:
      "The Circuit de Monaco is the jewel in F1's crown — a tight, twisting street circuit through the principality's streets with zero margin for error. The famous tunnel, the Swimming Pool chicane, and the Casino Square hairpin are iconic. Overtaking is almost impossible, making qualifying the most important session of the weekend.",
    history:
      "Monaco has hosted a Grand Prix since 1929, making it one of the oldest and most prestigious races in motorsport. The circuit has barely changed since the 1950s and remains the ultimate test of precision and bravery. Every F1 driver dreams of winning here — it's the race that defines careers. Along with Le Mans and the Indy 500, it forms motorsport's Triple Crown.",
    notableRaces: [
      {
        year: 1984,
        title: "Senna Announces Himself in the Rain",
        description:
          "A young Ayrton Senna in a Toleman stormed through the field in torrential rain, catching leader Alain Prost before the race was controversially red-flagged.",
      },
      {
        year: 1996,
        title: "Panis Wins for Ligier",
        description:
          "Only three cars finished this rain-soaked race. Olivier Panis scored the only victory for the Ligier team in what remains one of Monaco's craziest races.",
      },
      {
        year: 2024,
        title: "Leclerc Finally Wins at Home",
        description:
          "Charles Leclerc, a Monaco native, finally won his home Grand Prix after years of heartbreak, crossing the line in tears.",
      },
    ],
  },

  monza: {
    circuitId: "monza",
    trackType: "permanent",
    lengthKm: 5.793,
    turns: 11,
    drsZones: 2,
    laps: 53,
    lapRecord: { time: "1:21.046", driver: "Rubens Barrichello", year: 2004 },
    elevationChangeM: 11,
    description:
      "Monza is the Temple of Speed — a low-downforce circuit where cars reach over 350 km/h on the long straights. The famous Parabolica, Lesmo corners, and Variante Ascari demand commitment. Teams bring their skinniest rear wings here, making it a unique setup challenge unlike any other race.",
    history:
      "The Autodromo Nazionale di Monza has hosted the Italian Grand Prix almost every year since the World Championship began in 1950. Located in a royal park north of Milan, the circuit retains its original banked oval section (no longer used for F1). The tifosi — Ferrari's passionate fans — create an unmatched atmosphere, invading the track after the race to celebrate.",
    notableRaces: [
      {
        year: 2020,
        title: "Gasly's Fairy-Tale Victory",
        description:
          "Pierre Gasly won for AlphaTauri in a chaotic race featuring Hamilton's stop-go penalty, becoming the most unlikely winner in years.",
      },
      {
        year: 1971,
        title: "The Closest Finish in History",
        description:
          "Peter Gethin won in a five-car slipstreaming battle, crossing the line just 0.01 seconds ahead in what remains the closest finish in F1 history.",
      },
      {
        year: 2024,
        title: "Leclerc Thrills the Tifosi",
        description:
          "Charles Leclerc won the Italian Grand Prix for Ferrari using a one-stop strategy, sending the tifosi into delirium at Ferrari's home race.",
      },
    ],
  },

  red_bull_ring: {
    circuitId: "red_bull_ring",
    trackType: "permanent",
    lengthKm: 4.318,
    turns: 10,
    drsZones: 3,
    laps: 71,
    lapRecord: { time: "1:05.619", driver: "Carlos Sainz", year: 2020 },
    elevationChangeM: 65,
    description:
      "Set in the Styrian mountains of Austria, the Red Bull Ring is a short, punchy circuit with dramatic elevation changes, fast corners, and heavy braking zones. With only 10 turns, there's nowhere to hide a car's weaknesses. The uphill run from Turn 1 to Turn 3 is one of F1's most spectacular sequences.",
    history:
      "Originally known as the Österreichring, this circuit hosted Austrian Grands Prix in the 1970s and '80s before being shortened and renamed the A1-Ring in 1997. Red Bull purchased and renovated the circuit in 2011, and it returned to the F1 calendar in 2014. During the pandemic, it hosted back-to-back races as F1 restarted its 2020 season.",
    notableRaces: [
      {
        year: 2019,
        title: "Verstappen's Controversial Last-Lap Pass",
        description:
          "Max Verstappen passed Charles Leclerc on the final lap with a controversial move, winning the race but sparking a lengthy stewards' investigation.",
      },
      {
        year: 2020,
        title: "F1 Returns After COVID",
        description:
          "The Red Bull Ring hosted F1's return after the pandemic shutdown. Valtteri Bottas won a chaotic race with only 11 finishers.",
      },
      {
        year: 2002,
        title: "Ferrari's Controversial Team Orders",
        description:
          "Rubens Barrichello was forced to let Michael Schumacher pass on the final straight, creating one of F1's most infamous moments of team orders.",
      },
    ],
  },

  rodriguez: {
    circuitId: "rodriguez",
    trackType: "permanent",
    lengthKm: 4.304,
    turns: 17,
    drsZones: 3,
    laps: 71,
    lapRecord: { time: "1:17.774", driver: "Valtteri Bottas", year: 2021 },
    elevationChangeM: 18,
    description:
      "Mexico City's Autódromo Hermanos Rodríguez sits at 2,240 meters above sea level, the highest altitude on the F1 calendar. The thin air reduces downforce by about 20% and starves engines of power, creating a unique engineering challenge. The stadium section through the old baseball arena Foro Sol is one of F1's most atmospheric corners.",
    history:
      "Named after Mexican racing brothers Ricardo and Pedro Rodríguez, the circuit first hosted F1 in the 1960s. After a long absence, it returned in 2015 with a redesigned layout. The Foro Sol section was converted from a baseball stadium into a massive grandstand, creating an incredible atmosphere with over 130,000 fans.",
    notableRaces: [
      {
        year: 2018,
        title: "Verstappen Cruises to Victory",
        description:
          "Max Verstappen dominated the race while Lewis Hamilton finished fourth to clinch his fifth World Championship, celebrated with a crowd invasion.",
      },
      {
        year: 2015,
        title: "F1 Returns to Mexico",
        description:
          "The first Mexican Grand Prix in 23 years saw Nico Rosberg win in front of a rapturous crowd that set attendance records for the sport.",
      },
      {
        year: 2023,
        title: "Verstappen's Record 16th Win",
        description:
          "Max Verstappen won his 16th race of the season, setting a new all-time record for most wins in a single F1 season.",
      },
    ],
  },

  shanghai: {
    circuitId: "shanghai",
    trackType: "permanent",
    lengthKm: 5.451,
    turns: 16,
    drsZones: 2,
    laps: 56,
    lapRecord: { time: "1:32.238", driver: "Michael Schumacher", year: 2004 },
    elevationChangeM: 8,
    description:
      "The Shanghai International Circuit features a distinctive design with a long back straight and the challenging multi-apex Turn 1-2-3 complex. The track's sweeping curves and heavy braking zones provide varied overtaking opportunities. High tire degradation in the technical middle sector often creates strategic intrigue.",
    history:
      "Shanghai joined the F1 calendar in 2004 as part of China's push into global motorsport. The circuit was designed by Hermann Tilke with a shape inspired by the Chinese character 'shàng' (上), meaning 'above' or 'ascend.' After a four-year COVID absence, the race returned in 2024 to enthusiastic crowds.",
    notableRaces: [
      {
        year: 2024,
        title: "The Return After Four Years",
        description:
          "F1 returned to China after a four-year pandemic hiatus, hosting the first Sprint weekend at the circuit. Max Verstappen won both events.",
      },
      {
        year: 2007,
        title: "Hamilton's Title Hopes Slip Away",
        description:
          "Championship leader Lewis Hamilton slid into a gravel trap while entering the pits on worn tires, handing the title initiative to Kimi Räikkönen.",
      },
      {
        year: 2019,
        title: "F1's 1000th Race",
        description:
          "The milestone 1000th Formula 1 World Championship race was held at Shanghai, won by Lewis Hamilton with a Mercedes 1-2.",
      },
    ],
  },

  silverstone: {
    circuitId: "silverstone",
    trackType: "permanent",
    lengthKm: 5.891,
    turns: 18,
    drsZones: 2,
    laps: 52,
    lapRecord: { time: "1:27.097", driver: "Max Verstappen", year: 2020 },
    elevationChangeM: 11,
    description:
      "Silverstone is one of the fastest circuits on the calendar, with legendary high-speed corners like Copse, Maggotts, Becketts, and Chapel forming one of the most exhilarating sequences in all of motorsport. The circuit rewards aerodynamic excellence and driver bravery, with several corners taken at over 250 km/h.",
    history:
      "The home of the British Grand Prix and the birthplace of Formula 1 — the very first World Championship race was held here on May 13, 1950. Originally a World War II airfield, Silverstone has evolved from its humble beginnings into a world-class facility. It remains one of the best-attended and most-loved races on the calendar.",
    notableRaces: [
      {
        year: 2021,
        title: "Hamilton-Verstappen Collision",
        description:
          "Lewis Hamilton and Max Verstappen collided at Copse corner at 180mph, sending Verstappen into the barriers. Hamilton recovered from a penalty to win in front of his home crowd.",
      },
      {
        year: 2008,
        title: "Hamilton's Masterpiece in the Rain",
        description:
          "Lewis Hamilton won by over a minute in treacherous wet conditions, lapping the field with one of the greatest drives ever seen at Silverstone.",
      },
      {
        year: 2003,
        title: "The Streaker and Barrichello",
        description:
          "A spectator ran onto the track at Hangar Straight, causing a safety car. Rubens Barrichello eventually won a race also memorable for a dramatic multi-car startline incident.",
      },
    ],
  },

  spa: {
    circuitId: "spa",
    trackType: "permanent",
    lengthKm: 7.004,
    turns: 19,
    drsZones: 2,
    laps: 44,
    lapRecord: { time: "1:46.286", driver: "Valtteri Bottas", year: 2018 },
    elevationChangeM: 102,
    description:
      "Spa-Francorchamps is the king of F1 circuits — a 7km monster weaving through the Ardennes forest with the legendary Eau Rouge/Raidillon complex, the flat-out run through Blanchimont, and massive elevation changes. Its microclimates mean rain can hit one part of the track while the rest stays dry, making tire choices a gamble.",
    history:
      "The Belgian Grand Prix has been held at Spa since 1950 and is universally regarded as one of the greatest racing circuits ever built. The original 14km circuit used public roads through the countryside. While dramatically shortened in 1979, it retains its breathtaking character. Nearly every great F1 driver has a defining Spa moment.",
    notableRaces: [
      {
        year: 1998,
        title: "Schumacher-Coulthard Collision in the Fog",
        description:
          "Michael Schumacher hit David Coulthard in blinding spray while lapping him, then stormed into the McLaren garage to confront him. Damon Hill won for Jordan.",
      },
      {
        year: 2021,
        title: "The Non-Race",
        description:
          "Torrential rain meant only two laps were completed behind the safety car. Half points were awarded in the shortest 'race' in F1 history, sparking rule changes.",
      },
      {
        year: 2000,
        title: "Häkkinen Passes Schumacher Around a Backmarker",
        description:
          "Mika Häkkinen pulled off one of the most famous overtakes in history, passing Michael Schumacher around the outside while simultaneously passing a lapped car.",
      },
    ],
  },

  suzuka: {
    circuitId: "suzuka",
    trackType: "permanent",
    lengthKm: 5.807,
    turns: 18,
    drsZones: 2,
    laps: 53,
    lapRecord: { time: "1:30.983", driver: "Lewis Hamilton", year: 2019 },
    elevationChangeM: 43,
    description:
      "Suzuka is a figure-eight layout — the only one in F1 — with the track crossing over itself via a bridge. The legendary Esses in sector one are among the most challenging high-speed corners anywhere, taken flat-out by the bravest drivers. The 130R corner and Degner curves further test commitment. It's a drivers' circuit through and through.",
    history:
      "Built by Honda as a test track in 1962, Suzuka has hosted the Japanese Grand Prix since 1987 (alternating with Fuji briefly). Many World Championships have been decided here, often in dramatic fashion. The track is beloved by drivers for its challenging, rewarding layout and by fans for Japan's legendary enthusiasm and respect for the sport.",
    notableRaces: [
      {
        year: 1989,
        title: "Senna and Prost Collide for the Title",
        description:
          "Ayrton Senna and Alain Prost collided at the chicane. Prost walked away, but Senna restarted, won, then was disqualified — handing the championship to Prost in one of F1's most controversial moments.",
      },
      {
        year: 2005,
        title: "Räikkönen's Last-Lap Pass on Fisichella",
        description:
          "Kimi Räikkönen charged through the field from 17th and passed Giancarlo Fisichella on the final lap for victory in one of the greatest comeback drives ever.",
      },
      {
        year: 2024,
        title: "Verstappen Dominates at Suzuka",
        description:
          "Max Verstappen led from start to finish at a circuit Red Bull has historically dominated, extending his championship lead.",
      },
    ],
  },

  vegas: {
    circuitId: "vegas",
    trackType: "street",
    lengthKm: 6.201,
    turns: 17,
    drsZones: 2,
    laps: 50,
    lapRecord: { time: "1:35.490", driver: "Oscar Piastri", year: 2024 },
    elevationChangeM: 5,
    description:
      "The Las Vegas Strip Street Circuit races down the famous Strip past iconic casinos and hotels, with a 1.9km straight providing massive top speeds and overtaking opportunities. The race is held at night (local time), with freezing desert temperatures creating unique tire warm-up challenges completely unlike any other race.",
    history:
      "F1 returned to Las Vegas in 2023 after a long absence (the original Caesars Palace Grand Prix ran in 1981-82 on a car park circuit). The new layout uses the Strip itself as the main straight, creating a spectacle unlike anything else in motorsport. Despite initial skepticism, the racing quality won over fans and drivers alike.",
    notableRaces: [
      {
        year: 2024,
        title: "Russell Wins, Hamilton's Heartbreak",
        description:
          "George Russell won while teammate Lewis Hamilton fought through the field. The cold temperatures and long straights produced excellent racing throughout.",
      },
      {
        year: 2023,
        title: "Verstappen Wins Inaugural Race",
        description:
          "After a practice session saw a car destroyed by a loose drain cover, Max Verstappen won the inaugural Las Vegas Grand Prix, silencing early critics of the event.",
      },
    ],
  },

  villeneuve: {
    circuitId: "villeneuve",
    trackType: "permanent",
    lengthKm: 4.361,
    turns: 14,
    drsZones: 2,
    laps: 70,
    lapRecord: { time: "1:13.078", driver: "Valtteri Bottas", year: 2019 },
    elevationChangeM: 5,
    description:
      "The Circuit Gilles Villeneuve on Montreal's Île Notre-Dame is a semi-permanent circuit that combines high-speed straights with tight chicanes. The notorious 'Wall of Champions' at the final chicane has caught out multiple World Champions over the years. Low-grip surface and heavy braking put enormous stress on brakes and tires.",
    history:
      "Named after legendary Canadian driver Gilles Villeneuve, this circuit has hosted the Canadian Grand Prix since 1978. Built on a man-made island created for Expo 67, the track uses the island's roads combined with purpose-built sections. It's famous for producing unexpected results and its proximity to downtown Montreal makes it a fan favorite.",
    notableRaces: [
      {
        year: 2011,
        title: "The Longest Race in F1 History",
        description:
          "Jenson Button won after over four hours of racing (including a two-hour red flag), coming from last place to first in one of the greatest comeback victories in F1 history.",
      },
      {
        year: 1999,
        title: "The Wall of Champions Claims Three",
        description:
          "Michael Schumacher, Damon Hill, and Jacques Villeneuve — all World Champions — crashed at the final chicane exit wall during the same race, giving it its famous name.",
      },
      {
        year: 2019,
        title: "Vettel's Penalty Controversy",
        description:
          "Sebastian Vettel crossed the line first but was penalized five seconds for an unsafe rejoin, handing victory to Lewis Hamilton in a hugely controversial decision.",
      },
    ],
  },

  yas_marina: {
    circuitId: "yas_marina",
    trackType: "permanent",
    lengthKm: 5.281,
    turns: 16,
    drsZones: 2,
    laps: 58,
    lapRecord: { time: "1:26.103", driver: "Max Verstappen", year: 2021 },
    elevationChangeM: 11,
    description:
      "The Yas Marina Circuit in Abu Dhabi hosts F1's traditional season finale. The track transitions from daylight to darkness during the race, creating stunning visuals. Following a 2021 redesign that removed slow chicanes, the circuit now features faster, more flowing corners and better overtaking opportunities.",
    history:
      "Yas Marina opened in 2009 and has hosted the season-ending Abu Dhabi Grand Prix ever since. The circuit is known for its striking Yas Hotel (now W Abu Dhabi) that straddles the track. The layout was extensively redesigned in 2021, making it faster and more raceable. As the season finale, it has been the stage for multiple championship conclusions.",
    notableRaces: [
      {
        year: 2021,
        title: "The Most Controversial Finish Ever",
        description:
          "Max Verstappen overtook Lewis Hamilton on the final lap of the season after a controversial safety car restart, winning his first World Championship in the most dramatic fashion imaginable.",
      },
      {
        year: 2010,
        title: "Vettel Becomes Youngest Champion",
        description:
          "Sebastian Vettel won the race and the championship from third in the standings, becoming the youngest World Champion at age 23 as his rivals hit trouble.",
      },
      {
        year: 2016,
        title: "Rosberg's Title Despite Hamilton's Tactics",
        description:
          "Lewis Hamilton deliberately slowed in the closing laps to back Nico Rosberg into traffic, but Rosberg held on to second place and clinched his only World Championship.",
      },
    ],
  },

  zandvoort: {
    circuitId: "zandvoort",
    trackType: "permanent",
    lengthKm: 4.259,
    turns: 14,
    drsZones: 2,
    laps: 72,
    lapRecord: { time: "1:11.097", driver: "Lewis Hamilton", year: 2024 },
    elevationChangeM: 15,
    description:
      "Zandvoort is a compact, old-school circuit nestled in the Dutch sand dunes near the North Sea. Its two banked corners (Turns 3 and 14) are unique on the calendar, adding an extra dimension to racing. The narrow layout and limited run-off make it a true drivers' challenge where qualifying is paramount.",
    history:
      "Zandvoort hosted the Dutch Grand Prix from 1952 to 1985 before dropping off the calendar for 36 years. It returned in 2021 to accommodate the rise of Max Verstappen and his massive Dutch fanbase, with the 'Orange Army' creating one of the most electric atmospheres in all of motorsport. The circuit was modernized with banked corners inspired by American oval racing.",
    notableRaces: [
      {
        year: 2021,
        title: "The Homecoming",
        description:
          "Max Verstappen won the first Dutch Grand Prix in 36 years in front of a sea of orange-clad fans, dominating from pole position.",
      },
      {
        year: 2023,
        title: "Verstappen's Hat-Trick",
        description:
          "Max Verstappen won his third consecutive Dutch Grand Prix, making it a perfect record since the race's return to the calendar.",
      },
      {
        year: 1985,
        title: "Lauda's Final Season",
        description:
          "Niki Lauda won the last Dutch Grand Prix before the 36-year hiatus in what would be the final season of his remarkable career.",
      },
    ],
  },
};
