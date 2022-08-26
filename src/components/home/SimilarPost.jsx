import React from "react";
import CartCol from "./CartCol";

const SimilarPost = () => {
  return (
    <div className="grid grid-cols-4 gap-5">
      <CartCol className="text-lg"></CartCol>
      <CartCol className="text-lg"></CartCol>
      <CartCol className="text-lg"></CartCol>
      <CartCol className="text-lg"></CartCol>
    </div>
  );
};

export default SimilarPost;
