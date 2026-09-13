'use client';

import { useId, useRef, useState } from 'react';

import { ArchiveGallery } from '@/components/ui/ArchiveGallery';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ArrowUpRight } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { archives } from '@/data/event';
import { cn } from '@/lib/utils';

export function PastEditions() {
  // Latest edition first — the archive opens on the most recent year.
  const [active, setActive] = useState(archives.length - 1);
  const baseId = useId();
  const tabsRef = useRef<HTMLDivElement>(null);

  const edition = archives[active];
  // Active-year source of truth: only this year's photo array is ever read,
  // mounted or rendered. Inactive years preload nothing.
  const photoCount = edition.photos.length;

  const total = archives.length;
  const prev = (active + total - 1) % total;
  const next = (active + 1) % total;

  function focusTab(index: number) {
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[index]?.focus();
  }

  function select(index: number) {
    setActive(index);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const forward = e.key === 'ArrowRight' || e.key === 'ArrowDown';
    const back = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
    if (!forward && !back) return;

    e.preventDefault();
    const target = forward ? (active + 1) % total : (active - 1 + total) % total;

    select(target);
    focusTab(target);
  }

  return (
    <section id="editions" className="overflow-x-clip border-y seam bg-char/40 py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Past editions"
          title="Where we have been"
          lede="Every edition is photographed end to end. The full archives are open — browse the rooms, the sessions and the people."
        />

        {/* Year rail. Sticky (CSS only — no scroll listeners) so the edition
            can be switched without scrolling back up. It lives outside the
            Reveal below because transformed/filtered ancestors break sticky
            positioning. `top-20` clears the fixed h-18 navbar with room. */}
        <div className="sticky top-20 z-30 mt-12">
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Past editions"
            onKeyDown={onKeyDown}
            className="mx-auto flex max-w-xl items-center gap-1 rounded-full border seam bg-ink/85 p-1.5 backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={() => {
                select(prev);
                focusTab(prev);
              }}
              aria-label={`Show previous edition: ${archives[prev].year}`}
              className="flex size-11 shrink-0 items-center justify-center rounded-full text-ash transition-colors duration-200 hover:bg-white/6 hover:text-bone"
            >
              <ArrowRight className="size-4 rotate-180" />
            </button>

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
                  onClick={() => select(index)}
                  className={cn(
                    'h-11 min-w-0 flex-1 rounded-full font-display text-lg font-semibold tracking-tight tabular-nums transition-colors duration-300',
                    selected ? 'bg-bone text-ink' : 'text-ash-dim hover:text-bone',
                  )}
                >
                  {item.year}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => {
                select(next);
                focusTab(next);
              }}
              aria-label={`Show next edition: ${archives[next].year}`}
              className="flex size-11 shrink-0 items-center justify-center rounded-full text-ash transition-colors duration-200 hover:bg-white/6 hover:text-bone"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-bleed panel: the lead card and footer stay in `.shell`, while
          the gallery below is a direct full-width child so the marquee runs
          edge to edge like the reference (same pattern as Ticker). */}
      <Reveal className="mt-8" delay={0.1}>
        <div
          role="tabpanel"
          id={`${baseId}-panel-${edition.year}`}
          aria-labelledby={`${baseId}-tab-${edition.year}`}
          tabIndex={0}
        >
          {/* Remounted per year so the entrance replays. */}
          <div key={edition.year}>
            <div className="shell">
              <div className="rounded-2xl border seam bg-char/60 p-7 lg:p-10">
                <div className="archive-lead grid gap-10 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-7">
                    <p className="font-display text-7xl font-semibold tracking-tight text-bone tabular-nums lg:text-8xl">
                      {edition.year}
                    </p>

                    <h3 className="mt-4 font-display text-2xl font-semibold text-bone lg:text-3xl">{edition.title}</h3>

                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-ash">{edition.summary}</p>

                    <p className="mt-6 font-mono text-xs tracking-[0.18em] text-ash-dim uppercase">
                      {photoCount > 0
                        ? `${photoCount} moment${photoCount === 1 ? '' : 's'} from ${edition.year}`
                        : `Photographs from ${edition.year} arriving soon`}
                    </p>
                  </div>

                  <div className="lg:col-span-5 lg:pt-2">
                    <ul className="flex flex-wrap gap-2">
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
                </div>
              </div>
            </div>

            {/* Full-bleed: no `.shell`, no card padding — the marquee tracks
                run to the viewport edges. */}
            <ArchiveGallery photos={edition.photos} year={edition.year} href={edition.href} />

            <div className="shell">
              <div className="mt-10 flex items-center justify-between border-t seam pt-6">
                <button
                  type="button"
                  onClick={() => select(prev)}
                  aria-label={`Show previous edition: ${archives[prev].year}`}
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full font-mono text-xs tracking-[0.18em] text-ash uppercase transition-colors duration-200 hover:text-bone"
                >
                  <ArrowRight className="size-4 rotate-180 transition-transform duration-200 group-hover:-translate-x-0.5" />
                  {archives[prev].year}
                </button>

                <button
                  type="button"
                  onClick={() => select(next)}
                  aria-label={`Show next edition: ${archives[next].year}`}
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full font-mono text-xs tracking-[0.18em] text-ash uppercase transition-colors duration-200 hover:text-bone"
                >
                  {archives[next].year}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
