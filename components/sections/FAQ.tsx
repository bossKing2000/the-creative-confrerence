import Link from 'next/link';

import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqs } from '@/data/faqs';

export function FAQ() {
  return (
    <section id="faq" className="shell py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="FAQ" title="We have the answers" />

          <Reveal delay={0.2}>
            <p className="mt-6 text-sm leading-relaxed text-ash">
              Still stuck on something?{' '}
              <Link href="/contact" className="text-bone underline-offset-4 hover:underline">
                Send us a message
              </Link>{' '}
              and a human will reply.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
