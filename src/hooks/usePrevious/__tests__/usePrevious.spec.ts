import { renderHook } from "@testing-library/react";
import { usePrevious } from "..";

describe("usePrevious", () => {
  it("should return null on first render", () => {
    const { result } = renderHook(() => usePrevious("a"));
    expect(result.current).toEqual(null);
  });

  it("should return previous value on render", () => {
    const { result, rerender } = renderHook(() => usePrevious("a"));
    expect(result.current).toEqual(null);
    rerender("b");
    expect(result.current).toEqual("a");
    expect(result.current).not.toEqual("b");
  });
});
