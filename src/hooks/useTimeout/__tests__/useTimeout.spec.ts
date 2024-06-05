import { renderHook } from "@testing-library/react";
import { useTimeout } from "..";

describe("useTimeout hook", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should execute callback once the timer elapsed", () => {
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, 1000));
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should clear timeout using the returned callback", () => {
    const callback = jest.fn();
    jest.spyOn(global, "clearTimeout");
    const { result } = renderHook(() => useTimeout(callback, 2000));
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(0);
    result.current();
    expect(clearTimeout).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it("should clear timeout on hook unmount", () => {
    const callback = jest.fn();
    jest.spyOn(global, "clearTimeout");
    const { unmount } = renderHook(() => useTimeout(callback, 2000));
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(0);
    unmount();
    jest.advanceTimersByTime(1000);
    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(0);
  });
});
