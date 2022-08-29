import React, { memo } from "react";
import PropTypes from "prop-types";
import Loading from "./Loading";

const Button = ({
  className = "",
  children,
  type = "button",
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`disabled:opacity-60 h-[50px] p-3 w-full bg-black text-white font-semibold rounded-lg flex justify-center ${className}`}
    >
      {loading ? <Loading></Loading> : children}
    </button>
  );
};
Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};
export default memo(Button);
