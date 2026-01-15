import { Outlet } from "react-router-dom";

function BasicLayout() {
  return (
    <div>
      <h1>BasicLayout</h1>
      <Outlet />
    </div>
  );
}

export default BasicLayout;
