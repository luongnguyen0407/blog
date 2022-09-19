import React, { useEffect, useState } from "react";
import Heading from "../Heading";
import Tag from "../Tag";
import DatePost from "./DatePost";
import PropTypes from "prop-types";
import fetchData from "../../utils/getDoc";
import slugify from "slugify";
import { Link } from "react-router-dom";
const CardFeature = ({ data }) => {
  const [category, setCategory] = useState();
  const [author, setAuthor] = useState();
  useEffect(() => {
    async function getData() {
      const Cate = await fetchData("category", data.categoryId);
      const Author = await fetchData("users", data.useCreatePost);
      setCategory(Cate);
      setAuthor(Author);
    }
    getData();
  }, []);
  if (!data || !data.id) return;
  const date = new Date(data?.createAt?.seconds * 1000);
  const createDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <div className="relative overflow-hidden rounded-lg cursor-pointer h-[200px]">
      <Link className="absolute z-10 inset-0" to={`post/${data.slug}`}></Link>
      <div className="absolute overlay inset-0 select-none"></div>
      <img className="w-full h-full object-cover" src={data.imgUrl} alt="" />
      <div className="absolute top-0 z-20 p-2 left-0 w-full items-center">
        <div className="flex justify-between">
          <Tag to={category?.slug || "doi-song"}>
            {category?.name || "Đời sống"}
          </Tag>
          <div>
            <DatePost
              date={createDate}
              author={author?.username || "Khuyết danh"}
              to={slugify(author?.username || "Khuyết danh", { lower: true })}
            ></DatePost>
          </div>
        </div>
        <Heading
          to={`post/${data.slug}`}
          className="line-clamp-3 text-white"
          size="text-xl"
        >
          {data.title}
        </Heading>
      </div>
    </div>
  );
};
CardFeature.propTypes = {
  data: PropTypes.object.isRequired,
};
export default CardFeature;
