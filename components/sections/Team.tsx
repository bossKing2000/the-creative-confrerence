import { PersonCard } from '@/components/ui/PersonCard';
import { Reveal } from '@/components/ui/Reveal';
import { SplitReveal } from '@/components/ui/SplitReveal';
import { team } from '@/data/people';

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

        {/* Same card container, grid and image treatment the speaker cards
            used — the five organising-team photographs render here. */}
        <Reveal className="mt-14" delay={0.1}>
          <div className="rounded-2xl bg-bone/10 p-5 lg:p-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {team.map(person => (
                <div key={person.id}>
                  <PersonCard person={person} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
