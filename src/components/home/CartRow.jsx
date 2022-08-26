import React from "react";
import Heading from "../Heading";
import Tag from "../Tag";
import PropTypes from "prop-types";
import DatePost from "./DatePost";

const CartRow = ({ tag, heading }) => {
  return (
    <div className="flex gap-3 cursor-pointer py-3 border-b border-gray-300">
      <div className="w-2/6 rounded-lg overflow-hidden ">
        <img
          className="object-cover"
          src="https://images.unsplash.com/photo-1617850687395-620757feb1f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt=""
        />
      </div>
      <div className="w-4/6">
        <Tag>{tag}</Tag>
        <Heading size="text-base" className="line-clamp-2">
          {heading}
        </Heading>
        <DatePost color="text-gray-400"></DatePost>
      </div>
    </div>
  );
};
CartRow.propTypes = {
  tag: PropTypes.string,
  heading: PropTypes.string,
};
export default CartRow;
