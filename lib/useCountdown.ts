"use client";

import { useEffect, useState } from "react";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

const EMPTY: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };

export function useCountdown(targetDate: string | Date): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(EMPTY);

  useEffect(() => {
    const target =
      typeof targetDate === "string" ? new Date(targetDate).getTime() : targetDate.getTime();

    setTimeLeft(calc(target));
    const interval = setInterval(() => {
      setTimeLeft(calc(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

function calc(target: number): TimeLeft {
  const total = Math.max(0, target - Date.now());
  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}
