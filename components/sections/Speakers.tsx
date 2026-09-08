'use client';

import { useRef } from 'react';

import { Button } from '@/components/ui/Button';
import { ArrowUpRight } from '@/components/ui/Icon';
import { PersonCard } from '@/components/ui/PersonCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { event } from '@/data/event';
import { speakers } from '@/data/people';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

export function Speakers() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  const confirmed = speakers.filter(person => !person.pending).length;

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const media = gsap.matchMedia();

    media.add('(min-width: 1024px)', () => {
      const el = track.current;
      const host = section.current;
      if (!el || !host) return;

      el.dataset.track = 'horizontal';

      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + 96);

      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: host,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: self => {
            if (progress.current) gsap.set(progress.current, { scaleX: self.progress });
          },
        },
      });

      return () => {
        delete el.dataset.track;
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => {
      media.revert();
      ScrollTrigger.refresh();
    };
  });

  return (
    <section ref={section} id="speakers" className="relative overflow-hidden py-24 lg:py-28">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="The lineup"
            title="People who have shipped the work"
            lede="Practitioners over personalities. Everyone on this stage is still making things, and they talk about the decisions rather than the highlight reel."
          />

          <Reveal delay={0.25}>
            <p className="shrink-0 font-mono text-xs tracking-[0.18em] text-ash-dim uppercase">
              {confirmed} confirmed · more to come
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-10 lg:mt-12">
        <div ref={track} className="shell grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.map(person => (
            <div key={person.id}>
              <PersonCard person={person} />
            </div>
          ))}

          <div className="flex flex-col justify-center rounded-2xl border seam bg-char/50 p-7 sm:col-span-2 lg:col-span-1 lg:p-8">
            <h3 className="font-display text-xl leading-snug font-semibold text-bone">
              The rest of the lineup drops in stages
            </h3>
            <p className="mt-2 text-sm text-ash">Ticket holders hear first, and early tickets cost the least.</p>

            <Button href={event.ticketUrl} className="mt-6 w-full">
              Get your ticket
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
