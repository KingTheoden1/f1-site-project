import type { DayForecast } from "@/lib/weather-data";
import { describeWeather } from "@/lib/weather-data";

interface WeatherForecastProps {
  forecasts: DayForecast[];
}

function WeatherIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "sun":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-yellow-400" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      );
    case "partly-cloudy":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-zinc-300" stroke="currentColor" strokeWidth={1.5}>
          <path d="M12 4a4 4 0 014 4 4 4 0 01-.1.9A3 3 0 1114 15H7a4 4 0 01-.4-8A4 4 0 0112 4z" />
        </svg>
      );
    case "cloud":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-zinc-400" stroke="currentColor" strokeWidth={1.5}>
          <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      );
    case "fog":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-zinc-500" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" d="M4 8h16M4 12h16M6 16h12" />
        </svg>
      );
    case "rain":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-blue-400" stroke="currentColor" strokeWidth={1.5}>
          <path d="M20 17.58A5 5 0 0018 8h-1.26A8 8 0 104 16.25" />
          <line x1="8" y1="16" x2="8" y2="20" strokeLinecap="round" />
          <line x1="12" y1="16" x2="12" y2="20" strokeLinecap="round" />
          <line x1="16" y1="16" x2="16" y2="20" strokeLinecap="round" />
        </svg>
      );
    case "snow":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-sky-300" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" d="M12 2v20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M2 12h20M2 12l3-3M2 12l3 3M22 12l-3-3M22 12l-3 3" />
        </svg>
      );
    case "storm":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-yellow-500" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    default:
      return <span className="text-zinc-500 text-xs">?</span>;
  }
}

function formatForecastDate(dateStr: string): string {
  const d = new Date(`${dateStr}T12:00:00`);
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function WeatherForecast({ forecasts }: WeatherForecastProps) {
  if (forecasts.length === 0) return null;

  return (
    <div className="mt-6">
      <p className="text-xs text-zinc-600 uppercase tracking-widest mb-3">
        Weekend Forecast
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {forecasts.map((day) => {
          const { label, icon } = describeWeather(day.weatherCode);
          return (
            <div
              key={day.date}
              className="bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2.5 flex flex-col gap-1"
            >
              <p className="text-zinc-500 text-xs">{formatForecastDate(day.date)}</p>
              <div className="flex items-center gap-1.5">
                <WeatherIcon icon={icon} />
                <span className="text-zinc-400 text-xs">{label}</span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-white text-xs font-mono font-semibold">
                  {Math.round(day.maxTemp * 9/5 + 32)}°F / {day.maxTemp}°C
                </span>
                {day.precipitationProbability > 0 && (
                  <span className={`text-xs font-mono ${day.precipitationProbability >= 50 ? "text-blue-400" : "text-zinc-500"}`}>
                    {day.precipitationProbability}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
