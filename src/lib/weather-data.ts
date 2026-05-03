export interface DayForecast {
  date: string; // "YYYY-MM-DD"
  maxTemp: number;
  precipitationProbability: number;
  weatherCode: number;
}

// WMO Weather interpretation codes → label + emoji
export function describeWeather(code: number): { label: string; icon: string } {
  if (code === 0) return { label: "Clear", icon: "sun" };
  if (code <= 2) return { label: "Partly Cloudy", icon: "partly-cloudy" };
  if (code === 3) return { label: "Overcast", icon: "cloud" };
  if (code <= 48) return { label: "Foggy", icon: "fog" };
  if (code <= 67) return { label: "Rain", icon: "rain" };
  if (code <= 77) return { label: "Snow", icon: "snow" };
  if (code <= 82) return { label: "Showers", icon: "rain" };
  if (code <= 86) return { label: "Snow Showers", icon: "snow" };
  return { label: "Thunderstorm", icon: "storm" };
}

export async function getRaceWeekendWeather(
  lat: string,
  lon: string,
  sessionDates: string[]
): Promise<DayForecast[]> {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&timezone=auto&forecast_days=16`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();

    if (!data.daily?.time) return [];

    const { time, temperature_2m_max, precipitation_probability_max, weathercode } =
      data.daily as {
        time: string[];
        temperature_2m_max: number[];
        precipitation_probability_max: number[];
        weathercode: number[];
      };

    const uniqueDates = [...new Set(sessionDates)];

    return uniqueDates
      .map((date) => {
        const idx = time.indexOf(date);
        if (idx === -1) return null;
        return {
          date,
          maxTemp: Math.round(temperature_2m_max[idx]),
          precipitationProbability: precipitation_probability_max[idx] ?? 0,
          weatherCode: weathercode[idx],
        };
      })
      .filter((d): d is DayForecast => d !== null);
  } catch {
    return [];
  }
}
