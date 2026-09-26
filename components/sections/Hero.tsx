import { Button } from '@/components/ui/Button';
import { Countdown } from '@/components/ui/Countdown';
import { HeroBackground } from '@/components/ui/HeroBackground';
import { ArrowUpRight, Calendar, MapPin } from '@/components/ui/Icon';
import { LoadSequence } from '@/components/ui/LoadSequence';
import { SplitReveal } from '@/components/ui/SplitReveal';
import { event } from '@/data/event';

/**
 * Soft shadow for small text sitting directly on rotating photography.
 * The scrim alone cannot carry the copy over these frames at every viewport —
 * hitting 4.5:1 on 16px text would need a ~0.28 flat wash plus a near-opaque
 * band, i.e. the black layer this treatment replaced. So the copy is lifted to
 * `text-bone` and gets two shadows instead: a tight contact shadow that holds
 * the glyph edge, and a wide one that lifts the whole word off the background.
 * Both are local to the glyphs, so the photography is not touched at all.
 */
const ON_PHOTO = '[text-shadow:0_1px_2px_rgb(11_11_12/0.85),0_1px_10px_rgb(11_11_12/0.6)]';

/**
 * Same idea as `ON_PHOTO`, for the description only. It is the widest run of
 * small text in the Hero, so it gets a slightly tighter and slightly wider
 * pair of shadows — enough to hold its edges over the brightest frames
 * without the visible smudge an extra layer would leave.
 */
const ON_PHOTO_COPY = '[text-shadow:0_1px_2px_rgb(11_11_12/0.9),0_2px_12px_rgb(11_11_12/0.7)]';

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-16">
      <HeroBackground />

      <div className="shell relative w-full text-center">
        <LoadSequence delay={0.5}>
          <div
            className={`js-reveal relative inline-flex flex-col items-center justify-center gap-x-8 gap-y-2 font-mono text-[0.7rem] tracking-[0.18em] text-bone uppercase sm:flex-row sm:text-xs ${ON_PHOTO}`}
            data-load
          >
            {/* 12px type in the brightest strip of all four photographs:
                measured 5.5-5.8:1 at >=1024 but only 3.15-4.35:1 at <=768.
                A content-hugging pool of shade closes that. Absolute and
                -z-10, so it is out of flex flow, adds no padding and never
                shifts the line, while still sitting above the photo layer
                (which is -z-20). */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-x-3 -inset-y-1 rounded-full bg-ink/40 -z-10"
            />
            <span className="flex items-start justify-center gap-2 text-center">
              <Calendar className="mt-px size-3.5 shrink-0 text-ash" />
              <span>{event.dateLabel}</span>
            </span>
            <span className="flex items-start justify-center gap-2 text-center">
              <MapPin className="mt-px size-3.5 shrink-0 text-ash" />
              <span>
                {event.venue} · {event.city}
              </span>
            </span>
          </div>
        </LoadSequence>
        <SplitReveal
          as="h1"
          trigger="load"
          delay={0.15}
          className="mx-auto mt-8 max-w-7xl text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.95] font-semibold text-pretty"
        >
          Pause the noise. Undo the defaults. Rebuild with intention.
        </SplitReveal>

        <LoadSequence delay={0.75}>
          <p
            className={`js-reveal mx-auto mt-7 max-w-2xl text-base leading-relaxed text-bone sm:text-lg ${ON_PHOTO_COPY}`}
            data-load
          >
            CTRL Z PAUSE! UNDO! REBUILD! A one-gathering for creatives across Africa to rethink their process,challenge
            the familiar and create what comes next
          </p>

          <div className="js-reveal mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row" data-load>
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

          <div className="js-reveal mt-14 flex flex-col items-center" data-load>
            <p className={`font-mono text-[0.625rem] tracking-[0.2em] text-bone uppercase ${ON_PHOTO}`}>
              Doors open in
            </p>
            <Countdown target={event.startsAt} className="mt-3 w-full max-w-md" />
          </div>
        </LoadSequence>
      </div>
    </section>
  );
}
