import { Outlet } from "react-router-dom";
import Header from "./header";
import { Toaster } from "@/shared/ui/_shadcn/sonner";

function BasicLayout() {
  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
}

export default BasicLayout;
