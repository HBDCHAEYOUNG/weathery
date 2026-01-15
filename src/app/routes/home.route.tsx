import type { RouteObject } from "react-router-dom";
import HomePage from "@pages/home/ui/home.page";
import BasicLayout from "../layouts/basic.layout";
import ErrorLayout from "../layouts/error.layout";

export const HomeRoute: RouteObject = {
  path: "/",
  element: <BasicLayout />,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
  ],
  errorElement: <ErrorLayout />,
};
