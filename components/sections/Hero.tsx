import { Button } from '@/components/ui/Button';
import { Countdown } from '@/components/ui/Countdown';
import { HeroBackground } from '@/components/ui/HeroBackground';
import { ArrowUpRight, Calendar, MapPin } from '@/components/ui/Icon';
import { LoadSequence } from '@/components/ui/LoadSequence';
import { SplitReveal } from '@/components/ui/SplitReveal';
import { event } from '@/data/event';

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-16">
      <HeroBackground />

      <div className="shell relative w-full text-center">
        <LoadSequence delay={0.5}>
          {/* Date + venue read as one unit. On narrow phones the venue used
              to orphan "NIGERIA" on a third line; the venue text is
              inline-block + balanced so it breaks as "THE ASSEMBLY ·" /
              "OGBOMOSHO, NIGERIA" instead. `gap-y-1` keeps the two lines
              grouped (in row mode above `sm` the vertical gap is inert). */}
          <div
            className="js-reveal flex flex-col items-center justify-center gap-x-8 gap-y-1 font-mono text-[0.7rem] tracking-[0.18em] text-white uppercase sm:flex-row sm:text-xs"
            data-load
          >
            <span className="flex items-start justify-center gap-2 text-center">
              <Calendar className="mt-px size-3.5 shrink-0 text-ash" />
              <span>{event.dateLabel}</span>
            </span>
            <span className="flex items-start justify-center gap-2 text-center">
              <MapPin className="mt-px size-3.5 shrink-0 text-ash" />
              <span className="inline-block text-balance">
                {event.venue} · {event.city}
              </span>
            </span>
          </div>
        </LoadSequence>
        {/* Narrow-phone composition (≤430px): 34px keeps the tagline to 3–4
            balanced lines instead of a 5-line stack, and the tighter margins
            close the desktop-scale gaps. `max-[431px]` because Tailwind v4
            `max-*` is exclusive (`width < 431px`), so 431 covers exactly-430
            viewports too. The `mt-*` trims below mirror it for the same range. */}
        <SplitReveal
          as="h1"
          trigger="load"
          delay={0.15}
          className="mx-auto mt-8 max-w-7xl text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.95] font-semibold text-pretty text-white max-[431px]:mt-6 max-[431px]:text-[2.125rem] max-[431px]:leading-[1.02] max-[431px]:text-balance"
        >
          Pause the noise. Undo the defaults. Rebuild with intention.
        </SplitReveal>

        <LoadSequence delay={0.75}>
          <p
            className="js-reveal mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white max-[431px]:mt-5 sm:text-lg"
            data-load
          >
            A one-gathering for creatives across Africa to rethink their process,challenge the familiar and create what
            comes next
          </p>

          <div
            className="js-reveal mt-10 flex flex-col items-center justify-center gap-3 max-[431px]:mt-8 sm:flex-row"
            data-load
          >
            <Button href="#tickets" size="lg" className="w-full sm:w-auto">
              Get your ticket
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>

            {/* Scoped to the Hero: the shared `secondary` variant borders itself
                with `seam` (bone @ 10%), which all but disappears against the
                brighter frames. `cn` is plain concatenation with no
                tailwind-merge, so the override has to be important to win.
                Resting state only, so the existing hover fill still applies. */}
            <Button
              href="#speakers"
              variant="secondary"
              size="lg"
              className="w-full !border-bone/40 hover:!border-bone sm:w-auto"
            >
              See the lineup
            </Button>
          </div>

          <div className="js-reveal mt-14 flex flex-col items-center max-[431px]:mt-10" data-load>
            {/* One step below `text-bone`: at 10px it stays clearly readable
                (~6:1 over the darkened frames) while reading as a label for
                the bone countdown digits beneath it, not as body copy. */}
            <p className="font-mono text-[0.625rem] tracking-[0.2em] text-silver uppercase">Doors open in</p>
            <Countdown target={event.startsAt} className="mt-3 w-full max-w-md" />
          </div>
        </LoadSequence>
      </div>
    </section>
  );
}
