import Image from 'next/image';
import Link from 'next/link';

import { Marquee } from '@/components/ui/Marquee';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { sponsors } from '@/data/sponsors';
import type { Sponsor } from '@/data/sponsors';
import { cn } from '@/lib/utils';

function Logo({ sponsor }: { sponsor: Sponsor }) {
  const isWide = sponsor.width / sponsor.height >= 2;

  return (
    <Image
      src={sponsor.logo}
      alt={sponsor.name}
      width={sponsor.width}
      height={sponsor.height}
      sizes="(min-width: 768px) 12rem, 8rem"
      className={cn(
        'w-auto object-contain opacity-70 brightness-0 invert transition duration-300',
        'group-hover/logo:opacity-100 group-hover/logo:brightness-100 group-hover/logo:invert-0',
        isWide ? 'max-h-8 max-w-36 sm:max-h-9 sm:max-w-40' : 'max-h-20 max-w-28 sm:max-h-24 sm:max-w-32',
      )}
    />
  );
}

export function Sponsors() {
  return (
    <section id="partners" className="shell py-24 lg:py-32 lg:pt-0">
      <SectionHeading
        eyebrow="Partners"
        title="Backed by people who build here"
        align="center"
        lede="A short list on purpose. We work with a handful of partners each year so the room stays a conference rather than a trade show."
      />

      <Reveal
        className="mt-14 hidden grid-cols-3 gap-px overflow-hidden rounded-2xl border seam bg-white/6 sm:grid lg:grid-cols-6"
        stagger={0.07}
      >
        {sponsors.map(sponsor => (
          <div key={sponsor.name} className="group/logo flex h-32 items-center justify-center bg-char/80 px-5 lg:h-40">
            {sponsor.href ? (
              <a href={sponsor.href} target="_blank" rel="noreferrer" className="flex items-center justify-center">
                <Logo sponsor={sponsor} />
                <span className="sr-only">{sponsor.name}</span>
              </a>
            ) : (
              <Logo sponsor={sponsor} />
            )}
          </div>
        ))}
      </Reveal>
      <div className="mt-12 sm:hidden">
        <Marquee speed="slow">
          {sponsors.map(sponsor => (
            <div key={sponsor.name} className="group/logo flex h-24 items-center justify-center px-7">
              <Logo sponsor={sponsor} />
            </div>
          ))}
        </Marquee>
      </div>

      <Reveal className="mt-10 text-center">
        <Link
          href="/contact"
          className="font-mono text-xs tracking-[0.18em] text-bone uppercase underline-offset-4 transition-colors hover:text-bone hover:underline"
        >
          Partner with us for 2026
        </Link>
      </Reveal>
    </section>
  );
}
