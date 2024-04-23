export const isUndefined = <T>(value: T | undefined): boolean =>
  typeof value === "undefined" && value === undefined;
