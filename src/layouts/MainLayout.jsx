import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/home/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import PostDetailsPage from "../pages/PostDetailsPage";
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
        <Header></Header>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default MainLayout;
