'use client';

import Image from 'next/image';

import { Marquee } from '@/components/ui/Marquee';
import type { ArchivePhoto } from '@/data/event';
import { useMediaQuery } from '@/lib/media-query';

interface ArchiveGalleryProps {
  photos: ArchivePhoto[];
  year: string;
  href: string;
}

const frameBase =
  'group/frame relative mx-2 shrink-0 overflow-hidden rounded-xl border seam bg-smoke transition-colors duration-300 hover:border-bone/25';
const frameMobile = 'w-24';
const frameTablet = 'sm:w-32';
const frameDesktop = 'lg:w-40 xl:w-48';

function Row({
  photos,
  year,
  href,
  direction,
}: {
  photos: ArchivePhoto[];
  year: string;
  href: string;
  direction: 'left' | 'right';
}) {
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const speed = prefersReduced ? false : 'slow';
  const frameClass = `${frameBase} ${frameMobile} ${frameTablet} ${frameDesktop}`;

  if (prefersReduced) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 snap-x snap-mandatory">
        {photos.map(photo => (
          <a
            key={photo.src}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${photo.alt} — open the ${year} archive`}
            className={`${frameClass} flex-shrink-0 snap-center`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 192px, (min-width: 640px) 160px, 96px"
              loading="lazy"
              draggable={false}
              style={{ objectPosition: photo.position ?? '50% 25%' }}
              className="aspect-[3/4] h-full w-full object-cover"
            />
          </a>
        ))}
      </div>
    );
  }

  return (
    <Marquee speed={speed} direction={direction} className="py-2" disableOnMobile>
      {photos.map(photo => (
        <a
          key={photo.src}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${photo.alt} — open the ${year} archive`}
          className={frameClass}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 1024px) 192px, (min-width: 640px) 160px, 96px"
            loading="lazy"
            draggable={false}
            style={{ objectPosition: photo.position ?? '50% 25%' }}
            className="aspect-[3/4] h-full w-full object-cover"
          />
        </a>
      ))}
    </Marquee>
  );
}

export function ArchiveGallery({ photos, year, href }: ArchiveGalleryProps) {
  if (photos.length === 0) return null;

  return (
    <div key={year} className="archive-film archive-lead mt-10 space-y-2 lg:mt-12 lg:space-y-3">
      <Row photos={photos} year={year} href={href} direction="left" />
      <Row photos={[...photos].reverse()} year={year} href={href} direction="right" />
    </div>
  );
}
