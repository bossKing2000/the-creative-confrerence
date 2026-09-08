import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: ReactNode;
  speed?: 'default' | 'slow';
  fade?: boolean;
  className?: string;
}

export function Marquee({ children, speed = 'default', fade = true, className }: MarqueeProps) {
  return (
    <div
      className={cn(
        'group relative flex overflow-hidden',
        fade && '[mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]',
        className,
      )}
    >
      <div
        className={cn(
          'flex w-max shrink-0 items-center group-hover:[animation-play-state:paused]',
          speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee',
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
