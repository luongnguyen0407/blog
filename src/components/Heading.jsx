import React from "react";

const Heading = ({ children, center }) => {
  return (
    <h2
      className={`font-semibold text-3xl my-2 ${center ? "text-center" : ""}`}
    >
      {children}
    </h2>
  );
};

export default Heading;
