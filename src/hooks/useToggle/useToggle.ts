import * as React from "react";

/**
 * Return type for hook
 */
type UseToggleReturnType = [boolean, () => void];

/**
 * This hook is used to toggle a boolean state value.
 * @param {boolean} initialValue The initial boolean state value.
 * @returns {UseToggleReturnType} Returns state and a function
 */
export const useToggle = (
  initialValue: boolean = true,
): UseToggleReturnType => {
  const [state, setState] = React.useState<boolean>(initialValue);

  const toggleState = React.useCallback(() => {
    setState((s) => !s);
  }, []);

  return [state, toggleState];
};
