import React from "react";

const Label = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="font-bold cursor-pointer mb-3 block">
      {children}
    </label>
  );
};

export default Label;
