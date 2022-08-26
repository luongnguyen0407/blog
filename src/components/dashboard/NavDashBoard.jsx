import React from "react";
import NavItem from "../home/NavItem";

import {
  AiOutlineFileAdd,
  AiOutlineSafety,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
const LIST_NAV = [
  {
    title: "Add Post",
    icon: <AiOutlineFileAdd />,
    path: "/dashboard/addPost",
  },
  {
    title: "Category",
    icon: <AiOutlineSafety />,
    path: "/dashboard/category",
  },
  {
    title: "User",
    icon: <AiOutlineUsergroupAdd />,
    path: "/dashboard/user",
  },
];
const NavDashBoard = () => {
  return (
    <nav className="navDash flex justify-center p-3">
      {LIST_NAV.map((item) => (
        <NavItem
          key={item.title}
          title={item.title}
          icon={item.icon}
          to={item.path}
        ></NavItem>
      ))}
    </nav>
  );
};

export default NavDashBoard;
