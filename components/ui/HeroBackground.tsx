import { variantSet } from '@/lib/image-variants';

// Keep in sync with the hero-xfade keyframes in globals.css:
// 4 slides × SLOT_S per slide. If the rotation set changes size, update the
// keyframe percentages (SLOT_S / (COUNT * SLOT_S)) to match.
const SLOT_S = 6;

// Length of the crossfade at the head of each slot. Every slide is offset by
// -FADE_S, so slide 1 starts mid-hold at full opacity (the very first painted
// frame already shows a photograph) and slide 4's fade-out lands exactly on
// the loop boundary. See the pre-change history for the full rationale.
const FADE_S = 1.5;

// Phones get their own 9:16 crop of the same moment. Below this width a 16:9
// frame would lose ~65% of its width to `object-cover`, so the crop is chosen
// for composition rather than for file size.
const MOBILE_QUERY = '(max-width: 767px)';

/**
 * The single uniform black overlay for the Hero image layer.
 *
 * One static element behind the content, not per slide — because the alpha is
 * identical on every frame it is visually indistinguishable from a per-slide
 * scrim, minus the duplication. Swept 0.80/0.82/0.85 against all four frames:
 * 0.82 is the lowest step above the previous 0.80 that visibly deepens the
 * text-first hierarchy; 0.85 starts burying shadow detail with no readability
 * gain, so it was not chosen. Faces, clothing, room and window light all stay
 * visible underneath.
 */
const OVERLAY_ALPHA = 0.8;

interface Slide {
  /** Landscape frame, served at >= 768px. */
  desktop: string;
  /** 9:16 crop of the same moment, served below 768px. */
  mobile: string;
}

// Desktop/mobile pairs were matched by subject, NOT by filename number — the
// "N potrait" file is a portrait crop of a *different* numbered frame, so
// pairing by index would ship mismatched moments. Two of these numbers also
// disagree on colour (5.png and 2 potrait.png are monochrome), so the
// monochrome frames are excluded outright: every slide below is full colour.
const SOURCES: Slide[] = [
  { desktop: '/images/background/6.png', mobile: '/images/background/1 potrait.png' },
  { desktop: '/images/background/4.png', mobile: '/images/background/3 potrait.png' },
  { desktop: '/images/background/3.png', mobile: '/images/background/4 potrait.png' },
  { desktop: '/images/background/2.png', mobile: '/images/background/5 potrait.png' },
];

/**
 * Slow full-colour crossfade of event photography behind the Hero content,
 * under a single uniform black overlay.
 *
 * Server component — no timers, no state, no client JS. Each slide is an
 * absolutely positioned <picture> driven purely by the `hero-xfade` CSS
 * animation with a staggered delay; the first slide is also the no-animation
 * fallback, so first paint and `prefers-reduced-motion` both show a static
 * image. Static build-time variants are served directly (never /_next/image).
 * Visual hierarchy: photograph → black overlay → bright typography. No
 * per-text panels, shapes, lines or shadows anywhere in this layer.
 */
export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      {SOURCES.map((slide, index) => {
        const desktop = variantSet(slide.desktop);
        const mobile = variantSet(slide.mobile);
        if (!desktop || !mobile) return null;

        return (
          <picture
            key={slide.desktop}
            className="hero-bg-slide absolute inset-0 block"
            style={{ animationDelay: `${index * SLOT_S - FADE_S}s` }}
          >
            {/* The browser commits to the first matching <source> and never
                fetches the <img> candidates, so phones download only the
                portrait variants and desktops only the landscape ones. */}
            <source media={MOBILE_QUERY} srcSet={mobile.srcSet} sizes="100vw" />
            <img
              src={desktop.src}
              srcSet={desktop.srcSet}
              sizes="100vw"
              alt=""
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              decoding="async"
              draggable={false}
              style={{ objectPosition: '50% 50%' }}
              className="h-full w-full object-cover"
            />
          </picture>
        );
      })}

      <div aria-hidden className="absolute inset-0" style={{ background: `rgb(11 11 12 / ${OVERLAY_ALPHA})` }} />
    </div>
  );
}
