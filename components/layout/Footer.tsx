import Image from 'next/image';
import Link from 'next/link';

import { NewsletterForm } from '@/components/layout/NewsletterForm';
import { socialIcons } from '@/components/ui/Icon';
import { SectionLink } from '@/components/ui/SectionLink';
import { event, socials } from '@/data/event';
import { footerNav } from '@/data/navigation';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t seam bg-ink">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/logo-white.png" alt="" width={40} height={40} className="size-10 object-contain" />
              <span className="font-display text-base leading-tight font-semibold text-bone">
                The Creative
                <span className="block text-ash-dim">Conference {event.edition}</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ash">{event.tagline}</p>

            <div className="mt-8 max-w-sm">
              <NewsletterForm />
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 lg:col-span-4">
            {footerNav.map(group => (
              <nav key={group.heading} aria-label={group.heading}>
                <h2 className="font-mono text-xs tracking-[0.2em] text-ash-dim uppercase">{group.heading}</h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map(link => (
                    <li key={`${group.heading}-${link.href}-${link.label}`}>
                      <SectionLink href={link.href} className="text-sm text-ash transition-colors hover:text-bone">
                        {link.label}
                      </SectionLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-mono text-xs tracking-[0.2em] text-ash-dim uppercase">Reach us</h2>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`mailto:${event.email}`} className="text-ash transition-colors hover:text-bone">
                  {event.email}
                </a>
              </li>
              <li>
                <a
                  href={event.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ash transition-colors hover:text-bone"
                >
                  {event.whatsappLabel}
                </a>
              </li>
              <li className="text-ash-dim">{event.city}</li>
            </ul>

            <ul className="mt-6 flex flex-wrap items-center gap-2">
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
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t seam pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-ash-dim">
            © {year} {event.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-ash-dim">
            {event.dateLabel} · {event.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
