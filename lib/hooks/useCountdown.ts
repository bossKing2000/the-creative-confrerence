'use client';

import { useSyncExternalStore } from 'react';

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const listeners = new Set<() => void>();
let currentTime = 0;
let timer: number | null = null;

function tick() {
  currentTime = Date.now();
  listeners.forEach(listener => listener());
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);

  if (timer === null) {
    // React re-reads the snapshot straight after subscribing, so setting the
    // value here is enough to trigger the first real render.
    currentTime = Date.now();
    timer = window.setInterval(tick, SECOND);
  }

  return () => {
    listeners.delete(onChange);

    if (listeners.size === 0 && timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
  };
}

const getSnapshot = () => currentTime;

const getServerSnapshot = () => 0;

export function useCountdown(isoDate: string): TimeLeft | null | undefined {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (now === 0) return undefined;

  const target = new Date(isoDate).getTime();
  if (Number.isNaN(target)) return null;

  const remaining = target - now;
  if (remaining <= 0) return null;

  return {
    days: Math.floor(remaining / DAY),
    hours: Math.floor((remaining % DAY) / HOUR),
    minutes: Math.floor((remaining % HOUR) / MINUTE),
    seconds: Math.floor((remaining % MINUTE) / SECOND),
  };
}
