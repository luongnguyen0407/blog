import React from "react";
import PropTypes from "prop-types";

const ButtonXs = ({
  children,
  className = "",
  onClick,
  color = "bg-red-400",
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} px-1 rounded-lg ${color} text-white`}
    >
      {children}
    </button>
  );
};
ButtonXs.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
};

export default ButtonXs;
