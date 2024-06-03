import * as React from "react";

import "./SideNav.css";
import { Link } from "../Link";
import { getHookList } from "../../utils/hooks-list";

export const SideNav: React.FunctionComponent = () => {
  const hooks = getHookList();
  return (
    <nav className="side-nav">
      <ul>
        {hooks.map((h) => {
          return (
            <li key={h.slug}>
              <Link href="#">{h.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
