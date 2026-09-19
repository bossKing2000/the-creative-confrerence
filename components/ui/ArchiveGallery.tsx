'use client';

import { useEffect, useRef, useState } from 'react';

import { Marquee } from '@/components/ui/Marquee';
import type { ArchivePhoto } from '@/data/event';
import { variantSet } from '@/lib/image-variants';
import { useMediaQuery } from '@/lib/media-query';

interface ArchiveGalleryProps {
  photos: ArchivePhoto[];
  year: string;
}

/** Bounded backoff between retry probes: ~2s, ~5s, ~15s — then stop. */
const RETRY_DELAYS = [2000, 5000, 15000];

const frameBase =
  'group/frame relative mx-2 shrink-0 overflow-hidden rounded-xl border seam bg-smoke transition-colors duration-300 hover:border-bone/25';
const frameMobile = 'w-24';
const frameTablet = 'sm:w-32';
const frameDesktop = 'lg:w-40 xl:w-48';

/**
 * Static build-time variants served directly — never through /_next/image,
 * so no runtime sharp/libvips work happens per request (Render OOM fix).
 */
function FrameImage({
  photo,
  onFailure,
  onRecovered,
}: {
  photo: ArchivePhoto;
  onFailure: (src: string) => void;
  onRecovered: (src: string) => void;
}) {
  const variants = variantSet(photo.src);

  return (
    <img
      src={variants?.src ?? photo.src}
      srcSet={variants?.srcSet}
      sizes="(min-width: 1024px) 192px, (min-width: 640px) 160px, 96px"
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => onFailure(photo.src)}
      onLoad={() => onRecovered(photo.src)}
      style={{ objectPosition: photo.position ?? '50% 25%' }}
      className="aspect-[3/4] h-full w-full object-cover"
    />
  );
}

function Row({
  photos,
  visible,
  onFailure,
  onRecovered,
  direction,
}: {
  photos: ArchivePhoto[];
  visible: (src: string) => boolean;
  onFailure: (src: string) => void;
  onRecovered: (src: string) => void;
  direction: 'left' | 'right';
}) {
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const speed = prefersReduced ? false : 'slow';
  const frameClass = `${frameBase} ${frameMobile} ${frameTablet} ${frameDesktop}`;
  const shown = photos.filter(photo => visible(photo.src));

  if (prefersReduced) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 snap-x snap-mandatory">
        {shown.map(photo => (
          <div key={photo.src} className={`${frameClass} flex-shrink-0 snap-center`}>
            <FrameImage photo={photo} onFailure={onFailure} onRecovered={onRecovered} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <Marquee speed={speed} direction={direction} className="py-2 marquee-rolling" disableOnMobile>
      {shown.map(photo => (
        <div key={photo.src} className={frameClass}>
          <FrameImage photo={photo} onFailure={onFailure} onRecovered={onRecovered} />
        </div>
      ))}
    </Marquee>
  );
}

export function ArchiveGallery({ photos, year }: ArchiveGalleryProps) {
  // Sources currently excluded after a load failure. Failed frames unmount
  // completely (no broken icons, no reserved boxes); the filter preserves
  // array order, so a recovered photo rejoins its original position.
  const [failed, setFailed] = useState<ReadonlySet<string>>(() => new Set());
  // Retry bookkeeping lives in refs (never rendered): at most ONE pending
  // timer per failed source, plus its attempt count and in-flight probe.
  const attempts = useRef(new Map<string, number>());
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const probes = useRef(new Map<string, HTMLImageElement>());

  const clearRetry = (src: string) => {
    const timer = timers.current.get(src);
    if (timer !== undefined) {
      clearTimeout(timer);
      timers.current.delete(src);
    }
    const probe = probes.current.get(src);
    if (probe) {
      probe.onload = null;
      probe.onerror = null;
      probes.current.delete(src);
    }
    attempts.current.delete(src);
  };

  const recover = (src: string) => {
    clearRetry(src);
    setFailed(previous => {
      if (!previous.has(src)) return previous;
      const next = new Set(previous);
      next.delete(src);
      return next;
    });
  };

  const scheduleRetry = (src: string) => {
    // One pending timer per source, at most three attempts total.
    if (timers.current.has(src)) return;
    const attempt = attempts.current.get(src) ?? 0;
    if (attempt >= RETRY_DELAYS.length) return;
    attempts.current.set(src, attempt + 1);

    const probeUrl = variantSet(src)?.smallest;
    // Without variants there is nothing cheap to probe — stay excluded.
    if (!probeUrl) return;

    const id = setTimeout(() => {
      timers.current.delete(src);
      const probe = new Image();
      probes.current.set(src, probe);
      probe.onload = () => recover(src);
      probe.onerror = () => {
        probes.current.delete(src);
        scheduleRetry(src);
      };
      probe.src = probeUrl;
    }, RETRY_DELAYS[attempt]);
    timers.current.set(src, id);
  };

  const reportFailure = (src: string) => {
    setFailed(previous => (previous.has(src) ? previous : new Set(previous).add(src)));
    scheduleRetry(src);
  };

  const reportRecovered = (src: string) => {
    // The mounted <img>'s own load state is authoritative: a successful
    // load cancels any pending retry so no duplicate probe fires.
    if (timers.current.has(src)) recover(src);
    else if (attempts.current.has(src)) attempts.current.delete(src);
  };

  // Edition remounts (key={year}) and unmounts run this cleanup: no timers
  // or probes ever outlive the gallery they belong to.
  useEffect(
    () => () => {
      timers.current.forEach(timer => clearTimeout(timer));
      timers.current.clear();
      probes.current.forEach(probe => {
        probe.onload = null;
        probe.onerror = null;
      });
      probes.current.clear();
      attempts.current.clear();
    },
    [],
  );

  const isVisible = (src: string) => !failed.has(src);

  if (photos.length === 0) return null;

  return (
    <div key={year} className="archive-film archive-lead mt-10 space-y-2 lg:mt-12 lg:space-y-3">
      <Row
        photos={photos}
        visible={isVisible}
        onFailure={reportFailure}
        onRecovered={reportRecovered}
        direction="left"
      />
      <Row
        photos={[...photos].reverse()}
        visible={isVisible}
        onFailure={reportFailure}
        onRecovered={reportRecovered}
        direction="right"
      />
    </div>
  );
}
