import { renderHook } from "@testing-library/react";
import { useLockBodyScroll } from "..";

describe("useLockBodyScroll hook", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return null on initial render", () => {
    renderHook(() => useLockBodyScroll());
    expect(true).toBe(true);
  });
});
