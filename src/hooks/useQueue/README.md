# useQueue
A custom React hook for managing a queue with operations to add, remove, and clear elements.

#### Signature

```typescript
export const useQueue = <Q>(initialValue?: Q[]): UseQueueReturnType<Q>;
```

#### Parameters

    `initialValue` (optional): Initial array of elements for the queue. Defaults to an empty array.

#### Returns

An object containing:

    - `queue`: The current state of the queue.
    - `first`: The first element of the queue.
    - `last`: The last element of the queue.
    - `size`: The length of the queue.
    - `add`: A function to add an element to the end of the queue.
    - `remove`: A function to remove the first element from the queue.
    - `clear`: A function to remove all elements from the queue.

## Usage

```tsx {0}
const { queue, first, last, size, add, remove, clear } = useQueue<number>([
  1, 2, 3,
]);

return (
  <div>
    <p>Queue: {queue.join(", ")}</p>
    <p>First: {first}</p>
    <p>Last: {last}</p>
    <p>Size: {size}</p>
    <button onClick={() => add(size + 1)}>Add</button>
    <button onClick={remove}>Remove</button>
    <button onClick={clear}>Clear</button>
  </div>
);
```
