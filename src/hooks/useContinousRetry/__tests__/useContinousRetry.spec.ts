import { renderHook, waitFor } from "@testing-library/react";
import { useContinousRetry } from "..";

describe("useContinousRetry hook", () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it("should return null on initial render", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useContinousRetry(callback, 1200));
    expect(result.current).toEqual(false);
  });

  it("should execute callback on the given interval", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useContinousRetry(callback, 1200));
    expect(result.current).toEqual(false);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual(false);
  });

  it("should return callback true once resolved", async () => {
    let tried = 0;
    const callback = jest.fn(() => {
      if (tried === 5) {
        return true;
      } else {
        tried += 1;
      }
      return false;
    });
    const { result } = renderHook(() => useContinousRetry(callback, 1200));
    expect(result.current).toEqual(false);
    expect(callback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual(false);
    jest.advanceTimersByTime(7000);
    expect(callback).toHaveBeenCalledTimes(6);
    await waitFor(() => expect(result.current).toEqual(true));
  });

  it("should only execute callback for the number of max retries", () => {
    let tried = 0;
    const callback = jest.fn(() => {
      if (tried === 5) {
        return true;
      } else {
        tried += 1;
      }
      return false;
    });
    const { result } = renderHook(() =>
      useContinousRetry(callback, 500, { maxRetries: 3 }),
    );
    expect(result.current).toEqual(false);
    expect(callback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual(false);
    jest.advanceTimersByTime(7000);
    expect(callback).toHaveBeenCalledTimes(4);
    jest.advanceTimersByTime(8000);
    expect(callback).toHaveBeenCalledTimes(4);
  });
});
