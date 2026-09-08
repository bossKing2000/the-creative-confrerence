'use client';

import { useId, useRef, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { ArrowUpRight } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { archives } from '@/data/event';
import { cn } from '@/lib/utils';

export function PastEditions() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabsRef = useRef<HTMLDivElement>(null);

  const edition = archives[active];

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const forward = e.key === 'ArrowRight' || e.key === 'ArrowDown';
    const back = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
    if (!forward && !back) return;

    e.preventDefault();
    const next = forward ? (active + 1) % archives.length : (active - 1 + archives.length) % archives.length;

    setActive(next);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  }

  return (
    <section id="editions" className="border-y seam bg-char/40 py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Past editions"
          title="Where we have been"
          lede="Every edition is photographed end to end. The full archives are open — browse the rooms, the sessions and the people."
        />

        <Reveal className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12" delay={0.1}>
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Past editions"
            onKeyDown={onKeyDown}
            className="flex gap-3 lg:col-span-4 lg:flex-col"
          >
            {archives.map((item, index) => {
              const selected = index === active;

              return (
                <button
                  key={item.year}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${item.year}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${item.year}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  className={cn(
                    'flex-1 rounded-2xl border p-5 text-left transition-colors duration-300 lg:p-6',
                    selected ? 'border-bone/40 bg-bone/10' : 'seam bg-white/2 hover:bg-white/5',
                  )}
                >
                  <span
                    className={cn(
                      'font-display text-3xl font-semibold tracking-tight tabular-nums lg:text-4xl',
                      selected ? 'text-bone' : 'text-ash-dim',
                    )}
                  >
                    {item.year}
                  </span>
                  <span className={cn('mt-1 block text-sm', selected ? 'text-bone' : 'text-ash-dim')}>
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`${baseId}-panel-${edition.year}`}
            aria-labelledby={`${baseId}-tab-${edition.year}`}
            tabIndex={0}
            className="rounded-2xl border seam bg-char/60 p-7 lg:col-span-8 lg:p-10"
          >
            <h3 className="font-display text-2xl font-semibold text-bone lg:text-3xl">
              {edition.year} · {edition.title}
            </h3>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ash">{edition.summary}</p>

            <ul className="mt-7 flex flex-wrap gap-2">
              {edition.highlights.map(highlight => (
                <li
                  key={highlight}
                  className="rounded-full border seam px-3.5 py-1.5 font-mono text-xs tracking-wide text-ash"
                >
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button href={edition.href} variant="secondary">
                Open the {edition.year} archive
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
