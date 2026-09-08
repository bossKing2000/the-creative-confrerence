'use client';

import { useRef } from 'react';

import { gsap, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

interface CountUpProps {
  to: number;
  suffix?: string;
  className?: string;
}

const format = (value: number) => value.toLocaleString('en-US');

export function CountUp({ to, suffix = '', className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const counter = { value: 0 };

      gsap.to(counter, {
        value: to,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = `${format(Math.round(counter.value))}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    },
    { scope: ref, dependencies: [to, suffix] },
  );

  return (
    <span ref={ref} className={className}>
      {format(to)}
      {suffix}
    </span>
  );
}
