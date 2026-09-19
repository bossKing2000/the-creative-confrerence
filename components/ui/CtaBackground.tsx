import manifest from '@/data/image-variants.json';
import { variantSet } from '@/lib/image-variants';

// Keep in sync with the cta-xfade keyframes in globals.css:
// 13 slides × SLOT_S per slide. If the background set changes size, update
// the keyframe percentages (SLOT_S / (COUNT * SLOT_S)) to match.
const SLOT_S = 7;

function backgroundSources(): string[] {
  return Object.keys(manifest as Record<string, unknown>)
    .filter(src => src.startsWith('/images/background/'))
    .sort();
}

/**
 * Slow cinematic crossfade of event photography behind the FinalCTA content.
 *
 * Server component — no timers, no state, no client JS. Each slide is an
 * absolutely positioned <img> driven purely by the `cta-xfade` CSS animation
 * with a staggered delay; the first slide is also the no-animation fallback,
 * so first paint and `prefers-reduced-motion` both show a static image.
 * Static build-time variants are served directly (never /_next/image).
 */
export function CtaBackground() {
  const sources = backgroundSources();
  const count = sources.length;
  if (count === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      {sources.map((src, index) => {
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
            style={{ objectPosition: '50% 40%', animationDelay: `${index * SLOT_S}s` }}
            className="cta-bg-slide absolute inset-0 h-full w-full object-cover"
          />
        );
      })}

      {/* Normalizes the 68–151 luminance spread across the set and preserves
          the section's black identity: effective background lands ≈26–60. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgb(11 11 12 / 0.78), rgb(11 11 12 / 0.60) 40%, rgb(11 11 12 / 0.62) 60%, rgb(11 11 12 / 0.78))',
        }}
      />
    </div>
  );
}
