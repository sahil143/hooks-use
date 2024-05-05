# useDefault

This React hook is used to manage state with a default value.

#### Signature:

```typescript
useDefault<T>(
  initialValue: T,
  defaultValue?: T
): [T, React.Dispatch<React.SetStateAction<T | undefined | null>>]
```

* `initialValue`: The initial state value.
* `defaultValue` (optional): The default value to be returned if the updated state is undefined or null. If not provided, defaults to the initialValue.

## Usage

```jsx

const [state, setState] = useDefault('initial', 'default');

```
