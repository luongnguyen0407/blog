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
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <HeadingFe>Feature</HeadingFe>
          <Feature></Feature>
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <HeadingFe>Newest update</HeadingFe>
          <Newest></Newest>
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <HeadingFe>Similar Post</HeadingFe>
          <SimilarPost></SimilarPost>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Content;
