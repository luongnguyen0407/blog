import { signOut } from "firebase/auth";
import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { auth } from "../../firebase-app/firebase-config";
import ButtonXs from "./ButtonXs";
import NavItem from "./NavItem";
import Title from "./Title";

import {
  AiOutlineDoubleRight,
  AiOutlineFileAdd,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineMedicineBox,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const LIST_MENU = [
  {
    title: "Trang chủ",
    icon: <AiOutlineHome />,
    path: "/",
  },
  {
    title: "Hồ sơ",
    icon: <AiOutlineUser />,
    path: "/updateprofile",
  },
  {
    title: "Bài viết",
    icon: <AiOutlineMedicineBox />,
    path: "/dashboard/post",
  },
];
const SideBar = () => {
  const [isZoom, setIsZoom] = useState(true);
  const { userInfor } = useAuth();
  const ref = useRef(null);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Đăng xuất thành công");
    } catch (error) {
      toast.error("Đăng xuất không thành công");
    }
  };
  return (
    <div
      className={`w-0 lg:w-full transition-all duration-700 ${
        isZoom ? "max-w-[80px] reHidden " : "max-w-[224px]"
      }`}
    >
      <div
        ref={ref}
        className={`top-0 w-56 left-0 fixed bg-white z-50  lg:translate-x-0 lg:overflow-hidden h-full p-3 border-r flex flex-col items-center transition-all duration-700 ${
          isZoom ? "lg:w-[5rem] reHidden " : "lg:w-56 -translate-x-full"
        }`}
      >
        <div
          onClick={() => setIsZoom(!isZoom)}
          className="absolute py-2 rounded-lg lg:rounded-tl-lg lg:rounded-bl-lg text-white bg-blue-400 cursor-pointer top-2/4 -right-4 lg:right-0 -translate-y-2/4"
        >
          <AiOutlineDoubleRight
            className={`${isZoom ? "" : "rotate-180"} transition-all`}
          />
        </div>
        <div className="flex gap-2 items-center p-2 border-b border-b-gray-200">
          <div className="itemShowCenter h-12 w-12 rounded-full overflow-hidden border-2 border-white">
            <img
              className="w-full object-cover h-full rounded-full"
              src={
                userInfor?.photoURL ||
                "https://images.unsplash.com/photo-1660910859696-2474e4433c7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              }
              alt="avatar"
            />
          </div>
          <div className="isHidden flex flex-col items-center">
            <Title className="text-lg whitespace-nowrap overflow-hidden">
              {userInfor?.displayName}
            </Title>
            {userInfor?.email ? (
              <ButtonXs onClick={handleSignOut}>LogOut</ButtonXs>
            ) : (
              <ButtonXs>
                <Link to={"/login"}>Login</Link>
              </ButtonXs>
            )}
          </div>
        </div>
        <div className="flex-col flex items-start w-full p-2">
          <Title className="text-xs text-gray-300">Menu</Title>
          <nav className="mt-5 w-full nav-bar flex flex-col gap-3">
            {LIST_MENU.map((item) => (
              <NavItem
                key={item.title}
                title={item.title}
                icon={item.icon}
                to={item.path}
              ></NavItem>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
