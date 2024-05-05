# useLockBodyScroll

This hook locks the body scroll temporarily by setting the `overflow` style property of the `document.body` element to `"hidden"`. It's particularly useful for scenarios where you want to prevent scrolling while a specific component or feature is active, such as modal dialogs, popovers, or sidebars.

#### Signature


## Usage

```tsx
function Modal() {
  useLockBodyScroll(); // Locks body scroll when the modal is active

  return (
    <div className="modal">
      {/* Modal content */}
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      {isModalOpen && <Modal />}
    </div>
  );
}
```
