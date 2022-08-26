import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ButtonXs from "./ButtonXs";
import NavItem from "./NavItem";
import Title from "./Title";
import { useAuth } from "../../contexts/auth-context";
import { auth } from "../../firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";

import {
  AiOutlineInfoCircle,
  AiOutlineHome,
  AiOutlineMedicineBox,
  AiOutlineDoubleRight,
  AiOutlineFileAdd,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const LIST_MENU = [
  {
    title: "Home",
    icon: <AiOutlineHome />,
    path: "/",
  },
  {
    title: "About",
    icon: <AiOutlineInfoCircle />,
    path: "/about",
  },
  {
    title: "Post",
    icon: <AiOutlineMedicineBox />,
    path: "/post",
  },
];
const Header = () => {
  const [isZoom, setIsZoom] = useState(false);
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
      className={`w-full transition-all duration-700 ${
        isZoom ? "max-w-[80px] reHidden " : "max-w-[224px]"
      }`}
    >
      <div
        ref={ref}
        className={`top-0 left-0 fixed h-screen p-3 border-r flex flex-col items-center transition-all duration-700 overflow-hidden ${
          isZoom ? "w-[5rem] reHidden " : "w-56"
        }`}
      >
        <div
          onClick={() => setIsZoom(!isZoom)}
          className="absolute py-2 rounded-tl-lg rounded-bl-lg text-white bg-blue-400 cursor-pointer top-2/4 right-0 -translate-y-2/4"
        >
          <AiOutlineDoubleRight
            className={`${isZoom ? "" : "rotate-180"} transition-all`}
          />
        </div>
        <div className="flex gap-2 items-center p-2 border-b border-b-gray-200">
          <div className="itemShowCenter h-12 w-12 rounded-full overflow-hidden border-2 border-white">
            <img
              className="w-full object-cover"
              src="https://images.unsplash.com/photo-1660910859696-2474e4433c7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
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
            <NavLink
              className="activeAdd bg-purple-200 rounded-lg"
              to={"/dashboard/addPost"}
            >
              <div className="addPost flex py-10 justify-center cursor-pointer  items-center ">
                <div className="rounded-full bg-white p-2  text-gray-400 font-bold">
                  <AiOutlineFileAdd />
                </div>
              </div>
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
