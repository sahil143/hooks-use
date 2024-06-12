import * as React from "react";

import "./Main.css";
import { Outlet, useLoaderData } from "react-router";

export const Main: React.FunctionComponent = () => {
  const hook = useLoaderData();
  console.log("################@@@@@@@@@@@", hook);
  return (
    <main className="main">
      <Outlet />
    </main>
  );
};
