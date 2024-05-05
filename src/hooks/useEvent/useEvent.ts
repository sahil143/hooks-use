import * as React from "react";

/**
 * Custom hook that lets you define event handlers that can read the latest props/state but have always stable function identity.
 * @param {Function} [callback]
 * @returns {Function} A function whose reference is not changed but get updated value everytime it executes.
 *
 * @example
 * ```typescript
 * const handleInterval = useEvent(() => {
 *   // Code to be executed at each interval
 * });
 * setInterval(handleInterval, 1000);
 * ```
 */

// eslint-disable-next-line @typescript-eslint/ban-types
export const useEvent = <C extends Function>(callback: C) => {
  const callbackRef = React.useRef<C>(callback);
  // This hook will run before layout effect
  React.useInsertionEffect(() => {
    callbackRef.current = callback;
  });
  return React.useCallback((...args: any[]) => {
    return callbackRef.current(...args);
  }, []);
};
