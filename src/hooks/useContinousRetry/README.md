# useContinousRetry

A custom React hook that continuously retries a callback function at specified intervals until it returns `true` or the maximum number of retries is reached.

#### Signature

```typescript
export const useContinuousRetry = (
  callback: () => boolean,
  interval: number,
  options: { maxRetries: number }
): boolean;
```

**Parameters**

- `callback`: A function that is called at each interval. If it returns true, the retries stop.
- `interval`: The interval in milliseconds at which to retry the callback.
- `options`: An object containing:
  - `maxRetries`: The maximum number of retries before stopping.

**Returns**

    A boolean indicating whether the callback function has returned true.

## Usage

```tsx {3}
const [count, setCount] = useState(0);

const success = useContinuousRetry(
  () => {
    setCount((prevCount) => prevCount + 1);
    return count >= 5; // The callback returns true after 5 retries
  },
  1000,
  { maxRetries: 10 }
);

return (
  <div>
    <p>Retries: {count}</p>
    <p>{success ? "Success!" : "Still retrying..."}</p>
  </div>
);
```
