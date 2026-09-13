'use client';

import { Button } from '@/components/ui/Button';
import { ArrowUpRight } from '@/components/ui/Icon';
import { PersonCard } from '@/components/ui/PersonCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { speakers, type Person } from '@/data/people';

export function Speakers() {
  const confirmed = speakers.filter(person => !person.pending).length;
  // Speaker photographs are not available yet, so the lineup grid holds a
  // single pending placeholder. No organising-team imagery is rendered here.
  const lineup: Person[] =
    speakers.length > 0
      ? speakers
      : [{ id: 'lineup-tba', name: 'To be announced', role: 'Speaker lineup', pending: true }];

  return (
    <section id="speakers" className="py-24 lg:py-28">
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
        <div className="shell rounded-2xl bg-bone/10 p-5 lg:p-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lineup.map(person => (
              <div key={person.id}>
                <PersonCard person={person} />
              </div>
            ))}

            <div className="flex flex-col justify-center rounded-2xl border seam bg-char/50 p-7 sm:col-span-2 lg:col-span-1 lg:p-8">
              <h3 className="font-display text-xl leading-snug font-semibold text-bone">
                The rest of the lineup drops in stages
              </h3>
              <p className="mt-2 text-sm text-ash">Ticket holders hear first, and early tickets cost the least.</p>

              <Button href="#tickets" className="mt-6 w-full">
                Get your ticket
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
