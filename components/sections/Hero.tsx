import { Button } from '@/components/ui/Button';
import { Countdown } from '@/components/ui/Countdown';
import { ArrowUpRight, Calendar, MapPin } from '@/components/ui/Icon';
import { LoadSequence } from '@/components/ui/LoadSequence';
import { SplitReveal } from '@/components/ui/SplitReveal';
import { StripField } from '@/components/ui/StripField';
import { event } from '@/data/event';

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-16">
      <StripField intensity={20} parallax={70} className="-z-10" />

      <div className="shell relative w-full text-center">
        <LoadSequence delay={0.5}>
          <div
            className="js-reveal flex flex-col items-center justify-center gap-x-8 gap-y-2 font-mono text-[0.7rem] tracking-[0.18em] text-ash uppercase sm:flex-row sm:text-xs"
            data-load
          >
            <span className="flex items-start justify-center gap-2 text-center">
              <Calendar className="mt-px size-3.5 shrink-0 text-ash-dim" />
              <span>{event.dateLabel}</span>
            </span>
            <span className="flex items-start justify-center gap-2 text-center">
              <MapPin className="mt-px size-3.5 shrink-0 text-ash-dim" />
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
          className="mx-auto mt-8 max-w-5xl text-[clamp(2.5rem,7.5vw,5.75rem)] leading-[0.95] font-semibold text-balance"
        >
          CTRL + Z
        </SplitReveal>

        <SplitReveal
          as="h1"
          trigger="load"
          delay={0.15}
          className="mx-auto mt-8 max-w-5xl text-[clamp(2.5rem,7.5vw,5.75rem)] leading-[0.95] font-semibold text-balance"
        >
          PAUSE, UNDO, REBUILD .
        </SplitReveal>

        <LoadSequence delay={0.75}>
          <p className="js-reveal mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ash sm:text-lg" data-load>
            CTRL Z PAUSE! UNDO! REBUILD! A one-gathering for creatives across Africa to rethink their process,challenge
            the familiar and create what comes next
          </p>

          <div className="js-reveal mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row" data-load>
            <Button href={event.ticketUrl} size="lg" className="w-full sm:w-auto">
              Get your ticket
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>

            <Button href="#speakers" variant="secondary" size="lg" className="w-full sm:w-auto">
              See the lineup
            </Button>
          </div>

          <div className="js-reveal mt-14 flex flex-col items-center" data-load>
            <p className="font-mono text-[0.625rem] tracking-[0.2em] text-ash-dim uppercase">Doors open in</p>
            <Countdown target={event.startsAt} className="mt-3 w-full max-w-md" />
          </div>
        </LoadSequence>
      </div>
    </section>
  );
}
