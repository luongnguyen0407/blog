import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavDashBoard from "../components/dashboard/NavDashBoard";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/Error/ErrorFallback";
import { useAuth } from "../contexts/auth-context";
import { toast } from "react-toastify";
const Dashboard = () => {
  const navigate = useNavigate();
  const { userInfor } = useAuth();
  useEffect(() => {
    if (!userInfor) {
      toast.warning("Bạn cần đăng nhập để sử dụng tính năng này");
      navigate("/login");
    }
  }, [userInfor]);
  return (
    <div className="w-full">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <NavDashBoard />
      </ErrorBoundary>
      <Outlet />
    </div>
  );
};

export default Dashboard;
