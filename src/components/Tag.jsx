import React from "react";
import { Link } from "react-router-dom";
const Tag = ({ children, bg = "bg-white", to = "/" }) => {
  return (
    <p className={`rounded-lg ${bg} text-gray-400 px-2 text-sm py-1 inline`}>
      <Link to={to}>{children}</Link>
    </p>
  );
};

export default Tag;
