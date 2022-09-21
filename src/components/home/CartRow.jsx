import React from "react";
import Heading from "../Heading";
import Tag from "../Tag";
import PropTypes from "prop-types";
import DatePost from "./DatePost";

const CartRow = ({ post }) => {
  const date = new Date(post?.createAt?.seconds * 1000);
  const createDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <div className="flex gap-3 cursor-pointer py-3 border-b border-gray-300">
      <div className="w-2/6 rounded-lg overflow-hidden ">
        <img className="object-cover w-full h-full" src={post.imgUrl} alt="" />
      </div>
      <div className="w-4/6">
        <Tag>{post.category.name}</Tag>
        <Heading
          to={`/post/${post.slug}`}
          size="text-base"
          className="line-clamp-2"
        >
          {post.title}
        </Heading>
        <DatePost
          color="text-gray-400"
          date={createDate}
          author={post.useCreatePost.name}
        />
      </div>
    </div>
  );
};
CartRow.propTypes = {
  tag: PropTypes.string,
  heading: PropTypes.string,
};
export default CartRow;
