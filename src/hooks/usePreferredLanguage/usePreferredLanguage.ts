import * as React from "react";

/**
 * Subscribe callback for useSyncExternalStore hook
 * @param callback {() => void}
 * @returns {() => void}
 */
const subscribeToLanguageChange = (callback: () => void): (() => void) => {
  window.addEventListener("languagechange", callback);
  return () => {
    window.removeEventListener("languagechange", callback);
  };
};

/**
 * @returns {String} language from the navigator.language api
 */
const getLanguage = (): string => {
  return navigator.language;
};

/**
 * This hooks retrieves the preferred language set by the user in their browser
 * @returns {String} A string that contains the language selected in the browser
 */
const usePreferredLanguage = (): string => {
  return React.useSyncExternalStore(subscribeToLanguageChange, getLanguage);
};

export default usePreferredLanguage;
