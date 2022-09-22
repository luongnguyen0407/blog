import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/home/SideBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
const MainLayout = () => {
  const navigate = useNavigate();
  const { userInfor } = useAuth();
  useEffect(() => {
    if (!userInfor) {
      navigate("/login");
    }
  }, [userInfor]);
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
