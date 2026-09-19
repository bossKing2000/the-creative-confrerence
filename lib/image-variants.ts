import manifest from '@/data/image-variants.json';

interface VariantEntry {
  ext: 'jpg' | 'png';
  widths: number[];
}

const table = manifest as Record<string, VariantEntry>;

function variantUrl(src: string, width: number, ext: string): string {
  const dot = src.lastIndexOf('.');
  const path = dot >= 0 ? src.slice(0, dot) : src;
  // /images/editions/2025/X.jpg -> /images/optimized/editions/2025/X-192.jpg
  const inner = path.startsWith('/images/') ? path.slice('/images/'.length) : path;
  return encodeURI(`/images/optimized/${inner}-${width}.${ext}`);
}

export interface VariantSet {
  /** Largest variant — sensible default `src`. */
  src: string;
  /** Width-described candidates for the browser to choose from. */
  srcSet: string;
}

/**
 * Resolve a public source path (e.g. `/images/editions/2025/X.jpg`) to its
 * build-time generated static variants. Returns null when the source has no
 * variants, in which case callers fall back to their previous behavior.
 */
export function variantSet(src: string): VariantSet | null {
  const entry = table[src];
  if (!entry || entry.widths.length === 0) return null;

  const urls = entry.widths.map(width => `${variantUrl(src, width, entry.ext)} ${width}w`);
  return { src: urls[urls.length - 1].split(' ')[0], srcSet: urls.join(', ') };
}
