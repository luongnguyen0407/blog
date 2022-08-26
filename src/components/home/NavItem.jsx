import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import Title from "./Title";
const NavItem = ({ to = "/", title, icon }) => {
  return (
    <NavLink
      className="itemShowCenter w-full p-2 rounded-lg flex items-center gap-1 text-xl text-gray-500"
      to={to}
    >
      {icon}
      <Title>{title}</Title>
    </NavLink>
  );
};
NavItem.propTypes = {
  to: PropTypes.string,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};
export default NavItem;
