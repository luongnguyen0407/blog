import React from "react";

const ImageUpload = (props) => {
  const {
    name,
    className = "",
    handleDeleteImg,
    previewUrl,
    image = "",
    ...rest
  } = props;
  return (
    <div className="relative group">
      {previewUrl && (
        <div
          onClick={handleDeleteImg}
          className="opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible w-16 h-16 cursor-pointer text-red-400 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 rounded-full z-20 bg-white flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 pointer-events-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      )}
      <label
        className={`cursor-pointer flex items-center c justify-center bg-gray-100  border border-dashed w-full min-h-[200px] max-h-[200px] rounded-lg ${className} relative overflow-hidden`}
      >
        <input
          type={`${previewUrl ? "text" : "file"}`}
          name={name}
          className="hidden-input"
          onChange={() => {}}
          {...rest}
        />
        <div className="flex justify-center flex-col items-center text-center pointer-events-none">
          {previewUrl && (
            <>
              <img
                src={previewUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </>
          )}
          {!previewUrl && (
            <>
              <img
                src="/img-upload.png"
                alt="upload-img"
                className="max-w-[80px] mb-5"
              />
              <p className="font-semibold">Choose photo</p>
            </>
          )}
        </div>
      </label>
    </div>
  );
};

export default ImageUpload;
