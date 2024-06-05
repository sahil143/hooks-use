import * as React from "react";
import { useEvent } from "../useEvent";

/**
 * A custom hook that schedules repeated execution of `callback` every `delay` milliseconds using setInterval.
 *
 * @param {Function} callback The function to call when the timer elapses.
 * @param {number} delay The number of milliseconds to wait before calling the `callback`
 * @returns {() => void} Callback to cancel the Interval set by setInterval
 */
export const useInterval = (callback: () => void, delay: number) => {
  const intervalId = React.useRef<number>();
  const intervalCallback = useEvent(callback);

  const handleClearInterval = React.useCallback(() => {
    clearInterval(intervalId.current);
  }, []);

  React.useEffect(() => {
    intervalId.current = setInterval(intervalCallback, delay);

    return handleClearInterval;
  }, [delay, handleClearInterval]);

  return handleClearInterval;
};
