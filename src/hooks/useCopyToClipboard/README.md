# useCopyToClipboard

The `useCopyToClipboard` hook provides functionality to copy text to the clipboard using the Clipboard API. It returns the copied text and a function to copy text to the clipboard. The function returns a Promise that resolves to `true` if the text is copied successfully and `false` otherwise.

#### Signature

```typescript
/**
 * A hook that copies text to clipboard [`Clipboard API`](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
 * @returns {[string | null, (text: string) => Promise<boolean>]} An array containing the copied text and a function to copy text to clipboard
 */
const useCopyToClipboard: () => [
    /**
     * The copied text.
     */
    string | null, 
    /**
     * A function to copy text to clipboard.
     * @param text The text to copy.
     * @returns A Promise that resolves to `true` if the text is copied successfully, and `false` otherwise.
     */
    (text: string) => Promise<boolean>
];
```

## Usage

```ts
const [copiedText, copyToClipboard] = useCopyToClipboard();
```
