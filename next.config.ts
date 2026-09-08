import path from 'node:path';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Pins the workspace root. Without it Next walks up and finds an unrelated
  // lockfile in the home directory, then infers the wrong root.
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
