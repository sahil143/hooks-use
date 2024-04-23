import { renderHook } from "@testing-library/react";
import { useInterval } from "..";

describe("useInterval hook", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should execute callback once the timer elapsed", () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, 1000));
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should execute callback on interval", () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, 1000));
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it("should clear interval using the returned callback", () => {
    const callback = jest.fn();
    jest.spyOn(global, "clearInterval");
    const { result } = renderHook(() => useInterval(callback, 1000));
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    result.current();
    expect(clearInterval).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should clear interval on hook unmount", () => {
    const callback = jest.fn();
    jest.spyOn(global, "clearInterval");
    const { unmount } = renderHook(() => useInterval(callback, 1000));
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    unmount();
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });
});
