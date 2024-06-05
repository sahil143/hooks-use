import { act, renderHook } from "@testing-library/react";
import { useQueue } from "..";

describe("useQueue hook", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return initialValue on initial render", () => {
    const initialValue = [1, 2, 3];
    const { result } = renderHook(() => useQueue(initialValue));
    expect(result.current.queue).toEqual(initialValue);
    expect(result.current.queue).toHaveLength(3);
  });

  it("should return add method to add items to array", () => {
    const initialValue = [1, 2, 3];
    const { result } = renderHook(() => useQueue(initialValue));
    act(() => {
      result.current.add(4);
    });
    expect(result.current.queue).toEqual([...initialValue, 4]);
    act(() => {
      result.current.add(5);
    });
    expect(result.current.queue).toEqual([...initialValue, 4, 5]);
    expect(result.current.queue).toHaveLength(5);
  });

  it("should return remove method to remove the first element of array", () => {
    const initialValue = [1, 2, 3];
    const { result } = renderHook(() => useQueue(initialValue));
    act(() => {
      const removedElement = result.current.remove();
      expect(removedElement).toEqual(1);
    });
  });

  it("should return clear method to remove the remove all element from array", () => {
    const initialValue = [1, 2, 3];
    const { result } = renderHook(() => useQueue(initialValue));
    act(() => {
      result.current.clear();
    });
    expect(result.current.queue).toEqual([]);
  });

  it("should return first, last, size property", () => {
    const initialValue = [1, 2, 3];
    const { result } = renderHook(() => useQueue(initialValue));
    act(() => {
      result.current.add(4);
      result.current.add(5);
      result.current.remove();
    });
    expect(result.current.first).toEqual(2);
    expect(result.current.last).toEqual(5);
    expect(result.current.size).toEqual(4);
  });
});
