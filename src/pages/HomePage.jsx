import React from "react";
import Banner from "../components/home/Banner";
import Content from "../components/home/Content";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/Error/ErrorFallback";

const HomePage = () => {
  return (
    <div className="p-4 w-full">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Banner></Banner>
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Content></Content>
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;
