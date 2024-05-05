import * as React from "react";

/**
 * Custom hook that locks body scroll temporarily
 */
export const useLockBodyScroll = (): void => {
  React.useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
};
