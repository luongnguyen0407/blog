import React, { memo } from "react";

const Button = ({ className = "", children, type = "button", onClick }) => {
  return (
    <button
      type={type}
      className={`p-3 w-full bg-black text-white font-semibold rounded-lg ${className}`}
    >
      {children}
    </button>
  );
};

export default memo(Button);
