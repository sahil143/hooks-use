import { act, renderHook } from "@testing-library/react";
import { useObjectState } from "..";

describe("useObjectState hook", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return initial value on initial render", () => {
    const { result } = renderHook(() => useObjectState({}));
    expect(result.current[0]).toEqual({});
  });

  it("should update the entire state by passing the state of through a function", () => {
    const { result } = renderHook(() => useObjectState({}));
    act(() => {
      result.current[1]({ value: "key" });
    });
    expect(result.current[0]).toEqual({ value: "key" });
    act(() => {
      result.current[1]({ key: "value" });
    });
    expect(result.current[0]).toEqual({ value: "key", key: "value" });

    act(() => {
      result.current[1](() => ({ key: "key" }));
    });
    expect(result.current[0]).toEqual({ value: "key", key: "key" });
    act(() => {
      result.current[1](() => ({ newKey: "key" }));
    });
    expect(result.current[0]).toEqual({
      value: "key",
      key: "key",
      newKey: "key",
    });
  });

  it("should update the state for a particular key in the object", () => {
    const { result } = renderHook(() =>
      useObjectState<{ key?: string; foo?: { [key: string]: string } }>({}),
    );
    act(() => {
      result.current[1]("foo", { a: "value" });
    });
    expect(result.current[0].foo).toEqual({ a: "value" });
    act(() => {
      result.current[1]("foo", () => ({ b: "value" }));
    });
    expect(result.current[0].foo).toEqual({ b: "value" });
  });
});
