import React from "react";
import Feature from "./Feature";
import HeadingFe from "./HeadingFe";
import Newest from "./Newest";
import SimilarPost from "./SimilarPost";

const Content = () => {
  return (
    <div className="mt-5">
      <div>
        <HeadingFe>Feature</HeadingFe>
        <Feature></Feature>
        <HeadingFe>Newest update</HeadingFe>
        <Newest></Newest>
        <HeadingFe>Similar Post</HeadingFe>
        <SimilarPost></SimilarPost>
      </div>
    </div>
  );
};

export default Content;
