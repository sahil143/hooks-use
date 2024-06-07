import * as React from "react";

/**
 * Subscribe callback for useSyncExternalStore hook
 * @param {() => void} callback
 * @returns {() => void}
 */
const subscribeToWindowResize = (callback: () => void): (() => void) => {
  window.addEventListener("resize", callback);
  return () => {
    window.removeEventListener("resize", callback);
  };
};

const getResizeSnapshot = () => {
  return JSON.stringify({
    height: window.innerHeight,
    width: window.innerWidth,
  });
};

/**
 * server side rendering is not available for this hook
 */
const getServerSnapshot = () => {
  throw Error("useWindowSize is a client-only hook");
};

/**
 * A custom hook that returns the updated height and width on window resize.
 * @returns {{ width: number; height: number }} Returns an object containing the height and width of the window
 */
export const useWindowSize = (): { width: number; height: number } => {
  return JSON.parse(
    React.useSyncExternalStore(
      subscribeToWindowResize,
      getResizeSnapshot,
      getServerSnapshot,
    ),
  );
};
