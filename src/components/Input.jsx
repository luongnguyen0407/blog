import React, { memo } from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";

const Input = ({ control, icon, children, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <div className={`w-full max-w-sm ${icon ? "relative" : ""}`}>
      <input
        {...field}
        {...props}
        className={`w-full border border-b-gray-200 focus:border-b-yellow-100 transition-all border-transparent pt-3 pr-3 outline-none 
        }`}
      ></input>
      {icon && children}
    </div>
  );
};
Input.propTypes = {
  control: PropTypes.object.isRequired,
};
export default memo(Input);
