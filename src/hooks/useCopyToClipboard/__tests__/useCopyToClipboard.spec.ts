import { act, renderHook } from "@testing-library/react";
import { useCopyToClipboard } from "..";

describe("useCopyToClipboard hook", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return null on initial render", () => {
    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.current[0]).toEqual(null);
  });

  it("should resolve promise to true when text successfully copied to clipboard", async () => {
    (navigator.clipboard as unknown) = {
      writeText: jest.fn(() => Promise.resolve()),
    };
    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.current[0]).toEqual(null);
    await act(async () => {
      await result.current[1]("mock text").then((copied) => {
        expect(copied).toBe(true);
      });
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("mock text");
    expect(result.current[0]).toEqual("mock text");
  });

  it("should resolve promise to false if clipboard api is not availble", async () => {
    (navigator.clipboard as unknown) = { writeText: undefined };
    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.current[0]).toEqual(null);
    await act(async () => {
      await result.current[1]("mock text").then((copied) => {
        expect(copied).toBe(false);
      });
    });
    expect(result.current[0]).toEqual(null);
  });
});
