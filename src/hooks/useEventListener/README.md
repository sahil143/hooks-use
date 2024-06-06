# useEventListener
A custom React hook that adds an event listener to a specified DOM element, providing an easy way to manage event handling within React components.

#### Signature
```typescript
export const useEventListener = <
  T extends HTMLElement | SVGAElement | MediaQueryList = HTMLElement,
>(
  eventName: string,
  handler: (event: Event) => void,
  target?: T | React.RefObject<T> | Window,
  options?: AddEventListenerOptions
): void;
```
#### Parameters

   - `eventName`: The name of the event to listen for.
    - `handler`: The event handler function to execute when the event is triggered.
    - `target` (optional): The DOM element to attach the event listener to. Defaults to window.
    - `options` (optional): Options for the event listener.

## Usage

```tsx {2}
const divRef = useRef<HTMLDivElement>(null);

useEventListener(
    'click',
    (event) => {
      alert('Div clicked!');
    },
    divRef
  );

  return (
    <div ref={divRef} style={{ width: '200px', height: '200px', backgroundColor: 'lightblue' }}>
      Click me!
    </div>
  );
```