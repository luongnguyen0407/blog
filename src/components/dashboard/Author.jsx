import React, { useEffect } from "react";
import { useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import fetchData from "../../utils/getDoc";
import ErrorFallback from "../Error/ErrorFallback";
import HeadingFe from "../home/HeadingFe";

const Author = ({ author }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    async function getData() {
      const Author = await fetchData("users", author);
      setData(Author);
    }
    getData();
  }, [author]);
  if (!author || !data?.username) return;
  return (
    <>
      <div className="author-image w-[200px] max-h-[200px] flex-shrink-0 rounded-lg mx-auto">
        <img className="rounded-lg" src={data?.avatar} alt="" />
      </div>
      <div className="author-content">
        <HeadingFe className="author-name">{data?.username}</HeadingFe>
        <p className="author-desc">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          non animi porro voluptates quibusdam optio nulla quis nihil ipsa error
          delectus temporibus nesciunt, nam officiis adipisci suscipit voluptate
          eum totam!
        </p>
      </div>
    </>
  );
};

export default withErrorBoundary(Author, {
  FallbackComponent: ErrorFallback,
});
