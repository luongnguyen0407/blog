import React from "react";
import Feature from "./Feature";
import HeadingFe from "./HeadingFe";
import Newest from "./Newest";
import SimilarPost from "./SimilarPost";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../Error/ErrorFallback";
const Content = () => {
  return (
    <div className="mt-5">
      <div>
        <HeadingFe>Feature</HeadingFe>
        <Feature></Feature>
        <HeadingFe>Newest update</HeadingFe>
        <Newest></Newest>
        <div className="mt-10">
          <HeadingFe>Similar Post</HeadingFe>
          <SimilarPost></SimilarPost>
        </div>
      </div>
    </div>
  );
};

export default Content;
