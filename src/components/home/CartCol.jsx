import React from "react";
import Heading from "../Heading";
import Tag from "../Tag";
import DatePost from "./DatePost";
import PropTypes from "prop-types";

const CartCol = ({ className, data }) => {
  const date = new Date(data?.createAt?.seconds * 1000);
  const createDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <div className="w-full cursor-pointer pb-5 relative min-h-[390px]">
      <div className="w-full rounded-lg overflow-hidden mb-3">
        <img
          className="w-full object-cover min-h-[200px] block"
          src={data.imgUrl}
          alt=""
        />
      </div>
      <Tag bg="bg-purple-200">{data.category.name}</Tag>
      <Heading to={`/post/${data.slug}`} className={className}>
        {data.title}
      </Heading>
      <DatePost
        className="absolute bottom-0"
        color="text-gray-400"
        date={createDate}
        author={data.useCreatePost.name}
      />
    </div>
  );
};
CartCol.propTypes = {
  className: PropTypes.string,
};

export default CartCol;
