import { act, renderHook } from "@testing-library/react";
import { useCounter } from "..";

describe("useCounter hook", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should initialize state with default value", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current[0]).toEqual(0);
  });

  it("should initialize value with provided initalValue", () => {
    const { result, rerender } = renderHook((c: number) => useCounter(c ?? 1));
    expect(result.current[0]).toEqual(1);
    rerender(2);
    expect(result.current[0]).toEqual(1);
  });

  it("should use utils to modify counter value", () => {
    const { result } = renderHook(() => useCounter(1, { min: 0, max: 3 }));
    expect(result.current[0]).toEqual(1);

    // increment counter

    act(() => {
      result.current[1].increment();
    });
    expect(result.current[0]).toEqual(2);
    act(() => {
      result.current[1].increment();
    });
    expect(result.current[0]).toEqual(3);

    act(() => {
      // should not increase the counter if max value is reached
      result.current[1].increment();
      result.current[1].increment();
      result.current[1].increment();
    });
    expect(result.current[0]).toEqual(3);

    // decrement counter

    act(() => {
      result.current[1].decrement();
    });
    expect(result.current[0]).toEqual(2);

    act(() => {
      result.current[1].decrement();
      result.current[1].decrement();
    });
    expect(result.current[0]).toEqual(0);

    act(() => {
      // should not decrease the counter if min value is reached
      result.current[1].decrement();
      result.current[1].decrement();
      result.current[1].decrement();
    });
    expect(result.current[0]).toEqual(0);

    // should reset the counter to initialValue
    act(() => {
      result.current[1].reset();
    });
    expect(result.current[0]).toEqual(1);
  });

  it("should throw error if initial value in not greater than max or less than min value", () => {
    jest.spyOn(console, "error").mockImplementation(() => jest.fn());
    expect(() => {
      renderHook(() => useCounter(0, { min: 1 }));
    }).toThrow("Initial value 0 is less than min value 1");
    expect(() => {
      renderHook(() => useCounter(4, { max: 3 }));
    }).toThrow("Initial value 4 is greater than max value 3");
  });

  it("should not update state using set method if passed value doesnt respect min and max", () => {
    const { result } = renderHook(() => useCounter(4, { min: 2, max: 6 }));
    expect(result.current[0]).toEqual(4);

    act(() => {
      result.current[1].set(3);
    });
    expect(result.current[0]).toEqual(3);

    // respect min value
    act(() => {
      result.current[1].set(1);
    });
    expect(result.current[0]).toEqual(3);

    // respect max value
    act(() => {
      result.current[1].set(7);
    });
    expect(result.current[0]).toEqual(3);

    // set value
    act(() => {
      result.current[1].set(5);
    });
    expect(result.current[0]).toEqual(5);

    // callback as a state
    act(() => {
      result.current[1].set((c) => c - 3);
    });
    expect(result.current[0]).toEqual(2);
  });
});
