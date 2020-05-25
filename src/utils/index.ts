import { Callback } from '../types';

export function debounce<T extends Callback>(
  func: T,
  wait: number,
  immediate?: boolean
): () => void {
  let timeout: number | undefined;

  return function executedFunction(...args): void {
    // eslint-disable-next-line
    const context = this;
    const later = function () {
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
