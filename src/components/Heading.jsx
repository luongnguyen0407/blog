import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Heading = ({
  children,
  center,
  size = "text-3xl",
  className = "",
  to = "/",
}) => {
  return (
    <h2
      className={`font-semibold ${size} ${className}  my-2 ${
        center ? "text-center" : ""
      }`}
    >
      <Link to={to}>{children}</Link>
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
