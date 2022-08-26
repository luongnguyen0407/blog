import React from "react";

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

export default ButtonXs;
