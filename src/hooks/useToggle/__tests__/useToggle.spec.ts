import { act, renderHook } from "@testing-library/react";
import { useToggle } from "..";

describe("useToggle", () => {
  it("should return a default boolean value", () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toEqual(true);
  });

  it("should update state with setState", () => {
    const { result } = renderHook(() => useToggle(false));
    expect(result.current[0]).toEqual(false);
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toEqual(true);
  });
});
