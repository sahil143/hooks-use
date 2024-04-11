import { act, renderHook } from "@testing-library/react";
import { useDefault } from "..";

describe("useDefault", () => {
  it("should return intialValue from the hook and setState function", () => {
    const { result } = renderHook(() => useDefault("initial", "default"));
    expect(result.current[0]).toEqual("initial");
  });

  it("should return defaultValue if returned state is undefined | null", () => {
    const { result } = renderHook(() => useDefault("initial", "default"));
    expect(result.current[0]).toEqual("initial");
    act(() => {
      result.current[1](undefined);
    });
    expect(result.current[0]).toEqual("default");
    act(() => {
      result.current[1]("mock");
    });
    expect(result.current[0]).toEqual("mock");
    act(() => {
      result.current[1](null);
    });
    expect(result.current[0]).toEqual("default");
  });

  it("should use initial value as default value if default value is not provided", () => {
    const { result } = renderHook(() => useDefault("initial"));
    expect(result.current[0]).toEqual("initial");
    act(() => {
      result.current[1](undefined);
    });
    expect(result.current[0]).toEqual("initial");
    act(() => {
      result.current[1]("mock");
    });
    expect(result.current[0]).toEqual("mock");
    act(() => {
      result.current[1](null);
    });
    expect(result.current[0]).toEqual("initial");
  });

  it("should return falsy value if value is not undefined | null", () => {
    const { result } = renderHook(() => useDefault<boolean | number>(true));
    expect(result.current[0]).toEqual(true);
    act(() => {
      result.current[1](undefined);
    });
    expect(result.current[0]).toEqual(true);
    act(() => {
      result.current[1](false);
    });
    expect(result.current[0]).toEqual(false);
    act(() => {
      result.current[1](0);
    });
    expect(result.current[0]).toEqual(0);
    act(() => {
      result.current[1](null);
    });
    expect(result.current[0]).toEqual(true);
  });
});
