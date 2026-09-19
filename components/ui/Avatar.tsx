import Image from 'next/image';

import { variantSet } from '@/lib/image-variants';
import { cn, initialsOf } from '@/lib/utils';

interface AvatarProps {
  name: string;
  /** Path under /public. Falls back to initials when absent. */
  photo?: string;
  /** Stable seed so a person's fallback tint never changes between renders. */
  seed: string;
  pending?: boolean;
  className?: string;
}

function toneFor(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 100;
  }
  return 9 + (hash % 7);
}

export function Avatar({ name, photo, seed, pending, className }: AvatarProps) {
  if (photo) {
    // Static build-time variants served directly — never through /_next/image,
    // so no runtime sharp/libvips work happens per request (Render OOM fix).
    // Unmapped sources keep the previous next/image behavior.
    const variants = variantSet(photo);

    if (variants) {
      return (
        <img
          src={variants.src}
          srcSet={variants.srcSet}
          sizes="(min-width: 1024px) 352px, (min-width: 640px) 288px, 336px"
          alt={name}
          width={480}
          height={600}
          loading="lazy"
          decoding="async"
          className={cn('h-full w-full object-cover', className)}
        />
      );
    }

    return (
      <Image
        src={photo}
        alt={name}
        width={480}
        height={600}
        sizes="(min-width: 1024px) 352px, (min-width: 640px) 288px, 336px"
        className={cn('h-full w-full object-cover', className)}
      />
    );
  }

  const tone = toneFor(seed);

  return (
    <div
      aria-hidden
      className={cn('flex h-full w-full items-center justify-center', className)}
      style={{
        background: pending
          ? 'linear-gradient(160deg, var(--color-char), var(--color-ink))'
          : `linear-gradient(160deg, hsl(240 4% ${tone + 6}%), hsl(240 5% ${tone - 3}%))`,
      }}
    >
      <span
        className={cn(
          'font-display text-5xl font-semibold tracking-tight',
          pending ? 'text-ash-dim/40' : 'text-bone/25',
        )}
      >
        {pending ? '—' : initialsOf(name)}
      </span>
    </div>
  );
}
