import * as React from "react";

/**
 * A hook that copies text to clipboard [`Clipboard API`](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
 * @returns {[string | null, (text: string) => Promise<boolean>]} An array containing the copied text and a function to copy text to clipboard
 */
export const useCopyToClipboard = (): [
  string | null,
  (text: string) => Promise<boolean>,
] => {
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  const copyFn = React.useCallback(async (value: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        setCopiedText(value);
        return true;
      } else {
        console.warn("navigator.clipboard.writeText is not supported");
        setCopiedText(null);
        return false;
      }
    } catch (err) {
      console.warn("Copy failed", err);
      setCopiedText(null);
      return false;
    }
  }, []);

  return [copiedText, copyFn];
};
