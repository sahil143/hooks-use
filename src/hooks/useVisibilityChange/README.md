# useVisibilityChange

This custom hook provides a simple way to track the visibility state of the document in React components, allowing you to respond to changes in visibility (e.g., when a tab becomes active or inactive).

#### Signature

```typescript
const useVisibilityChange = (): DocumentVisibilityState;
```

## Usage

```tsx {1}
const visibilityState = useVisibilityChange();

return (
  <div>
    <p>Document visibility state: {visibilityState}</p>
    {visibilityState === "hidden" ? (
      <p>The document is hidden</p>
    ) : (
      <p>The document is visible</p>
    )}
  </div>
);
```
