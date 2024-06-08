# useObjectState

A custom React hook that manages an object state with a flexible update function. It returns the current state and a function to update the state. The update function can either update a specific key in the state or replace the entire state.

#### Signature

```typescript
export const useObjectState = <S extends Object>(
  initialState: S
): [S, UpdaterAction<S>];
```

**UpdaterAction**

```typescript
type UpdaterAction<S> = (
  keyOrUpdater: keyof S | React.SetStateAction<S>,
  updater?: React.SetStateAction<S[keyof S]>
) => void;
```

Parameters:

- `keyOrUpdater`: This parameter can be either:
  - A key of the state object (keyof S), in which case updater is used to update the value of that key.
  - A state updater function or a new state object (`React.SetStateAction<S>`), in which case it updates the entire state object.
- `updater` (optional): If keyOrUpdater is a key of the state object, this parameter is used to update the value of that key. It can be:
  - A new value for the key.
  - A function that takes the current value of the key and returns the new value.

## Usage

```tsx {1}
const [state, updateState] = useObjectState({ name: "John", age: 30 });

// Update a specific key
const updateName = () => {
  updateState("name", "Doe");
};

// Update a specific key using an updater function
const updateAge = () => {
  updateState("age", (prevAge) => prevAge + 1);
};

// Update the entire state
const updateAll = () => {
  updateState({ name: "Alice", age: 25 });
};

return (
  <div>
    <p>Name: {state.name}</p>
    <p>Age: {state.age}</p>
    <button onClick={updateName}>Update Name</button>
    <button onClick={updateAge}>Update Age</button>
    <button onClick={updateAll}>Update All</button>
  </div>
);
```
