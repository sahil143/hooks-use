import { renderHook } from "@testing-library/react";
import { useEvent } from "..";

describe("useEvent hook", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return function with same identity between rerenders and on callback change", () => {
    let a = 0;
    const { result, rerender } = renderHook((callback: () => any = () => a) =>
      useEvent(callback),
    );
    expect(result.current()).toEqual(0);
    const prevFunc = result.current;
    rerender();
    expect(result.current()).toEqual(0);
    expect(result.current).toEqual(prevFunc);
    a = 1;
    expect(result.current()).toEqual(1);
    rerender(() => true);
    expect(result.current).toEqual(prevFunc);
    expect(result.current()).toEqual(true);
  });
});
