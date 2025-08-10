import { Outlet } from "react-router";

import { Nav } from "./nav";

export const Layout = () => {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <Nav />
      <div className="flex flex-auto flex-col container mx-auto p-4 mt-16 overflow-hidden relative">
        <Outlet />
      </div>
    </div>
  );
};
