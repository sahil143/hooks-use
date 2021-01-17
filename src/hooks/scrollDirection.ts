import * as React from 'react';

export enum ScrollDirection {
  scrollingUp = 'scrolling-up',
  scrollingDown = 'scrolling-down',
  scrolledToBottom = 'scrolled-to-bottom',
  scrolledToTop = 'scrolled-to-top',
}

export const getScrollDirection = (
  prevScrollTop: number,
  currentScrollTop: number,
  scrollHeight: number,
  clientHeight: number
): ScrollDirection | null => {
  let direction: ScrollDirection | null = null;
  if (scrollHeight - currentScrollTop === clientHeight) {
    direction = ScrollDirection.scrolledToBottom;
  } else if (currentScrollTop === 0) {
    direction = ScrollDirection.scrolledToTop;
  } else if (prevScrollTop > currentScrollTop) {
    direction = ScrollDirection.scrollingUp;
  } else if (prevScrollTop < currentScrollTop) {
    direction = ScrollDirection.scrollingDown;
  }
  return direction;
};

export const useScrollDirection = (): [
  ScrollDirection | null,
  (event: Event) => void
] => {
  const scrollPosition = React.useRef<number | null>(null);
  const [
    scrollDirection,
    setScrollDirection,
  ] = React.useState<ScrollDirection | null>(null);
  const handleScroll = React.useCallback(
    event => {
      const { scrollHeight, scrollTop, clientHeight } = event.target;
      if (scrollPosition.current !== null) {
        const direction = getScrollDirection(
          scrollPosition.current,
          scrollTop,
          scrollHeight,
          clientHeight
        );
        if (direction && direction !== scrollDirection) {
          setScrollDirection(direction);
        }
      }
      scrollPosition.current = scrollTop;
    },
    [scrollDirection]
  );

  return [scrollDirection, handleScroll];
};
