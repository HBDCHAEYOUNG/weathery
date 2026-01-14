import type { RouteObject } from "react-router-dom";
import HomePage from "@pages/home/ui/home.page";

export const HomeRoute: RouteObject = {
  path: "/",
  element: <HomePage />,
};
