import React, { useRef, useState } from "react";
import { useWatch } from "react-hook-form";
import useOnClickOutside from "../../../hooks/useClickOutSide";
const DropDowHook = ({ name, setValue, control }) => {
  const { show, setShow, nodeRef } = useOnClickOutside();
  const jobValue = useWatch({
    control,
    name,
    defaultValue: "",
  });
  const handleSetValue = (e) => {
    setValue(name, e.target.dataset.value);
    setShow(false);
  };

  return (
    <div ref={nodeRef} className="relative cursor-pointer mt-4">
      <div
        onClick={() => setShow(!show)}
        className="p-5 bg-gray-200 border border-gray-200 rounded-lg flex items-center justify-between"
      >
        <p>Select you job</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      <div
        className={`absolute left-0 w-full ${
          show ? "" : "opacity-0 invisible"
        }`}
      >
        <div
          onClick={handleSetValue}
          className="p-5 bg-white border-gray-100 border-b border-r border-l"
          data-value="developer"
        >
          Developer
        </div>
        <div
          onClick={handleSetValue}
          className="p-5 bg-white border-gray-100 border-b border-r border-l"
          data-value="doctor"
        >
          Doctor
        </div>
        <div
          onClick={handleSetValue}
          className="p-5  bg-white"
          data-value="gamer"
        >
          Gamer
        </div>
      </div>
    </div>
  );
};

export default DropDowHook;
