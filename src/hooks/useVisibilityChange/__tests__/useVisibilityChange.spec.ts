import { renderHook } from "@testing-library/react";
import { useVisibilityChange } from "..";

describe("useVisibilityChange hook", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return initila values on initial render", () => {
    const { result } = renderHook(() => useVisibilityChange());
    expect(result.current).toEqual("visible");
  });
});
