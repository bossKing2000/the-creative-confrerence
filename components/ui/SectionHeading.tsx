import type { ReactNode } from 'react';

import { Reveal } from '@/components/ui/Reveal';
import { SplitReveal } from '@/components/ui/SplitReveal';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  align?: 'start' | 'center';
  className?: string;
}

export function SectionHeading({ eyebrow, title, lede, align = 'start', className }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <Reveal>
        <p
          className={cn(
            'flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-ash-dim uppercase',
            align === 'center' && 'justify-center',
          )}
        >
          <span aria-hidden className="h-px w-6 bg-bone/60" />
          {eyebrow}
        </p>
      </Reveal>

      <SplitReveal as="h2" className="mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
        {title}
      </SplitReveal>

      {lede ? (
        <Reveal delay={0.15}>
          <p className="mt-5 text-base leading-relaxed text-ash sm:text-lg">{lede}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
