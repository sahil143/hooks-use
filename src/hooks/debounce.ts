import { useCallback } from 'react';
import { debounce } from '../utils';
import { Callback } from '../types';

export const useDebounceCallback = <T extends Callback>(
  callback: T,
  dependencies: any[],
  timeout = 500
): (() => void) => useCallback(debounce<T>(callback, timeout), dependencies);
