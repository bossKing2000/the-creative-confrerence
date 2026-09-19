'use client';

import { Marquee } from '@/components/ui/Marquee';
import type { ArchivePhoto } from '@/data/event';
import { variantSet } from '@/lib/image-variants';
import { useMediaQuery } from '@/lib/media-query';

interface ArchiveGalleryProps {
  photos: ArchivePhoto[];
  year: string;
}

const frameBase =
  'group/frame relative mx-2 shrink-0 overflow-hidden rounded-xl border seam bg-smoke transition-colors duration-300 hover:border-bone/25';
const frameMobile = 'w-24';
const frameTablet = 'sm:w-32';
const frameDesktop = 'lg:w-40 xl:w-48';

/**
 * Static build-time variants served directly — never through /_next/image,
 * so no runtime sharp/libvips work happens per request (Render OOM fix).
 */
function FrameImage({ photo }: { photo: ArchivePhoto }) {
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
      style={{ objectPosition: photo.position ?? '50% 25%' }}
      className="aspect-[3/4] h-full w-full object-cover"
    />
  );
}

function Row({ photos, direction }: { photos: ArchivePhoto[]; direction: 'left' | 'right' }) {
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const speed = prefersReduced ? false : 'slow';
  const frameClass = `${frameBase} ${frameMobile} ${frameTablet} ${frameDesktop}`;

  if (prefersReduced) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 snap-x snap-mandatory">
        {photos.map(photo => (
          <div key={photo.src} className={`${frameClass} flex-shrink-0 snap-center`}>
            <FrameImage photo={photo} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <Marquee speed={speed} direction={direction} className="py-2 marquee-rolling" disableOnMobile>
      {photos.map(photo => (
        <div key={photo.src} className={frameClass}>
          <FrameImage photo={photo} />
        </div>
      ))}
    </Marquee>
  );
}

export function ArchiveGallery({ photos, year }: ArchiveGalleryProps) {
  if (photos.length === 0) return null;

  return (
    <div key={year} className="archive-film archive-lead mt-10 space-y-2 lg:mt-12 lg:space-y-3">
      <Row photos={photos} direction="left" />
      <Row photos={[...photos].reverse()} direction="right" />
    </div>
  );
}
