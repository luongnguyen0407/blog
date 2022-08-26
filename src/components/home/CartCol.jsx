import React from "react";
import Heading from "../Heading";
import Tag from "../Tag";
import DatePost from "./DatePost";

const CartCol = ({ className }) => {
  return (
    <div className="w-full cursor-pointer">
      <div className="w-full rounded-lg overflow-hidden mb-3">
        <img
          className="w-full object-cover"
          src="https://images.unsplash.com/photo-1603373768162-050da3780406?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt=""
        />
      </div>
      <Tag bg="bg-purple-200">Kiến thức</Tag>
      <Heading className={className}>
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </Heading>
      <DatePost color="text-gray-400"></DatePost>
    </div>
  );
};

export default CartCol;
