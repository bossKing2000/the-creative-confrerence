import Image from 'next/image';

import { Marquee } from '@/components/ui/Marquee';
import type { ArchivePhoto } from '@/data/event';

interface ArchiveGalleryProps {
  /** Only the active year's photos are ever passed in — nothing is preloaded. */
  photos: ArchivePhoto[];
  /** Remounts the rows on year change so the drift restarts per edition. */
  year: string;
  /** Existing archive destination (Google Drive folder) kept for every frame. */
  href: string;
}

const frame =
  'group/frame relative mx-2 w-36 shrink-0 overflow-hidden rounded-xl border seam bg-smoke transition-colors duration-300 hover:border-bone/25 sm:w-44 lg:w-56';

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
  return (
    <Marquee speed="slow" direction={direction} className="py-2">
      {photos.map(photo => (
        <a
          key={photo.src}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${photo.alt} — open the ${year} archive`}
          className={frame}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 1024px) 14rem, (min-width: 640px) 11rem, 9rem"
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
    <div key={year} className="archive-lead mt-10 space-y-2 lg:mt-12 lg:space-y-3">
      <Row photos={photos} year={year} href={href} direction="left" />
      <Row photos={[...photos].reverse()} year={year} href={href} direction="right" />
    </div>
  );
}
