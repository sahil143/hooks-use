### useToggle

This React hook is used to toggle a boolean state value.

#### Signature:

```typescript
useToggle(
  initialValue: boolean = true
): [boolean, () => void]
```

* `initialValue` (optional): The initial boolean state value. Defaults to true.

Usage Example:

```
const [state, toggleState] = useToggle();
```
