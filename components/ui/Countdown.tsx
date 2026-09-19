'use client';

import { useCountdown } from '@/lib/hooks/useCountdown';

interface CountdownProps {
  target: string;
  className?: string;
}

const UNITS = ['Days', 'Hours', 'Minutes', 'Seconds'] as const;

const pad = (value: number) => value.toString().padStart(2, '0');

export function Countdown({ target, className }: CountdownProps) {
  const timeLeft = useCountdown(target);

  const values = timeLeft
    ? [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map(pad)
    : [null, null, null, null];

  if (timeLeft === null) {
    return (
      <p className={className}>
        <span className="font-mono text-sm tracking-[0.2em] text-bone uppercase">Doors are open</span>
      </p>
    );
  }

  return (
    <div className={className}>
      <dl className="grid max-w-md grid-cols-4 gap-px overflow-hidden rounded-xl border seam bg-white/6">
        {UNITS.map((unit, index) => (
          <div key={unit} className="bg-char/90 px-2 py-3.5 text-center sm:px-4 sm:py-4">
            <dd
              /* Tabular figures stop the layout twitching on every tick. */
              className="font-mono text-2xl font-medium tabular-nums text-bone sm:text-3xl"
              suppressHydrationWarning
            >
              {values[index] ?? '--'}
            </dd>
            <dt className="mt-1.5 font-mono text-[0.625rem] tracking-[0.16em] text-ash uppercase sm:text-xs">{unit}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
