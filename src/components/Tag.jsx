import React from "react";

const Tag = ({ children, bg = "bg-white" }) => {
  return (
    <p className={`rounded-lg ${bg} text-gray-400 px-2 text-sm py-1 inline`}>
      {children}
    </p>
  );
};

export default Tag;
