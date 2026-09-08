'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';

import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface SplitRevealProps {
  children: ReactNode;
  className?: string;
  trigger?: 'load' | 'scroll';
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

export function SplitReveal({ children, className, trigger = 'scroll', delay = 0, as: Tag = 'div' }: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const revealed = useRef(false);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1 });
        return;
      }

      gsap.set(el, { opacity: 1 });

      const split = SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line-mask',
        autoSplit: true,
        onSplit(self) {
          if (revealed.current) {
            gsap.set(self.lines, { yPercent: 0, opacity: 1 });
            return undefined;
          }

          return gsap.from(self.lines, {
            yPercent: 115,
            opacity: 0,
            duration: 1,
            stagger: 0.085,
            ease: 'power3.out',
            delay: trigger === 'load' ? delay : 0,
            onComplete: () => {
              revealed.current = true;
            },
            ...(trigger === 'scroll' ? { scrollTrigger: { trigger: el, start: 'top 85%', once: true } } : {}),
          });
        },
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [trigger, delay] },
  );

  return (
    <Tag ref={ref as never} className={cn('js-reveal', className)}>
      {children}
    </Tag>
  );
}
