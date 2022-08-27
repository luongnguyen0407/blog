import React from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const InputBorder = ({ control, name, ...props }) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  return (
    <input
      {...props}
      {...field}
      className="bg-gray-200 block w-full p-3 border border-gray-200 focus:border-blue-400 focus:bg-white transition-all rounded-lg outline-none"
    ></input>
  );
};
InputBorder.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};
export default InputBorder;
