import { Button } from '@/components/ui/Button';
import { Countdown } from '@/components/ui/Countdown';
import { ArrowUpRight } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionBackground } from '@/components/ui/SectionBackground';
import { SplitReveal } from '@/components/ui/SplitReveal';
import { StripField } from '@/components/ui/StripField';
import { event } from '@/data/event';

export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden border-t seam">
      <SectionBackground
        src="/images/background/lower.jpeg"
        position="50% 40%"
        overlay="linear-gradient(to bottom, rgb(11 11 12 / 0.58), rgb(11 11 12 / 0.40) 40%, rgb(11 11 12 / 0.44) 60%, rgb(11 11 12 / 0.58))"
      />
      <StripField intensity={22} parallax={-70} className="-z-10" />

      <div className="shell relative py-28 text-center lg:py-36">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] text-silver uppercase">
            {event.dateLabel} · {event.city}
          </p>

          <SplitReveal
            as="h2"
            className="mx-auto mt-6 max-w-4xl text-[clamp(2.25rem,6.5vw,4.5rem)] leading-none font-semibold"
          >
            The room fills up. Be in it.
          </SplitReveal>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ash sm:text-lg">
            Every edition has sold out before the door, and the earliest tickets are always the cheapest. Book now and
            hear the lineup before it goes public.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href="#tickets" size="lg" className="w-full sm:w-auto">
              Get your ticket
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>

            <Button href={event.communityUrl} variant="secondary" size="lg" className="w-full sm:w-auto">
              Join the community
            </Button>
          </div>

          <Countdown target={event.startsAt} className="mt-12 flex justify-center [&>dl]:mx-auto" />
        </Reveal>
      </div>
    </section>
  );
}
