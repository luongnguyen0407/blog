import React from "react";
import PropTypes from "prop-types";

const Heading = ({ children, center, size = "text-3xl", className = "" }) => {
  return (
    <h2
      className={`font-semibold ${size} ${className}  my-2 ${
        center ? "text-center" : ""
      }`}
    >
      {children}
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
