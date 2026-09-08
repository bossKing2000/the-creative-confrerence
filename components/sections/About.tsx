import { CountUp } from '@/components/ui/CountUp';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { pillars, stats } from '@/data/event';

export function About() {
  return (
    <section id="about" className="shell py-24 lg:py-32">
      <SectionHeading
        eyebrow="What this is"
        title="Fostering creativity within Africa's design community"
        lede="Three editions in, the format has settled into something simple: fewer talks, more work. You come with something you are making, and you leave with sharper thinking about it."
      />

      <Reveal
        className="mt-16 grid gap-px overflow-hidden rounded-2xl border seam bg-white/6 md:grid-cols-3"
        stagger={0.12}
      >
        {pillars.map(pillar => (
          <div key={pillar.title} className="bg-char/80 p-7 lg:p-8">
            <h3 className="font-display text-xl font-semibold text-bone">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ash">{pillar.body}</p>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-16 grid grid-cols-2 gap-8 sm:gap-6 lg:grid-cols-4" stagger={0.1}>
        {stats.map(stat => (
          <div key={stat.label} className="border-t seam pt-5">
            <p className="font-display text-4xl font-semibold tracking-tight text-bone tabular-nums sm:text-5xl">
              <CountUp to={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-ash">{stat.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
