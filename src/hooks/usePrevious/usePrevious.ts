import * as React from "react";

export const usePrevious = <T>(value: T): T | null => {
  const ref = React.useRef<T | null>(null);

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
