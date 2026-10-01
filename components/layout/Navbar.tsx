'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { ArrowUpRight, Close, Menu } from '@/components/ui/Icon';
import { SectionLink } from '@/components/ui/SectionLink';
import { event } from '@/data/event';
import { navLinks } from '@/data/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Swap the transparent header for a solid one once the hero starts leaving.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [routeAtRender, setRouteAtRender] = useState(pathname);

  if (pathname !== routeAtRender) {
    setRouteAtRender(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        toggleRef.current?.focus();
        return;
      }

      if (e.key !== 'Tab' || !panelRef.current) return;

      // Keep focus inside the drawer while it is open.
      const focusables = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  // The header is fully transparent at the top of the page, which leaves the
  // link row sitting directly on the rotating Hero photography. Measured
  // against all four Hero frames the row lands in the brightest strip of every
  // one of them, so `text-ash` on raw photo measured 1.0-1.2:1. A compact
  // translucent pill behind the links fixes that without darkening the page.
  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300',
        solid ? 'border-b seam bg-ink/85 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <nav aria-label="Main" className="shell flex h-18 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <Image src="/logo-white.png" alt="" width={36} height={36} className="size-9 object-contain" priority />
          {/* "Conference {edition}" stays `text-bone`, not the original
              `text-ash-dim` (#5c5c65, measured 1.0:1 on the Hero photography).
              Reverting would make the wordmark unreadable, so the brighter
              colour remains. It is distinguished from "The Creative" above by
              weight and size rather than by colour. */}
          <span className="font-display text-sm leading-tight font-semibold text-bone">
            The Creative
            <span className="block text-bone">Conference {event.edition}</span>
          </span>
        </Link>

        {/* No enclosing pill: the links stand alone over the Hero, carried by
            the 0.75+ black overlay. Container keeps only layout (`gap-1`
            inter-link spacing is unchanged); each link keeps its own
            `rounded-full` hover shape, `text-bone`, and transition. */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map(link => (
            <li key={link.href}>
              <SectionLink
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm text-bone transition-colors hover:bg-white/12"
              >
                {link.label}
              </SectionLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href="#tickets" size="md">
              Get your ticket
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen(open => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex size-11 items-center justify-center rounded-full border seam text-bone transition-colors hover:bg-white/6 lg:hidden"
          >
            {menuOpen ? <Close className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer. Sits below the header bar and fills the rest of the screen. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        inert={!menuOpen}
        className={cn(
          'overflow-hidden border-t seam bg-ink/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-out lg:hidden',
          menuOpen ? 'max-h-[calc(100dvh-4.5rem)] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <ul className="shell flex flex-col py-4">
          {navLinks.map(link => (
            <li key={link.href} className="border-b seam last:border-b-0">
              <SectionLink
                href={link.href}
                onClick={closeMenu}
                className="flex items-center justify-between py-4 font-display text-lg text-bone"
              >
                {link.label}
                <ArrowUpRight className="size-5 text-ash-dim" />
              </SectionLink>
            </li>
          ))}
        </ul>

        <div className="shell pb-8 sm:hidden">
          <Button href="#tickets" size="lg" className="w-full">
            Get your ticket
            <ArrowUpRight className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
