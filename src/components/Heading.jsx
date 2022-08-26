import React from "react";

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

export default Heading;
