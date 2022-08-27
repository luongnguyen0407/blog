import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import DropDowHook from "../../components/dashboard/dropdow/DropDowHook";
import Field from "../../components/dashboard/Field";
import ImageUpload from "../../components/dashboard/ImageUpload";
import InputBorder from "../../components/dashboard/InputBorder";
import Label from "../../components/dashboard/Label";
import Radio from "../../components/dashboard/Radio";

const postStatus = {
  Approved: 1,
  Pending: 2,
  Reject: 3,
};
const AddNewPost = () => {
  const [selectImageFile, setSelectImageFile] = useState();
  const [previewUrl, setPreviewUrl] = useState("");
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
  });
  const addNewPostHandler = (value) => {
    value.slug = slugify(value.slug || value.title);
    console.log(value);
  };
  const watchStatus = watch("status");

  const handleSelectImg = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectImageFile(undefined);
      return;
    }
    setSelectImageFile(e.target.files[0]);
  };
  useEffect(() => {
    if (!selectImageFile) {
      setPreviewUrl(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectImageFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectImageFile]);
  const handleDeleteImg = () => {
    setPreviewUrl(undefined);
    console.log("ok");
  };
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit(addNewPostHandler)} action="">
        <div className="flex gap-5">
          <Field>
            <Label htmlFor="title">Title</Label>
            <InputBorder
              id="title"
              placeholder="Enter post title"
              control={control}
              name="title"
            ></InputBorder>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <InputBorder
              id="slug"
              placeholder="Enter post slug"
              control={control}
              name="slug"
            ></InputBorder>
          </Field>
        </div>
        <div className="flex gap-5 items-center my-4">
          <Field>
            <Label htmlFor="status">Status</Label>
            <div className="flex gap-4">
              <Radio
                control={control}
                name="status"
                checked={Number(watchStatus) === postStatus.Approved}
                value={1}
              >
                Approved
              </Radio>
              <Radio
                control={control}
                name="status"
                checked={Number(watchStatus) === postStatus.Pending}
                value={2}
              >
                Pending
              </Radio>
              <Radio
                control={control}
                name="status"
                checked={Number(watchStatus) === postStatus.Reject}
                value={3}
              >
                Reject
              </Radio>
            </div>
          </Field>
          <Field>
            <Label htmlFor="author">Author</Label>
            <InputBorder
              id="author"
              placeholder="Enter post author"
              control={control}
              name="author"
            ></InputBorder>
          </Field>
        </div>
        <div className="flex gap-5">
          <Field>
            <Label htmlFor="">Image</Label>
            <ImageUpload
              previewUrl={previewUrl}
              onChange={handleSelectImg}
              handleDeleteImg={handleDeleteImg}
            ></ImageUpload>
          </Field>
          <Field>
            <Label htmlFor="">Job</Label>
            <DropDowHook
              control={control}
              name="job"
              setValue={setValue}
            ></DropDowHook>
          </Field>
        </div>
        <button
          type="submit"
          className="p-3 rounded-lg bg-blue-400 text-white font-semibold w-48 block mx-auto mt-20"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewPost;
