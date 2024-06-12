import * as React from "react";
import { Header } from "./components/Header";
import { SideNav } from "./components/SideNav";
import { Main } from "./components/Main";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <SideNav />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "hook/:hook",
        element: <Main />,
        loader: async (data) => {
          console.log(data);
          return data.params.hook;
        },
      },
    ],
  },
]);

export const App: React.FunctionComponent = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
