'use client';

import { useRef } from 'react';

import { PersonCard } from '@/components/ui/PersonCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { team } from '@/data/people';
import { Flip, gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

const TILT = 7;

export function Team() {
  const grid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = grid.current;
      if (!el || prefersReducedMotion()) return;

      const cards = gsap.utils.toArray<HTMLElement>('[data-card]', el);
      if (cards.length === 0) return;

      const cleanups: (() => void)[] = [];

      const deal = () => {
        const settledHeight = el.getBoundingClientRect().height;
        el.style.minHeight = `${settledHeight}px`;

        el.dataset.deck = 'stacked';
        gsap.set(cards, { rotate: (index: number) => (index - (cards.length - 1) / 2) * 4 });

        const state = Flip.getState(cards, { props: 'rotate' });

        delete el.dataset.deck;
        gsap.set(cards, { rotate: 0 });

        Flip.from(state, {
          duration: 0.9,
          ease: 'power3.inOut',
          absolute: true,
          stagger: 0.055,
          onComplete: () => {
            el.style.minHeight = '';
          },
        });
      };

      const trigger = ScrollTrigger.create({ trigger: el, start: 'top 78%', once: true, onEnter: deal });
      cleanups.push(() => trigger.kill());

      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        cards.forEach(card => {
          const rotateX = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3' });
          const rotateY = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3' });
          const lift = gsap.quickTo(card, 'y', { duration: 0.5, ease: 'power3' });

          const onMove = (e: PointerEvent) => {
            const box = card.getBoundingClientRect();
            const px = (e.clientX - box.left) / box.width - 0.5;
            const py = (e.clientY - box.top) / box.height - 0.5;

            rotateY(px * TILT * 2);
            rotateX(-py * TILT * 2);
            lift(-10);
          };

          const onLeave = () => {
            rotateX(0);
            rotateY(0);
            lift(0);
          };

          card.addEventListener('pointermove', onMove);
          card.addEventListener('pointerleave', onLeave);

          cleanups.push(() => {
            card.removeEventListener('pointermove', onMove);
            card.removeEventListener('pointerleave', onLeave);
          });
        });
      }

      return () => cleanups.forEach(fn => fn());
    },
    { scope: grid },
  );

  return (
    <section id="team" className="border-y seam bg-char/40 py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Behind it"
          title="The organising team"
          lede="A small volunteer team who run this alongside their own practice. If you have a question about the day, one of these people will answer it."
        />

        <div ref={grid} className="mt-14 grid gap-5 perspective-distant sm:grid-cols-2 lg:grid-cols-3">
          {team.map(person => (
            <div key={person.id} data-card className="transform-3d will-change-transform">
              <PersonCard person={person} variant="compact" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
