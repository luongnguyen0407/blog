import React from "react";
import { Outlet } from "react-router-dom";
import NavDashBoard from "../components/dashboard/NavDashBoard";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/Error/ErrorFallback";
const Dashboard = () => {
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
