import { Callback } from "../types";

export const debounce = <T extends Callback>(callback: T, wait: number): T => {
  return callback;
};