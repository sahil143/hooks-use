import * as React from "react";

/**
 * Subscribe callback for useSyncExternalStore hook
 * @param {() => void} callback
 * @returns {() => void}
 */
const subscribeToDocumentVisibility = (callback: () => void): (() => void) => {
  document.addEventListener("visibilitychange", callback);
  return () => {
    document.removeEventListener("visibilitychange", callback);
  };
};

/**
 * @returns {String} visibility state from the document
 */
const getSnapshot = (): DocumentVisibilityState => {
  return document.visibilityState;
};

const getServerSnapshot = () => {
  throw Error("useVisibilityChange is a client-only hook");
};

/**
 * A custom hook that tracks the visibility of the document.
 * @returns {DocumentVisibilityState} return the visiblity state(hidden | visible) of document
 */
export const useVisibilityChange = (): DocumentVisibilityState => {
  return React.useSyncExternalStore(
    subscribeToDocumentVisibility,
    getSnapshot,
    getServerSnapshot,
  );
};
