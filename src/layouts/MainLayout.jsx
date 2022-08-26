import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/home/Header";
const MainLayout = () => {
  return (
    <>
      <div className="flex">
        <Header></Header>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default MainLayout;
