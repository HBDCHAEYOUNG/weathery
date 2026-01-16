import { Outlet } from "react-router-dom";
import Header from "./header";

function BasicLayout() {
  return (
    <div className="flex flex-col items-center w-screen h-screen ">
      <Header />
      <Outlet />
    </div>
  );
}

export default BasicLayout;
