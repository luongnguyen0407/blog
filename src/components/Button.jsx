import React, { memo } from "react";

const Button = ({
  className = "",
  children,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`disabled:opacity-60 h-[50px] p-3 w-full bg-black text-white font-semibold rounded-lg flex justify-center ${className}`}
    >
      {children}
    </button>
  );
};

export default memo(Button);
