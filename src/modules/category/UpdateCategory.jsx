import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/Button";
import Field from "../../components/dashboard/Field";
import InputBorder from "../../components/dashboard/InputBorder";
import Label from "../../components/dashboard/Label";
import Radio from "../../components/dashboard/Radio";
import { statusCategory } from "../../utils/Const";
import fetchData from "../../utils/getDoc";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";
import slugify from "slugify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";

const UpdateCategory = () => {
  const [param] = useSearchParams();
  const categoryId = param.get("id");
  const schema = yup.object({
    name: yup
      .string()
      .max(16, "Name quá dài")
      .required("Bạn phải nhập tên category"),
  });
  const {
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
    control,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  //getdata
  useEffect(() => {
    if (!categoryId) return;
    async function getData() {
      const res = await fetchData("category", categoryId);
      reset(res);
    }
    getData();
  }, [categoryId]);

  //toast err
  useEffect(() => {
    const formErr = Object.values(errors);
    if (errors) {
      toast.error(formErr[0]?.message);
    }
  }, [errors]);

  if (!categoryId) return;

  //update
  const updateHandler = async (value) => {
    if (!isValid) return;
    const cloneValue = { ...value };
    const colRef = doc(db, "category", categoryId);
    cloneValue.name =
      cloneValue.name.charAt(0).toUpperCase() + cloneValue.name.slice(1);
    try {
      await updateDoc(colRef, {
        name: cloneValue.name,
        slug: slugify(cloneValue.name || cloneValue.slug, {
          lower: true,
          locale: "vi",
          remove: /[*+~.()'"!:@]/g,
        }),
        status: Number(cloneValue.status),
      });
      toast.success("Cập nhật thành công");
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật thành công");
    }
  };
  const watchStatus = watch("status");
  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(updateHandler)} action="">
        <div className="sm:flex sm:gap-5 sm:items-center">
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
                value={statusCategory.Approved}
              >
                Approved
              </Radio>
              <Radio
                control={control}
                name="status"
                checked={Number(watchStatus) === statusCategory.Unapproved}
                value={statusCategory.Unapproved}
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
          Update Category
        </Button>
      </form>
    </div>
  );
};

export default UpdateCategory;
