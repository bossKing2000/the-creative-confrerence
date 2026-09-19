'use client';

import { useCallback, useSyncExternalStore } from 'react';

function subscribeToQuery(query: string, onChange: () => void): () => void {
  const media = window.matchMedia(query);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

export function useMediaQuery(query: string): boolean {
  // useSyncExternalStore reads the live matchMedia value during render
  // (correct on first client paint, including hydration) and only
  // re-renders on 'change' events — no setState-in-effect needed.
  // Server snapshot is false; hydration patches the class attributes that
  // depend on it, exactly as the previous implementation did post-mount.
  const subscribe = useCallback((onChange: () => void) => subscribeToQuery(query, onChange), [query]);
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
