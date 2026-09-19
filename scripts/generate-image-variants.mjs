// Build-time responsive image variants (Option C).
//
// Reads the heavy static sources under public/images/{editions,team,sponsors},
// emits fixed-width JPEG/PNG variants under public/images/optimized/ plus a
// manifest at data/image-variants.json consumed by lib/image-variants.ts.
//
// Sources are never modified. Re-runs skip up-to-date outputs, so incremental
// builds stay fast. Runs automatically via the `prebuild` npm script, which
// guarantees the variants exist before `next build` serves them as static
// assets. No runtime sharp/libvips work happens per request afterwards.
//
// Usage: node scripts/generate-image-variants.mjs

import { mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(root, 'public');
const OUT_ROOT = join(PUBLIC, 'images', 'optimized');
const MANIFEST = join(root, 'data', 'image-variants.json');

// Width ladder: covers 96px mobile slots @DPR1-3, team cards @DPR3, desktop.
// 2048 is appended per-source below when the source exceeds it (master cap).
const BASE_WIDTHS = [192, 256, 384, 512, 768, 1024];
const MASTER_WIDTH = 2048;
const JPEG_QUALITY = 78;

const SOURCE_DIRS = [
  join(PUBLIC, 'images', 'editions'),
  join(PUBLIC, 'images', 'team'),
  join(PUBLIC, 'images', 'sponsors'),
  join(PUBLIC, 'images', 'background'),
];

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function listSources() {
  const out = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        // Never recurse into our own output tree.
        if (full === OUT_ROOT) continue;
        walk(full);
      } else if (IMAGE_EXTS.has(extname(entry.name).toLowerCase())) {
        out.push(full);
      }
    }
  };
  for (const dir of SOURCE_DIRS) walk(dir);
  return out.sort();
}

function variantRel(sourceRel, width, ext) {
  // images/editions/2025/X.jpg -> images/optimized/editions/2025/X-192.jpg
  const inner = sourceRel.startsWith('images/') ? sourceRel.slice('images/'.length) : sourceRel;
  const dot = inner.lastIndexOf('.');
  return `images/optimized/${inner.slice(0, dot)}-${width}.${ext}`;
}

async function processSource(sourcePath) {
  const sourceRel = relative(PUBLIC, sourcePath).split(sep).join('/');
  const publicSrc = `/${sourceRel}`;
  const meta = await sharp(sourcePath).metadata();
  if (!meta.width || !meta.height) throw new Error(`unreadable image: ${sourceRel}`);

  const longEdge = Math.max(meta.width, meta.height);
  // Preserve transparency: alpha sources stay PNG, opaque sources become JPEG.
  const ext = meta.hasAlpha || meta.channels === 4 ? 'png' : 'jpg';
  const widths = [...BASE_WIDTHS.filter((w) => w < meta.width), ...(longEdge > MASTER_WIDTH ? [MASTER_WIDTH] : [])];
  const targetWidths = widths.length > 0 ? widths : [Math.min(meta.width, BASE_WIDTHS[0])];

  const stats = { written: 0, skipped: 0, bytes: 0, largest: 0 };
  const sourceMtime = statSync(sourcePath).mtimeMs;

  for (const width of targetWidths) {
    const rel = variantRel(sourceRel, width, ext);
    const dest = join(PUBLIC, ...rel.split('/'));
    mkdirSync(dirname(dest), { recursive: true });

    let existing = null;
    try {
      existing = statSync(dest);
    } catch {
      existing = null;
    }
    if (existing && existing.size > 0 && existing.mtimeMs >= sourceMtime) {
      stats.skipped += 1;
      stats.bytes += existing.size;
      stats.largest = Math.max(stats.largest, existing.size);
      continue;
    }

    let pipeline = sharp(sourcePath).resize({ width, withoutEnlargement: true });
    pipeline =
      ext === 'jpg'
        ? pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        : pipeline.png({ compressionLevel: 9 });

    const info = await pipeline.toFile(dest);
    stats.written += 1;
    stats.bytes += info.size;
    stats.largest = Math.max(stats.largest, info.size);
  }

  return { publicSrc, ext, widths: targetWidths, stats };
}

async function main() {
  const sources = listSources();
  if (sources.length === 0) throw new Error('no source images found');

  const manifest = {};
  let written = 0;
  let skipped = 0;
  let bytes = 0;
  let largest = 0;
  let largestFile = '';

  // Small pool keeps build-machine memory bounded while staying fast.
  const POOL = 4;
  for (let i = 0; i < sources.length; i += POOL) {
    const batch = await Promise.all(sources.slice(i, i + POOL).map(processSource));
    for (const { publicSrc, ext, widths, stats } of batch) {
      manifest[publicSrc] = { ext, widths };
      written += stats.written;
      skipped += stats.skipped;
      bytes += stats.bytes;
      if (stats.largest > largest) {
        largest = stats.largest;
        largestFile = publicSrc;
      }
    }
    console.log(`  ... ${Math.min(i + POOL, sources.length)}/${sources.length} sources`);
  }

  const ordered = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => (a < b ? -1 : 1)));
  writeFileSync(MANIFEST, `${JSON.stringify(ordered, null, 2)}\n`);

  console.log(`sources: ${sources.length}`);
  console.log(`variants written: ${written}, skipped (up to date): ${skipped}`);
  console.log(`total generated size: ${(bytes / 1048576).toFixed(1)} MB`);
  console.log(`largest variant: ${(largest / 1024).toFixed(1)} KB (${largestFile})`);
  console.log(`manifest: data/image-variants.json (${Object.keys(ordered).length} entries)`);
}

await main();
