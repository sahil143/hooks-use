import * as React from "react";
import { Link } from "./Link";
// @ts-expect-error support codegen imports
import hooks from "../codegen/hooksList.codegen";

import "./SideNav.css";

export const SideNav: React.FunctionComponent = () => {
  return (
    <nav className="side-nav">
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        {hooks.map((h: { name: string; slug: string }) => {
          return (
            <li key={h.slug}>
              <Link to={`/hook/${h.slug}`}>{h.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
