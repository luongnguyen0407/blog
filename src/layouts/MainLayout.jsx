import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/home/SideBar";
const MainLayout = () => {
  return (
    <>
      <div className="flex">
        <SideBar></SideBar>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default MainLayout;
