import { ArrowUpRight } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SplitReveal } from '@/components/ui/SplitReveal';
import { tickets } from '@/data/tickets';
import type { Ticket } from '@/data/tickets';
import { cn } from '@/lib/utils';

const spines = ['bg-ash-dim', 'bg-silver', 'bg-ash', 'bg-bone'];

function TicketCard({ ticket, index }: { ticket: Ticket; index: number }) {
  const available = ticket.href.length > 0;

  return (
    <article
      className={cn(
        'relative flex flex-col overflow-hidden rounded-2xl bg-bone text-ink',
        ticket.featured && 'ring-2 ring-bone ring-offset-4 ring-offset-ink',
      )}
    >
      {ticket.featured ? (
        <p className="absolute top-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-ink px-4 py-1.5 font-mono text-[0.65rem] tracking-[0.18em] whitespace-nowrap text-bone uppercase">
          Most picked
        </p>
      ) : null}

      {/* Spine accent — graduated ash tones keep the monochrome system. */}
      <span aria-hidden className={cn('absolute inset-y-0 left-0 w-1.5', spines[index % spines.length])} />

      <div className="flex flex-1 flex-col p-7 pl-8">
        <p className="font-mono text-xs tracking-[0.2em] text-ink/55 uppercase">{ticket.tier}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">{ticket.name}</h3>

        <p className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-3xl font-semibold tracking-tight text-ink tabular-nums xl:text-4xl">
            {ticket.price}
          </span>
          <span className="text-sm whitespace-nowrap text-ink/55">{ticket.suffix}</span>
        </p>

        <ul className="mt-6 flex-1 space-y-3 border-t border-dashed border-ink/20 pt-6">
          {ticket.features.map(feature => (
            <li key={feature} className="flex items-start gap-2.5 text-sm leading-snug text-ink/80">
              <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ink/60" />
              {feature}
            </li>
          ))}
        </ul>

        {available ? (
          <a
            href={ticket.href}
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-ink/25 text-sm font-medium tracking-tight text-ink transition-[background-color,color] duration-200 hover:bg-ink hover:text-bone"
          >
            {ticket.cta}
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : (
          <p className="mt-8 inline-flex h-12 w-full cursor-not-allowed items-center justify-center rounded-full border border-ink/15 text-sm font-medium tracking-tight text-ink/45">
            Ticket link coming soon
          </p>
        )}
      </div>

      {/* Perforation notches. Pure decoration over the solid section ground. */}
      <span aria-hidden className="absolute top-[58%] -left-3 size-6 rounded-full bg-ink" />
      <span aria-hidden className="absolute top-[58%] -right-3 size-6 rounded-full bg-ink" />
    </article>
  );
}

export function Tickets() {
  return (
    <section id="tickets" className="scroll-mt-20 py-24 lg:py-32">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="flex items-center justify-center gap-3 font-mono text-xs tracking-[0.2em] text-ash-dim uppercase">
              <span aria-hidden className="size-1.5 rounded-full bg-bone/60" />
              Passes
            </p>
          </Reveal>

          <SplitReveal as="h2" className="mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Grab your ticket.
          </SplitReveal>

          <Reveal delay={0.15}>
            <p className="mt-5 text-base leading-relaxed text-ash sm:text-lg">
              Pick the pass that fits your day. Every pass includes the full conference program.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14 grid gap-5 pt-4 sm:grid-cols-2 xl:grid-cols-4" delay={0.1} stagger={0.08}>
          {tickets.map((ticket, index) => (
            <TicketCard key={ticket.id} ticket={ticket} index={index} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
