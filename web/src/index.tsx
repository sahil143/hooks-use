import * as ReactDom from "react-dom/client";
import * as React from "react";
import { App } from "./App";
import "./index.css";

ReactDom.createRoot(
  document.getElementById("root") as ReactDom.Container,
).render(<App />);
