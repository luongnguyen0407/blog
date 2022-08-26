import React from "react";
import PropTypes from "prop-types";
const HeadingFe = ({ children }) => {
  return <p className="text-blue-400 text-2xl my-5 font-bold">{children}</p>;
};

HeadingFe.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
};
export default HeadingFe;
