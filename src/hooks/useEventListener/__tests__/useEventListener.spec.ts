import { fireEvent, renderHook } from "@testing-library/react";
import { useEventListener } from "..";

describe("useEventListener hook", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call event listener when hook mounts/unmounts", () => {
    const eventHandler = jest.fn();
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListener = jest.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() =>
      useEventListener("click", eventHandler),
    );
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
      undefined,
    );
    unmount();
    expect(removeEventListener).toHaveBeenCalledTimes(1);
    expect(removeEventListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
      undefined,
    );
  });

  it("should call event listeners when hook mounts/unmounts with target specified", () => {
    const ref = { current: document.createElement("div") };
    const eventHandler = jest.fn();
    const addEventListenerSpy = jest.spyOn(ref.current, "addEventListener");
    const removeEventListener = jest.spyOn(ref.current, "removeEventListener");
    const { unmount } = renderHook(() =>
      useEventListener("click", eventHandler, ref),
    );
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
      undefined,
    );
    unmount();
    expect(removeEventListener).toHaveBeenCalledTimes(1);
    expect(removeEventListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
      undefined,
    );
  });

  it("should fire event listeners on valid target", () => {
    const ref = { current: document.createElement("div") };
    const eventHandler = jest.fn();
    renderHook(() => useEventListener("click", eventHandler, ref));
    fireEvent.click(ref.current);
    expect(eventHandler).toHaveBeenCalledTimes(1);
  });

  it("should fire event listeners on valid target", () => {
    const ref = { current: document.createElement("div") };
    const eventHandler = jest.fn();
    const eventHandler2 = jest.fn();
    renderHook(() => useEventListener("click", eventHandler, ref));
    renderHook(() => useEventListener("keydown", eventHandler2, ref));
    fireEvent.click(ref.current);
    expect(eventHandler).toHaveBeenCalledTimes(1);
    expect(eventHandler2).toHaveBeenCalledTimes(0);
    fireEvent.keyDown(ref.current);
    expect(eventHandler).toHaveBeenCalledTimes(1);
    expect(eventHandler2).toHaveBeenCalledTimes(1);
  });
});
