import React from "react";
import Heading from "../Heading";
import Tag from "../Tag";
import DatePost from "./DatePost";

const CardFeature = ({ tag, heading }) => {
  return (
    <div className="relative overflow-hidden rounded-lg cursor-pointer">
      <div className="absolute overlay inset-0 select-none"></div>
      <img
        className="w-full h-full object-cover"
        src="https://images.unsplash.com/photo-1629079448105-35ab3e5152d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
        alt=""
      />
      <div className="absolute top-0 p-2 left-0 w-full items-center h-full">
        <div className="flex justify-between">
          <Tag>{tag}</Tag>
          <div>
            <DatePost></DatePost>
          </div>
        </div>
        <Heading className="line-clamp-3 text-white" size="text-xl">
          {heading}
        </Heading>
      </div>
    </div>
  );
};

export default CardFeature;
