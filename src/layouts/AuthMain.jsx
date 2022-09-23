import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorFallback from "../components/Error/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

import { useAuth } from "../contexts/auth-context";
const AuthMain = ({ children }) => {
  const navigate = useNavigate();
  const { userInfor } = useAuth();
  useEffect(() => {
    document.title = "Đăng Ký";
    if (userInfor?.email) {
      navigate("/");
    }
  }, [userInfor]);
  return (
    <div className="bg-center bg-hero bg-cover min-h-screen flex items-center justify-center rounded-lg shadow-lg">
      <div className=" bg-white p-3 w-4/5 sm:w-3/5 lg:w-2/5 rounded-lg flex flex-col items-center">
        <Link to={"/"}>
          <img
            srcSet="/logo.png 2x"
            className="sm:max-w-[100px] sm:max-h-[100px] max-w-[60px] max-h-[60px]"
            alt=""
          />
        </Link>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="p-3 w-full">{children}</div>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default AuthMain;
