import React from "react";
import CartCol from "./CartCol";
import CartRow from "./CartRow";

const Newest = () => {
  return (
    <div className="grid grid-cols-2 gap-10">
      <CartCol></CartCol>
      <div className="p-6 bg-purple-100 rounded-lg flex flex-col justify-around">
        <CartRow
          tag="Kiến thức"
          heading="Hướng dẫn setup phòng cực chill dành cho người mới toàn tập"
        ></CartRow>
        <CartRow
          tag="Kiến thức"
          heading="Hướng dẫn setup phòng cực chill dành cho người mới toàn tập"
        ></CartRow>
        <CartRow
          tag="Kiến thức"
          heading="Hướng dẫn setup phòng cực chill dành cho người mới toàn tập"
        ></CartRow>
      </div>
    </div>
  );
};

export default Newest;
