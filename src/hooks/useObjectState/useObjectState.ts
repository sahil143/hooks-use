import * as React from "react";

/**
 * A flexible action used to update an object state in React. This function can either update the entire state object or update a specific key within the state object.
 * @param {keyof S | React.SetStateAction<S>} keyOrUpdater This parameter can be either:
 *         A key of the state object (keyof S), in which case updater is used to update the value of that key.
 *         A state updater function or a new state object (React.SetStateAction<S>), in which case it updates the entire state object.
 * @param {React.SetStateAction<S[keyof S]>} updater If keyOrUpdater is a key of the state object, this parameter is used to update the value of that key. It can be:
 *         A new value for the key.
 *         A function that takes the current value of the key and returns the new value.
 */
type UpdaterAction<S> = (
  keyOrUpdater: keyof S | React.SetStateAction<S>,
  updater?: React.SetStateAction<S[keyof S]>,
) => void;

/**
 * A custom React hook that manages an object state with a flexible update function. It will merge the new state with the old state instead of replacing it.
 * @template S Type of object
 * @param {S} initialState  initial value for the state (default)
 * @returns {[S, UpdaterAction<S>]} returns an array containing state and a method to update the state
 */
export const useObjectState = <S extends object>(
  initialState: S,
): [S, UpdaterAction<S>] => {
  const [state, setState] = React.useState<S>(initialState ?? {});

  const updateState: UpdaterAction<S> = React.useCallback(
    (keyOrUpdater, updater) => {
      setState((s) => {
        if (typeof keyOrUpdater === "string") {
          if (typeof updater === "function") {
            const newState = (updater as (state: S[keyof S]) => S[keyof S])(
              s[keyOrUpdater],
            );
            return {
              ...s,
              [keyOrUpdater]: newState,
            };
          }
          return {
            ...s,
            [keyOrUpdater]: updater,
          };
        } else {
          if (typeof keyOrUpdater === "function") {
            const newState = (keyOrUpdater as (state: S) => S)(s);
            return {
              ...s,
              ...newState,
            };
          } else {
            return { ...s, ...(keyOrUpdater as S) };
          }
        }
      });
    },
    [],
  );

  return [state, updateState];
};
