import React from "react";

const NewSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="w-full flex flex-col gap-2 min-h-[400px]">
        <div className="skeleton flex-1 w-ful h-[350px] rounded-sm"></div>
        <p className="h-2 w-full skeleton"></p>
        <p className="h-2 skeleton w-3/5"></p>
        <span className="h-2 skeleton inline-block w-2/5"></span>
      </div>
      <div className="p-6 bg-purple-100 rounded-lg flex flex-col justify-around">
        <ColRowSe />
        <ColRowSe />
        <ColRowSe />
      </div>
    </div>
  );
};
const ColRowSe = () => {
  return (
    <div className="flex gap-3 cursor-pointer py-3 border-b border-gray-300">
      <div className="w-2/6 rounded-lg overflow-hidden h-[100px]">
        <div className="w-full h-full skeleton"></div>
      </div>
      <div className="w-4/6 flex flex-col gap-y-3">
        <p className="w-16 h-8 skeleton"></p>
        <p className="w-full h-5 skeleton"></p>
        <p className="w-16 h-5 skeleton"></p>
      </div>
    </div>
  );
};
export default NewSkeleton;
