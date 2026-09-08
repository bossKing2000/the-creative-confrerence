'use client';

import { ScrollTrigger, useGSAP } from '@/lib/gsap';

export function ScrollRefresh() {
  useGSAP(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  });

  return null;
}
