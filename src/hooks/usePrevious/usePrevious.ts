import * as React from "react";

/**
 * This hook is used to track the previous value of a variable during component renders.
 * @param value value to track.
 * @returns {T | null} Return the previous value
 */
export const usePrevious = <T>(value: T): T | null => {
  const ref = React.useRef<T | null>(null);

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
