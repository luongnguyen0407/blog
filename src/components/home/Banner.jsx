import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { Link } from "react-router-dom";
import ErrorFallback from "../Error/ErrorFallback";
import Heading from "../Heading";
import ButtonXs from "./ButtonXs";
import Title from "./Title";

const Banner = () => {
  return (
    <div className="bg-banner relative overflow-hidden flex pb-0 h-52 md:h-60 lg:h-96  bg-center rounded-lg text-white">
      <div className="w-full relative">
        <img
          src="/bnne.png"
          alt=""
          className="absolute inset-0 min-h-full w-full object-cover"
        />
        <div className="z-10 absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute top-2/4 -translate-y-2/4 w-3/5 left-5 z-20 select-none">
          <Heading size="text-2xl md:text-3xl lg:text-4xl">Hello World</Heading>
          <Title className="my-4 line-clamp-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
          </Title>
          <Link to={"/dashboard/post"}>
            <ButtonXs className="w-52 p-3 text-blue-400" color="bg-white">
              Get Started
            </ButtonXs>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(Banner, {
  FallbackComponent: ErrorFallback,
});
