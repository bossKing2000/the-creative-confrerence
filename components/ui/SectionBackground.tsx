import { variantSet } from '@/lib/image-variants';

interface SectionBackgroundProps {
  /** Public source path, e.g. `/images/background/lower.jpeg`. */
  src: string;
  /** Width-described slot; full-bleed sections use `100vw`. */
  sizes?: string;
  /** Focal point inside `object-cover` cropping. */
  position?: string;
  /** Dark scrim above the photo; tune per section for text readability. */
  overlay?: string;
  /** Render the photo monochrome (GPU filter, no extra files). */
  grayscale?: boolean;
  /** Above-the-fold images load eagerly; below-the-fold lazily. */
  eager?: boolean;
}

/**
 * One static background photograph behind section content.
 *
 * Server component — no timers, no state, no client JS, no animation.
 * Serves build-time generated variants directly (never /_next/image), so no
 * runtime sharp/libvips work happens per request (Render OOM fix).
 * Always `pointer-events-none` + `aria-hidden`: purely decorative.
 */
export function SectionBackground({
  src,
  sizes = '100vw',
  position = '50% 50%',
  overlay,
  grayscale = false,
  eager = false,
}: SectionBackgroundProps) {
  const variants = variantSet(src);
  if (!variants) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      <img
        src={variants.src}
        srcSet={variants.srcSet}
        sizes={sizes}
        alt=""
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        draggable={false}
        style={{ objectPosition: position }}
        className={`absolute inset-0 h-full w-full object-cover${grayscale ? ' grayscale' : ''}`}
      />
      {overlay ? <div aria-hidden className="absolute inset-0" style={{ background: overlay }} /> : null}
    </div>
  );
}
