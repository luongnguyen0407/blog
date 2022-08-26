import React from "react";
import PropTypes from "prop-types";

const Title = ({ children, className = "" }) => {
  return <h2 className={` isHidden font-semibold ${className}`}>{children}</h2>;
};
Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.string,
};
export default Title;
