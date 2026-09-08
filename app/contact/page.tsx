import type { Metadata } from 'next';

import { ContactForm } from '@/components/sections/ContactForm';
import { socialIcons, Mail, MapPin } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { event, socials } from '@/data/event';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Questions about tickets, speaking or partnering with ${event.name} ${event.edition}? Reach the team.`,
};

const directChannels = [
  { icon: Mail, label: 'Email', value: event.email, href: `mailto:${event.email}` },
  { icon: socialIcons.whatsapp, label: 'WhatsApp', value: event.whatsappLabel, href: event.whatsappUrl },
  { icon: MapPin, label: 'Where we are', value: event.city },
];

export default function ContactPage() {
  return (
    <div className="shell pt-32 pb-24 lg:pt-40 lg:pb-32">
      <SectionHeading
        eyebrow="Contact"
        title="Talk to the team"
        lede="Tickets, sponsorship, speaking or something we have not thought of. A person reads every message and replies, usually within two working days."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Direct channels first — plenty of people would rather not fill in a form. */}
        <Reveal className="lg:col-span-5" stagger={0.1}>
          <ul className="space-y-3">
            {directChannels.map(channel => {
              const Glyph = channel.icon;

              const content = (
                <>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border seam bg-white/2 text-bone">
                    <Glyph className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[0.625rem] tracking-[0.2em] text-ash-dim uppercase">
                      {channel.label}
                    </span>
                    <span className="mt-1 block truncate text-sm text-bone">{channel.value}</span>
                  </span>
                </>
              );

              return (
                <li key={channel.label}>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      target={channel.href.startsWith('http') ? '_blank' : undefined}
                      rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="flex items-center gap-4 rounded-2xl border seam bg-char/50 p-4 transition-colors hover:border-bone/35 hover:bg-char"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-2xl border seam bg-char/50 p-4">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-8 rounded-2xl border seam bg-char/50 p-6">
            <h2 className="font-display text-base font-semibold text-bone">Follow along</h2>
            <p className="mt-1.5 text-sm text-ash">Lineup drops, schedule changes and photos from the day.</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {socials.map(social => {
                const Glyph = socialIcons[social.platform];

                return (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex size-10 items-center justify-center rounded-full border seam text-ash transition-colors hover:border-bone/40 hover:text-bone"
                    >
                      <Glyph className="size-4" />
                      <span className="sr-only">{social.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
