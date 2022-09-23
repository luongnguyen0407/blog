import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const DatePost = ({
  color = "text-white",
  author = "",
  date = "",
  to = "/",
  className = "",
}) => {
  return (
    <div
      className={`sm:flex text-xs sm:text-sm sm:font-bold  ${color} ${className}`}
    >
      <div>{date}-</div>
      <div>
        <Link className="whitespace-nowrap" to={to}>
          {author}
        </Link>
      </div>
    </div>
  );
};
DatePost.propTypes = {
  color: PropTypes.string,
};
export default DatePost;
