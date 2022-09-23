import React from "react";
import Banner from "../components/home/Banner";
import Content from "../components/home/Content";

const HomePage = () => {
  return (
    <div className="p-4 w-4/5 flex-1">
      <Banner></Banner>
      <Content></Content>
    </div>
  );
};

export default HomePage;
