import React from "react";

const Field = ({ children, className = "" }) => {
  return <div className={`w-2/4 ${className}`}>{children}</div>;
};

export default Field;
