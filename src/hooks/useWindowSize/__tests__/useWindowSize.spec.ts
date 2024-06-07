import { act, renderHook } from "@testing-library/react";
import { useWindowSize } from "..";

const dispatchWindowResizeEvent = (dimension) => {
  if (dimension.width) {
    window.innerWidth = dimension.width;
  }
  if (dimension.height) {
    window.innerHeight = dimension.height;
  }
  dispatchEvent(new Event("resize"));
};

describe("useWindowSize hook", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    dispatchWindowResizeEvent({ width: 1000, height: 1000 });
  });

  it("should return initila values on initial render", () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.height).toEqual(1000);
    expect(result.current.width).toEqual(1000);
  });

  it("should return new height and width on resize event", () => {
    const { result } = renderHook(() => useWindowSize());
    act(() => {
      dispatchWindowResizeEvent({ width: 1050 });
    });
    expect(result.current.height).toEqual(1000);
    expect(result.current.width).toEqual(1050);
    act(() => {
      dispatchWindowResizeEvent({ height: 1050 });
    });
    expect(result.current.height).toEqual(1050);
    expect(result.current.width).toEqual(1050);
    act(() => {
      dispatchWindowResizeEvent({ height: 2000, width: 2000 });
    });
    expect(result.current.height).toEqual(2000);
    expect(result.current.width).toEqual(2000);
  });
});
