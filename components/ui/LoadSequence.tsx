'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';

import { gsap, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

interface LoadSequenceProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function LoadSequence({ children, className, delay = 0.35 }: LoadSequenceProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const items = gsap.utils.toArray<HTMLElement>('[data-load]', root);

      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0, filter: 'none' });
        return;
      }

      gsap.fromTo(
        items,
        { opacity: 0, y: 20, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.09, ease: 'power3.out', delay },
      );
    },
    { scope: ref, dependencies: [delay] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
