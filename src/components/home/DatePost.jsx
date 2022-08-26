import React from "react";

const DatePost = ({ color = "text-white" }) => {
  return (
    <div className={`flex text-sm font-bold  ${color}`}>
      <div>Mar 23 - </div>
      <div>Andiez Le</div>
    </div>
  );
};

export default DatePost;
