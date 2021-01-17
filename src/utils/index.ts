import { Callback } from '../types';

export function debounce<T extends Callback>(
  func: T,
  wait: number,
  immediate?: boolean
): () => void {
  let timeout: any;

  return function executedFunction(
    this: typeof executedFunction,
    ...args
  ): void {
    const context = this;
    const later = function() {
      timeout = undefined;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}
