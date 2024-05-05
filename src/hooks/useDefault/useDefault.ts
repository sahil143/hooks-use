import * as React from "react";

/**
 * This React hook is used to manage state with a default value.
 * @param initialValue The initial state value.
 * @param defaultValue The default value to be returned if the updated state is undefined or null. If not provided, defaults to the initialValue.
 * @returns {[T, React.Dispatch<React.SetStateAction<T | undefined | null>>]} An array with state value and a function to update the state.
 */
export const useDefault = <T>(
  initialValue: T,
  defaultValue: T = initialValue,
): [T, React.Dispatch<React.SetStateAction<T | undefined | null>>] => {
  const [state, setState] = React.useState<T | undefined | null>(initialValue);

  if (state === undefined || state === null) {
    return [defaultValue, setState];
  }

  return [state, setState];
};
