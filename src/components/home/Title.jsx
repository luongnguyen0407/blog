import React from "react";

const Title = ({ children, className = "" }) => {
  return <h2 className={` isHidden font-semibold ${className}`}>{children}</h2>;
};

export default Title;
