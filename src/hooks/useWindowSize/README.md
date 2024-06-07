# useWindowSize
A custom React hook that returns the updated height and width of the window on resize.

#### Signature

```typescript
const useWindowSize = (): { width: number; height: number };
```

## Usage

```{1}
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
```
