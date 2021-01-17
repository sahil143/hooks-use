import * as React from 'react';

export const useMutationObserver = (
  callback: MutationCallback,
  targetElement: HTMLElement | null,
  observerOptions: MutationObserverInit = {
    attributes: true,
    characterData: true,
    subtree: true,
    childList: true,
  }
): void => {
  const targetElementRef = React.useRef(targetElement);
  targetElementRef.current = targetElement;
  React.useEffect(() => {
    const observer = new MutationObserver(callback);
    observer.observe(targetElementRef.current as HTMLElement, observerOptions);
    return () => {
      observer.disconnect();
    };
  }, [callback, observerOptions]);
};
