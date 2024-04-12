import * as React from "react";

export const useToggle = (
  initialValue: boolean = true,
): [boolean, () => void] => {
  const [state, setState] = React.useState<boolean>(initialValue);

  const toggleState = React.useCallback(() => {
    setState((s) => !s);
  }, []);

  return [state, toggleState];
};
