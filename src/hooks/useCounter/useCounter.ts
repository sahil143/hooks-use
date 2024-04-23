import * as React from "react";

/**
 * Additional options for the hook
 */
type UseCounterOptions = {
  /**
   * Minimum value of the counter
   */
  min?: number;
  /**
   * Maximum value of the counter
   */
  max?: number;
};

type UseCounterReturnType = [
  /**
   * Current value of counter
   */
  number,
  {
    /**
     * Increase counter by 1, will not decrease the counter once counter value is equal to {@link UseCounterOptions.max}
     * @returns {void}
     */
    increment: () => void;

    /**
     * Decrease counter by 1, will not decrease the counter once counter value is equal to {@link UseCounterOptions.min}
     * @returns {void}
     */
    decrement: () => void;

    /**
     * Reset the counter value to initialValue
     * @returns {void}
     */
    reset: () => void;

    /**
     * setState method to update the counter value, Respects minimum and maximum value declared in {@link UseCounterOptions}
     */
    set: React.Dispatch<React.SetStateAction<number>>;
  },
];

/**
 * Custom hook for managing a counter with customizable minimum and maximum values.
 * @param {number} initialValue @default 0 Initial value for the counter
 * @param {UseCounterOptions} options Additional options for hook, If options are provided then {@link initialValue} should be greater than {@link UseCounterOptions.min} and less than {@link UseCounterOptions.max}
 * @returns {UseCounterReturnType} An array that contains counter value at index 0 and utils to modify counter at index 1.
 */
const useCounter = (
  initialValue: number = 0,
  options?: UseCounterOptions,
): UseCounterReturnType => {
  const [count, setCount] = React.useState<number>(initialValue);

  if (typeof options?.min === "number" && initialValue < options.min) {
    throw new Error(
      `Initial value ${initialValue} is less than min value ${options.min}`,
    );
  }

  if (typeof options?.max === "number" && initialValue > options.max) {
    throw new Error(
      `Initial value ${initialValue} is greater than max value ${options.max}`,
    );
  }

  const increment = React.useCallback(() => {
    setCount((c) => {
      if (options?.max === undefined || c < (options?.max as number)) {
        return c + 1;
      }
      return c;
    });
  }, [options?.max]);

  const decrement = React.useCallback(() => {
    setCount((c) => {
      if (options?.min === undefined || c > (options?.min as number)) {
        return c - 1;
      }
      return c;
    });
  }, [options?.min]);

  const reset = React.useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  const set = React.useCallback(
    (value: React.SetStateAction<number>) => {
      setCount((prevState) => {
        const newState = typeof value === "function" ? value(prevState) : value;
        if (typeof options?.max === "number" && newState > options.max) {
          return prevState;
        }

        if (typeof options?.min === "number" && newState < options.min) {
          return prevState;
        }

        return newState;
      });
    },
    [options],
  );

  return [count, { increment, decrement, reset, set }];
};

export default useCounter;
