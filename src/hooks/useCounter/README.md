## useCounter
Custom React hook for managing a counter with customizable minimum and maximum values.

### Signature
```typescript
useCounter(
  initialValue?: number,
  options?: UseCounterOptions
): UseCounterReturnType;
```

#### Parameters
- initialValue (optional): Initial value for the counter. Defaults to 0.
- options (optional): Additional options for the hook, such as minimum and maximum values.

#### Returns

An array containing:

1. The current value of the counter.
2. An object with utility functions to modify the counter:
    - `increment`: Increases the counter by 1, respecting the maximum value if specified.
    - `decrement`: Decreases the counter by 1, respecting the minimum value if specified.
    - `reset`: Resets the counter to its initial value.
    - `set`: A function to directly set the counter value. respecting the minimum and maximum value if specified.

### Usage

```tsx {0}
const [count, { increment, decrement, reset }] = useCounter(0, { min: 0, max: 10 });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
```
