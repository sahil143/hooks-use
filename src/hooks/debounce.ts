import { useCallback } from "react";
import { debounce } from "../utils";
import { Callback } from "../types";


export const useDebounceCallback = <T extends Callback>(
  callback: T,
  dependencies: any[],
  timeout: number = 500,
): T => useCallback(debounce(callback, timeout), dependencies);
