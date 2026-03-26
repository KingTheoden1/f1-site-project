"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate: string;
  targetTime: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-zinc-800 border border-zinc-700 rounded-lg w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center"
      >
        <span className="text-2xl sm:text-3xl font-bold text-white font-mono">
          {value.toString().padStart(2, "0")}
        </span>
      </motion.div>
      <span className="text-xs text-zinc-500 mt-2 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({
  targetDate,
  targetTime,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const target = new Date(`${targetDate}T${targetTime}`);
    setTimeLeft(calculateTimeLeft(target));

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, targetTime]);

  if (!timeLeft) {
    return (
      <div className="flex gap-3 sm:gap-4">
        {["Days", "Hrs", "Min", "Sec"].map((label) => (
          <TimeBlock key={label} value={0} label={label} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-3 sm:gap-4">
      <TimeBlock value={timeLeft.days} label="Days" />
      <TimeBlock value={timeLeft.hours} label="Hrs" />
      <TimeBlock value={timeLeft.minutes} label="Min" />
      <TimeBlock value={timeLeft.seconds} label="Sec" />
    </div>
  );
}
