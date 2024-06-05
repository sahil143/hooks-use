# useTimeout
A custom React hook that provides a way to create and manage timeouts using setTimeout.

#### Signature

```typescript
export const useTimeout = (callback: () => void, delay: number) => () => void;
```

#### Parameters

- `callback`: The function to call when the timer elapses.
- `delay`: The number of milliseconds to wait before calling the callback.

#### Returns

A function to cancel the timeout set by setTimeout.

## Usage

```tsx {1}
const [message, setMessage] = useState("Waiting...");
const cancelTimeout = useTimeout(() => {
  setMessage("Timeout triggered!");
}, 5000);

return (
  <div>
    <p>{message}</p>
    <button onClick={cancelTimeout}>Cancel Timeout</button>
  </div>
);
```
