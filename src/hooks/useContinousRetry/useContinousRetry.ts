import * as React from "react";
import { useEvent } from "../useEvent";

/**
 * A custom hook that repeatedly call a callback funtion at a defined interval untill the callback return truthy value.
 * @param {() => boolean} callback Callback function that returns true when resolved
 * @param {number} interval The number of milliseconds to wait before calling the `callback` aging
 * @param {{maxRetries: number}} options  Options for the hook, maxRetries: should stop calling the callback function if the number of retries exceeds the maxRetries option
 * @returns return a boolean that indicates that callback has been resolved
 */
export const useContinousRetry = (
  callback: () => boolean,
  interval: number,
  options?: { maxRetries: number },
): boolean => {
  const { maxRetries = Infinity } = options ?? {};
  const [resolved, setResolved] = React.useState<boolean>(false);
  const onInterval = useEvent(callback);

  React.useEffect(() => {
    let retries = 0;

    const intervalId = setInterval(() => {
      if (onInterval()) {
        setResolved(true);
        window.clearInterval(intervalId);
      } else if (retries >= maxRetries) {
        window.clearInterval(intervalId);
      } else {
        retries += 1;
      }
    }, interval);

    return () => window.clearInterval(intervalId);
  }, [interval]);

  return resolved;
};
