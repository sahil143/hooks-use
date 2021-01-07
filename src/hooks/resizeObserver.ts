import * as React from 'react';

export const useResizeObserver = (
  callback: ResizeObserverCallback,
  targetElement: HTMLElement | null,
  observerOptions?: ResizeObserverObserveOptions
): void => {
  const targetElementRef = React.useRef(targetElement);
  targetElementRef.current = targetElement;
  React.useEffect(() => {
    const observer = new ResizeObserver(callback);
    observer.observe(targetElementRef.current as HTMLElement, observerOptions);
    return () => {
      observer.disconnect();
    };
  }, [callback, observerOptions]);
};
