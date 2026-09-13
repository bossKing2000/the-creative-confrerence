import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: ReactNode;
  speed?: 'default' | 'slow';
  direction?: 'left' | 'right';
  fade?: boolean;
  className?: string;
}

export function Marquee({ children, speed = 'default', direction = 'left', fade = true, className }: MarqueeProps) {
  const animation =
    direction === 'right'
      ? speed === 'slow'
        ? 'animate-marquee-reverse-slow'
        : 'animate-marquee-reverse'
      : speed === 'slow'
        ? 'animate-marquee-slow'
        : 'animate-marquee';

  return (
    <div
      className={cn(
        'marquee group relative flex overflow-hidden',
        fade && '[mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]',
        className,
      )}
    >
      <div className={cn('marquee-track flex w-max shrink-0 items-center', animation)}>
        <div className="flex shrink-0 items-center">{children}</div>
        {/* Duplicated half: hidden from assistive tech and removed from tab
            order so linked content is never announced or focused twice. */}
        <div aria-hidden inert className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
