## useDocumentTitle

This React hook allows you to dynamically update the title of a webpage based on a specified `title` string.

#### Signature

## Usage

```jsx
const App = () => {
  useDocumentTitle("My Awesome Website");

  return (
    <div>
      <h1>Welcome to My Website</h1>
      {/* Your website content */}
    </div>
  );
};

export default App;
```