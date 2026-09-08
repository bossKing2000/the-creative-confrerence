'use client';

import type { ElementType, ReactNode } from 'react';
import { useRef } from 'react';

import { gsap, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  y?: number;
  stagger?: number;
  id?: string;
}

export function Reveal({ children, className, as: Tag = 'div', delay = 0, y = 28, stagger, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1, y: 0, filter: 'none' });
        gsap.set(Array.from(el.children), { opacity: 1, y: 0, filter: 'none' });
        return;
      }

      const targets = stagger ? Array.from(el.children) : [el];

      if (stagger) gsap.set(el, { opacity: 1 });

      gsap.fromTo(
        targets,
        { opacity: 0, y, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          delay,
          ease: 'power3.out',
          stagger: stagger ?? 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [delay, y, stagger] },
  );

  return (
    <Tag id={id} ref={ref} className={cn('js-reveal', className)}>
      {children}
    </Tag>
  );
}
