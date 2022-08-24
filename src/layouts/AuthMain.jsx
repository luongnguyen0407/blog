import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
    <div className="bg-center bg-hero bg-cover min-h-screen flex items-center justify-center rounded-lg">
      <div className=" bg-white p-3 w-3/5 lg:w-2/5 rounded-lg flex flex-col items-center">
        <Link to={"/"}>
          <img
            srcSet="/logo.png 2x"
            className="max-w-[100px] max-h-[100px]"
            alt=""
          />
        </Link>
        <div className="p-3 w-full">{children}</div>
      </div>
    </div>
  );
};

export default AuthMain;
