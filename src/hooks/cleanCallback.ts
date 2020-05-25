import { useRef, useCallback } from 'react';
import { Callback } from '../types';

export default function useCleanCallback<T extends Callback>(rawCallback: T): Callback {
  const cleanupRef = useRef<(Callback| null)>(null);
  const callback = useCallback<T>(
    ((node) => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      if (node) {
        cleanupRef.current = rawCallback(node);
      }
    }) as T,
    [rawCallback],
  );

  return callback;
}
