import * as React from "react";

export const useDefault = <T>(
  initialValue: T,
  defaultValue: T = initialValue,
): [T, React.Dispatch<React.SetStateAction<T | undefined | null>>] => {
  const [state, setState] = React.useState<T | undefined | null>(initialValue);

  if (state === undefined || state === null) {
    return [defaultValue, setState];
  }

  return [state, setState];
};
