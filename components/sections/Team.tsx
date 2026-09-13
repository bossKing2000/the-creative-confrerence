import { Reveal } from '@/components/ui/Reveal';
import { SplitReveal } from '@/components/ui/SplitReveal';
import { team } from '@/data/people';

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

export function Team() {
  return (
    <section id="team" className="border-y seam bg-char/40 py-24 lg:py-32">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-ash-dim uppercase">
                <span aria-hidden className="h-px w-6 bg-bone/60" />
                Behind it
              </p>
            </Reveal>

            <SplitReveal as="h2" className="mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              The organising team
            </SplitReveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-5 lg:pt-14">
            <p className="text-base leading-relaxed text-ash sm:text-lg">
              A small volunteer team who run this alongside their own practice. If you have a question about the day,
              one of these people will answer it.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14" delay={0.1}>
          <ol className="overflow-hidden rounded-2xl border seam">
            {team.map((person, index) => (
              <li
                key={person.id}
                className="flex items-baseline gap-5 border-b seam bg-char/60 px-6 py-5 transition-colors duration-300 last:border-b-0 hover:bg-white/2 sm:px-8 lg:px-10"
              >
                <span aria-hidden className="shrink-0 font-mono text-xs tracking-[0.18em] text-ash-dim tabular-nums">
                  {pad2(index + 1)}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <p className="font-display text-xl font-semibold tracking-tight text-bone lg:text-2xl">
                    {person.name}
                  </p>
                  <p className="shrink-0 text-sm text-ash">{person.role}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
