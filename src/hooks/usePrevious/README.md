### usePrevious

This React hook is used to track the previous value of a variable during component renders.

#### Signature:

```typescript
usePrevious<T>(value: T): T | null
```

On first render this hook will return `null`.

* `value`: The current value to track.

#### Usage:

```
const previousValue = usePrevious('value');
```
