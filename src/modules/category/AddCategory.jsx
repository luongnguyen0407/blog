import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Field from "../../components/dashboard/Field";
import InputBorder from "../../components/dashboard/InputBorder";
import Label from "../../components/dashboard/Label";
import Radio from "../../components/dashboard/Radio";
import Heading from "../../components/Heading";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";
import slugify from "slugify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { statusCategory } from "../../utils/Const";

const AddCategory = () => {
  const schema = yup.object({
    name: yup
      .string()
      .max(16, "Name quá dài")
      .required("Bạn phải nhập tên category"),
  });
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const formErr = Object.values(errors);
    if (errors) {
      toast.error(formErr[0]?.message);
    }
  }, [errors]);
  const submitHandler = async (value) => {
    if (!isValid) return;
    const cloneValue = { ...value };
    cloneValue.slug = slugify(cloneValue.name || cloneValue.slug, {
      lower: true,
      locale: "vi",
      remove: /[*+~.()'"!:@]/g,
    });
    try {
      const colRef = collection(db, "category");
      addDoc(colRef, {
        ...cloneValue,
        createAt: serverTimestamp(),
      });
      toast.success("Thêm category thành công");
      reset({
        name: "",
        slug: "",
        status: 1,
      });
    } catch (error) {
      toast.warning(error);
    }
  };
  const watchStatus = watch("status");
  return (
    <div className="p-6">
      <div className="mb-8">
        <Heading>New Category</Heading>
        <p>Add new category</p>
      </div>
      <form onSubmit={handleSubmit(submitHandler)} action="">
        <div className="flex gap-5 items-center">
          <Field>
            <Label htmlFor="name">Name</Label>
            <InputBorder
              id="name"
              placeholder="Enter name category"
              control={control}
              name="name"
            ></InputBorder>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <InputBorder
              id="slug"
              placeholder="Enter slug category"
              control={control}
              name="slug"
            ></InputBorder>
          </Field>
          <Field>
            <Label htmlFor="status">Status</Label>
            <div className="flex gap-4">
              <Radio
                control={control}
                name="status"
                checked={Number(watchStatus) === statusCategory.Approved}
                value={1}
              >
                Approved
              </Radio>
              <Radio
                control={control}
                name="status"
                checked={Number(watchStatus) === statusCategory.Unapproved}
                value={2}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          type="submit"
          className="bg-blue-400 max-w-[200px] m-auto flex items-center mt-4"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          Add New Category
        </Button>
      </form>
    </div>
  );
};

export default AddCategory;
