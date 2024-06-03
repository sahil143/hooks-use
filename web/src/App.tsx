import * as React from "react";
import { Header } from "./components/Header";
import { SideNav } from "./components/SideNav";
import { Main } from "./components/Main";

export const App: React.FunctionComponent = () => {
  return (
    <>
      <Header />
      <SideNav />
      <Main />
    </>
  );
};
