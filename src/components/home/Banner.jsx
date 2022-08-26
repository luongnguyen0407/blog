import React from "react";
import Heading from "../Heading";
import ButtonXs from "./ButtonXs";
import Title from "./Title";

const Banner = () => {
  return (
    <div className="bg-banner p-3 flex pb-0 h-96 bg-home_banner bg-center rounded-lg text-white">
      <div className="w-2/4 relative">
        <div className="absolute top-2/4 -translate-y-2/4 ">
          <Heading size="text-4xl">Why React Re-Renders</Heading>
          <Title className="my-4 line-clamp-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
          </Title>
          <ButtonXs className="w-52 p-3 text-blue-400" color="bg-white">
            Get Started
          </ButtonXs>
        </div>
      </div>
      <div className="w-2/4">
        <img
          className="max-w-full object-cover h-full"
          src="/banner.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
