import * as React from "react";
import { useEvent } from "../useEvent";

/**
 * A custom hook that provides a way to create and manages timeouts using setTimeout.
 *
 * @param {Function} callback The function to call when the timer elapses.
 * @param {number} delay The number of milliseconds to wait before calling the `callback`
 * @returns {() => void} Callback to cancel the Timeout set by setTimeout
 */
export const useTimeout = (callback: () => void, delay: number) => {
  const timeoutId = React.useRef<number>();
  const timeoutCallback = useEvent(callback);

  const handleClearTimeout = React.useCallback(() => {
    clearTimeout(timeoutId.current);
  }, []);

  React.useEffect(() => {
    timeoutId.current = setTimeout(timeoutCallback, delay);

    return handleClearTimeout;
  }, [delay, handleClearTimeout]);

  return handleClearTimeout;
};
