import React from "react";
import PropTypes from "prop-types";
const DatePost = ({ color = "text-white" }) => {
  return (
    <div className={`flex text-sm font-bold  ${color}`}>
      <div>Mar 23 - </div>
      <div>Andiez Le</div>
    </div>
  );
};
DatePost.propTypes = {
  color: PropTypes.string,
};
export default DatePost;
