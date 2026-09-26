import { variantSet } from '@/lib/image-variants';

// Keep in sync with the hero-xfade keyframes in globals.css:
// 4 slides × SLOT_S per slide. If the rotation set changes size, update the
// keyframe percentages (SLOT_S / (COUNT * SLOT_S)) to match.
const SLOT_S = 6;

// Length of the crossfade at the head of each slot. Every slide is offset by
// -FADE_S, which does two things at once:
//   1. Slide 1 starts mid-hold at full opacity, so the very first painted
//      frame already shows a photograph instead of fading up from an empty
//      hero (the keyframes begin at opacity 0, and `backwards` fill applies
//      that 0% value during each slide's positive delay).
//   2. Slide 4's fade-out lands exactly on the loop boundary, so the rotation
//      closes without a seam.
const FADE_S = 1.5;

// Phones get their own 9:16 crop of the same moment. Below this width a 16:9
// frame would lose ~65% of its width to `object-cover`, so the crop is chosen
// for composition rather than for file size.
const MOBILE_QUERY = '(max-width: 767px)';

/**
 * Flat base scrim, painted underneath the radials on every slide.
 * Only enough to stop specular highlights clipping to pure white and to tie
 * the rotation together. The treatment it replaces was a full-screen
 * `linear-gradient` running 0.40-0.58 top to bottom, so this is roughly a
 * 60% cut to the flat floor. It is also the only layer that reaches the frame
 * corners, which makes it the number to lower first if the photography ever
 * looks too dim.
 */
const BASE_ALPHA = 0.22;

interface Slide {
  /** Landscape frame, served at >= 768px. */
  desktop: string;
  /** 9:16 crop of the same moment, served below 768px. */
  mobile: string;
  /**
   * Peak alpha of each radial scrim, 0-1. Tuned per slide from the measured
   * p95 luminance behind the actual glyphs, so one bright frame never forces
   * the whole rotation darker. Raising these uniformly is what produced the
   * previous heavy, muddy result.
   *
   * `body` sits over the headline, copy, buttons and countdown. `band` sits
   * over the date/venue eyebrow, which is 12px and lands in the brightest
   * strip of every one of these photographs — measured at 12-29% of the
   * section height depending on viewport, so it gets its own wide, shallow
   * pool of shade rather than forcing `body` to grow tall enough to dim the
   * whole frame.
   */
  scrim: { body: number; band: number };
}

// Desktop/mobile pairs were matched by subject, NOT by filename number — the
// "N potrait" file is a portrait crop of a *different* numbered frame, so
// pairing by index would ship mismatched moments. Two of these numbers also
// disagree on colour (5.png and 2 potrait.png are monochrome), so the
// monochrome frames are excluded outright: every slide below is full colour.
const SOURCES: Slide[] = [
  // Darkest frame in the set (p95 142 in the text band) — needs the least help.
  {
    desktop: '/images/background/6.png',
    mobile: '/images/background/1 potrait.png',
    scrim: { body: 0.34, band: 0.46 },
  },
  // Warm window light falling behind the headline.
  { desktop: '/images/background/4.png', mobile: '/images/background/3 potrait.png', scrim: { body: 0.4, band: 0.5 } },
  // Portrait twin is a little brighter than its own landscape frame.
  {
    desktop: '/images/background/3.png',
    mobile: '/images/background/4 potrait.png',
    scrim: { body: 0.44, band: 0.44 },
  },
  // Brightest frame in the set (p95 213 — blown highlights on light clothing
  // and the doorway). Only this slide pays for that, which is what lets the
  // other three sit near-untouched and keep their colour.
  { desktop: '/images/background/2.png', mobile: '/images/background/5 potrait.png', scrim: { body: 0.65, band: 0.6 } },
];

/**
 * Three-layer scrim for one slide, as a single `background` value.
 *
 * Layers composite front to back, so combined alpha at any point is
 * `1 - (1 - BASE_ALPHA) * (1 - band) * (1 - body)`. Both radials feather to
 * zero at their edge, so there is no visible boundary, seam or geometric shape
 * anywhere, and neither one reaches the frame corners — at desktop widths the
 * measured corner luminance is unchanged by the `band` layer, which is what
 * makes the second gradient effectively free rather than a step towards the
 * flat wash this replaced.
 */
function scrimBackground({ body, band }: Slide['scrim']): string {
  const bodyMid = +(body * 0.55).toFixed(3);
  const bandMid = +(band * 0.5).toFixed(3);

  return (
    // Shallow pool over the date/venue eyebrow. Wide and tall enough to catch
    // it at every breakpoint (it rides between 12% and 29% of section height).
    `radial-gradient(ellipse 58% 15% at 50% 20%, rgb(11 11 12 / ${band}) 0%, ` +
    `rgb(11 11 12 / ${bandMid}) 60%, rgb(11 11 12 / 0) 100%), ` +
    // Main pool over the headline, copy, buttons and countdown.
    `radial-gradient(ellipse 62% 48% at 50% 50%, rgb(11 11 12 / ${body}) 0%, ` +
    `rgb(11 11 12 / ${bodyMid}) 55%, rgb(11 11 12 / 0) 100%), ` +
    `rgb(11 11 12 / ${BASE_ALPHA})`
  );
}

/**
 * Slow full-colour crossfade of event photography behind the Hero content.
 *
 * Server component — no timers, no state, no client JS. Each slide is an
 * absolutely positioned <picture> driven purely by the `hero-xfade` CSS
 * animation with a staggered delay; the first slide is also the no-animation
 * fallback, so first paint and `prefers-reduced-motion` both show a static
 * image. Static build-time variants are served directly (never /_next/image).
 */
export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      {SOURCES.map((slide, index) => {
        const desktop = variantSet(slide.desktop);
        const mobile = variantSet(slide.mobile);
        if (!desktop || !mobile) return null;

        return (
          <div
            key={slide.desktop}
            className="hero-bg-slide absolute inset-0"
            style={{ animationDelay: `${index * SLOT_S - FADE_S}s` }}
          >
            {/* The browser commits to the first matching <source> and never
                fetches the <img> candidates, so phones download only the
                portrait variants and desktops only the landscape ones. */}
            <picture className="block h-full w-full">
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
            <div aria-hidden className="absolute inset-0" style={{ background: scrimBackground(slide.scrim) }} />
          </div>
        );
      })}
    </div>
  );
}
