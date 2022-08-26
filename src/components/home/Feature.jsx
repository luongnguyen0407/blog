import React from "react";
import CardFeature from "./CartFeature";

const Feature = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <CardFeature
        tag="Kiến thức"
        heading="Hướng dẫn setup phòng cực chill dành cho người mới toàn tập"
      ></CardFeature>
      <CardFeature
        tag="Kiến thức"
        heading="Hướng dẫn setup phòng cực chill dành cho người mới toàn tập"
      ></CardFeature>
      <CardFeature
        tag="Kiến thức"
        heading="Hướng dẫn setup phòng cực chill dành cho người mới toàn tập"
      ></CardFeature>
    </div>
  );
};

export default Feature;
