'use client';

import { useId, useState } from 'react';

import { Plus } from '@/components/ui/Icon';
import type { Faq } from '@/data/faqs';
import { cn } from '@/lib/utils';

interface AccordionProps {
  items: Faq[];
  /** Index open on first render. Pass `null` for all-closed. */
  defaultOpen?: number | null;
}

export function Accordion({ items, defaultOpen = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className="divide-y divide-white/8 border-y seam">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-bone"
              >
                <span
                  className={cn(
                    'font-display text-lg leading-snug font-medium transition-colors sm:text-xl',
                    isOpen ? 'text-bone' : 'text-ash',
                  )}
                >
                  {item.question}
                </span>

                <span
                  aria-hidden
                  className={cn(
                    'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border seam transition-[transform,background-color,border-color] duration-300',
                    isOpen ? 'rotate-45 border-transparent bg-bone text-ink' : 'text-ash',
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              /* `inert` rather than `hidden`: it takes the collapsed answer out
                 of the a11y tree and tab order while still allowing the
                 grid-rows transition to run. `hidden` would set display:none
                 and kill the animation. */
              inert={!isOpen}
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-7 text-sm leading-relaxed text-ash sm:text-base">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
