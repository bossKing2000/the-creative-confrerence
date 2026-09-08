'use client';

import { useRef } from 'react';

import { gsap, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';

const STRIP_HEIGHTS = [38, 54, 29, 66, 43, 74, 33, 58, 47, 62, 36, 51];

interface StripFieldProps {
  className?: string;
  intensity?: number;
  parallax?: number;
}

export function StripField({ className, intensity = 16, parallax = 80 }: StripFieldProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;

      gsap.from(gsap.utils.toArray<HTMLElement>('[data-strip]', root), {
        scaleY: 0,
        duration: 1.5,
        stagger: { each: 0.07, from: 'center' },
        ease: 'power3.out',
      });

      gsap.to(root, {
        y: parallax,
        ease: 'none',
        scrollTrigger: {
          trigger: root.parentElement ?? root,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: ref, dependencies: [parallax] },
  );

  return (
    <div ref={ref} aria-hidden className={cn('pointer-events-none absolute inset-0 flex overflow-hidden', className)}>
      {STRIP_HEIGHTS.map((height, index) => (
        <div key={index} className="relative h-full flex-1 border-r seam last:border-r-0">
          <div
            data-strip
            className="absolute inset-x-0 bottom-0 origin-bottom will-change-transform"
            style={{
              height: `${height}%`,
              background: `linear-gradient(to top, color-mix(in oklab, var(--color-bone) ${intensity}%, transparent), transparent 94%)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
