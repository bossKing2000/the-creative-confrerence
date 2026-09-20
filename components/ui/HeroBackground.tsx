import { variantSet } from '@/lib/image-variants';

// Keep in sync with the hero-xfade keyframes in globals.css:
// 4 slides × SLOT_S per slide. If the rotation set changes size, update the
// keyframe percentages (SLOT_S / (COUNT * SLOT_S)) to match.
const SLOT_S = 6;

const SOURCES = [
  '/images/background/upper.jpg',
  '/images/background/TCC (21 of 116).jpg',
  '/images/background/TCC25 (43 of 113).jpg',
  '/images/background/The Creative Conference  (63 of 88).jpg',
];

/**
 * Slow full-colour crossfade of event photography behind the Hero content.
 *
 * Server component — no timers, no state, no client JS. Each slide is an
 * absolutely positioned <img> driven purely by the `hero-xfade` CSS animation
 * with a staggered delay; the first slide is also the no-animation fallback,
 * so first paint and `prefers-reduced-motion` both show a static image.
 * Static build-time variants are served directly (never /_next/image).
 */
export function HeroBackground({ overlay }: { overlay?: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      {SOURCES.map((src, index) => {
        const variants = variantSet(src);
        if (!variants) return null;

        return (
          <img
            key={src}
            src={variants.src}
            srcSet={variants.srcSet}
            sizes="100vw"
            alt=""
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            decoding="async"
            draggable={false}
            style={{ objectPosition: '50% 50%', animationDelay: `${index * SLOT_S}s` }}
            className="hero-bg-slide absolute inset-0 h-full w-full object-cover"
          />
        );
      })}

      {overlay ? <div aria-hidden className="absolute inset-0" style={{ background: overlay }} /> : null}
    </div>
  );
}
