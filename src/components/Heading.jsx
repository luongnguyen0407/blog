import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Heading = ({
  children,
  center,
  size = "text-xl",
  className = "",
  to = "/",
}) => {
  return (
    <h2
      className={`font-semibold line-clamp-3 ${className} ${size} my-2 ${
        center ? "text-center" : ""
      }`}
    >
      <Link to={to} className="block">
        {children}
      </Link>
    </h2>
  );
};
Heading.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
  size: PropTypes.string,
  center: PropTypes.bool,
};
export default Heading;
