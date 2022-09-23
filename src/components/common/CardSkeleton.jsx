import React from "react";
import "./Skeleton.scss";
const CardSkeleton = ({ className = "" }) => {
  return <div className={`h-52 skeleton rounded-lg ${className}`}></div>;
};

export default CardSkeleton;
