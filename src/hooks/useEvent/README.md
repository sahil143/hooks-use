# useEvent

The `useEvent` custom hook is designed to facilitate the creation of event handlers in React components that can access the latest props and state values while maintaining a stable function identity. This ensures that the event handlers reference the most up-to-date data without causing unnecessary re-renders.

#### Signature

```typescript
function useEvent<C extends Function>(callback: C): C;
```

## Usage

```typescript
const callback = useEvent(() => null);
```
