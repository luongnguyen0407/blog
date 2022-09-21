import React, { useState } from "react";
import { useWatch } from "react-hook-form";
import useOnClickOutside from "../../../hooks/useClickOutSide";
const DropDowHook = ({
  name,
  setValue,
  control,
  data,
  setSelect = () => {},
}) => {
  const { show, setShow, nodeRef } = useOnClickOutside();
  const [categorySelect, setCategorySelect] = useState("Select post Category");
  useWatch({
    control,
    name,
    defaultValue: "",
  });
  const handleSetValue = (e) => {
    setValue(name, { id: e.target.dataset.value, name: e.target.textContent });
    setCategorySelect(e.target.textContent);
    setSelect(e.target.textContent);
    setShow(false);
  };

  return (
    <div ref={nodeRef} className="relative cursor-pointer mt-4">
      <div
        onClick={() => setShow(!show)}
        className="p-5 bg-gray-200 border border-gray-200 rounded-lg flex items-center justify-between"
      >
        <p>{categorySelect}</p>
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
        className={`absolute bg-white z-50 left-0 w-full ${
          show ? "" : "opacity-0 invisible"
        }`}
      >
        {data.length > 0 &&
          data.map((category) => (
            <div
              key={category.id}
              onClick={handleSetValue}
              className="p-5 bg-white border-gray-100 border-b border-r border-l"
              data-value={category.id}
            >
              {category.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default DropDowHook;
