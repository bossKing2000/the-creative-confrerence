import path from 'node:path';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Pins the workspace root. Without it Next walks up and finds an unrelated
  // lockfile in the home directory, then infers the wrong root.
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  // Local public assets only — archive photography now lives under
  // public/images/editions/<year>/, so no remote image patterns are needed.
  images: {
    // Granular device sizes for responsive images.
    // Covers mobile (96-640), tablet (640-1280), desktop (1280+).
    deviceSizes: [96, 128, 192, 256, 384, 512, 640, 768, 1024, 1280, 1536, 2048, 2560, 3840],
    // Granular image sizes for fixed-width images (Avatar, etc.).
    // Covers small thumbnails up to large hero images.
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024, 1536, 2048],
  },
};

export default nextConfig;
