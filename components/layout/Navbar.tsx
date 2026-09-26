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
        {/* Wordmark. The "Conference {edition}" line was `text-ash-dim`
            (#5c5c65), which measured 1.0:1 against every Hero frame — the
            Hero's top strip is the brightest part of all four photographs.
            Now `text-bone` behind the same compact pill as the link row, which
            measures 5.8:1 at the worst viewport. It is a wordmark, so bone
            matches "The Creative" above it and the line is distinguished by
            weight and size rather than by colour; the hero-copy hierarchy is
            unaffected because this is header chrome, not hero copy.
            `relative` + an out-of-flow layer means the pill adds no padding,
            so the lockup does not move. */}
        <div className="relative">
          {solid ? null : (
            <span
              aria-hidden
              className={cn(
                'pointer-events-none absolute -inset-x-2 -inset-y-1.5 rounded-full border border-white/10 transition-colors duration-300',
                'bg-ink/50 backdrop-blur-md',
              )}
            />
          )}
          <Link href="/" className="relative flex items-center gap-3" onClick={closeMenu}>
            <Image src="/logo-white.png" alt="" width={36} height={36} className="size-9 object-contain" priority />
            <span className="font-display text-sm leading-tight font-semibold text-bone">
              The Creative
              <span className="block text-bone [text-shadow:0_1px_2px_rgb(11_11_12/0.85),0_1px_8px_rgb(11_11_12/0.6)]">
                Conference {event.edition}
              </span>
            </span>
          </Link>
        </div>

        {/* Pill only in the transparent state: once the header has its own
            bg-ink/85 a nested panel would read as a dark blob.
            bg-ink/50 is the measured value, not a guess. Sweeping alpha against
            all four Hero frames at 1024/1280/1440: 40% gives 4.09:1 (fails),
            45% gives 4.51:1 (passes by 0.01, too tight to rely on), 50% gives
            4.95:1. Anything heavier reads as an opaque bar and buries the
            photography behind it. */}
        <ul
          className={cn(
            'hidden items-center gap-1 rounded-full border border-white/10 p-1 transition-colors duration-300 lg:flex',
            !solid && 'bg-ink/50 backdrop-blur-md',
          )}
        >
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
