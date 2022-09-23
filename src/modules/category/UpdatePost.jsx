import { yupResolver } from "@hookform/resolvers/yup";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import ImageUploader from "quill-image-uploader";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import * as yup from "yup";
import { postStatus } from "../../assets/Const";
import Button from "../../components/Button";
import DropDowHook from "../../components/dashboard/dropdow/DropDowHook";
import Field from "../../components/dashboard/Field";
import ImageUpload from "../../components/dashboard/ImageUpload";
import InputBorder from "../../components/dashboard/InputBorder";
import Label from "../../components/dashboard/Label";
import Radio from "../../components/dashboard/Radio";
import Toggle from "../../components/dashboard/Toggle";
import { useAuth } from "../../contexts/auth-context";
import { db } from "../../firebase-app/firebase-config";
import "../../pages/Dashboard/Post.scss";
import fetchData from "../../utils/getDoc";
Quill.register("modules/imageUploader", ImageUploader);

const UpdatePost = () => {
  const [selectImageFile, setSelectImageFile] = useState();
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [dataCategory, setDataCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [contentPost, setContentPost] = useState("");
  const [param] = useSearchParams();
  const postId = param.get("id");
  const { userInfor } = useAuth();
  if (!postId) return;
  //validate
  const schema = yup.object({
    title: yup.string().required("Bạn phải nhập tiêu đề"),
    category: yup.object().required("Bạn phải chọn Category"),
  });
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      category: "",
      hot: false,
    },
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");

  const handleSaveValue = async (values) => {
    if (userInfor.uid !== "OAJZZNGcxTWaSPCNJzMfk1crVkC3") {
      toast.error("Bạn không có quyền thực hiệu thao tác này");
      return;
    }
    values.slug = slugify(values.slug || values.title, {
      lower: true,
      locale: "vi",
      remove: /[*+~.()'"!:@]/g,
    });
    toast.info("Đang cập nhật bài viết");
    if (values.fileImg) {
      await handleUploadImg(values.fileImg, values);
    } else if (!values.fileImg) {
      updatePost(values.imgUrl, values);
    }
    setIsLoading(true);
    // create post
  };
  const handleUploadImg = async (file, value) => {
    const storage = getStorage();
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
          default:
            console.log("Loi");
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updatePost(downloadURL, value);
        });
      }
    );
  };
  const updatePost = async (imgUrl, value) => {
    const { hot, slug, title } = value;
    const colRef = doc(db, "posts", postId);
    await updateDoc(colRef, {
      category: {
        id: value.category.id,
        name: value.category.name,
      },
      useCreatePost: {
        id: value.useCreatePost.id,
        name: value.useCreatePost.name,
      },
      title,
      hot,
      slug,
      status: Number(value.status),
      imgUrl,
      detailPost: contentPost,
      createAt: serverTimestamp(),
    });
    toast.success("Cập nhật bài viết thành công");
    //reset field
    setIsLoading(false);
  };
  //get select image
  const handleSelectImg = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectImageFile(undefined);
      return;
    }
    //check img type
    const imgFile = e.target.files[0];
    if (imgFile.type.split("/")[0] !== "image") {
      toast.warning("Sai định dạng ảnh");
      return;
    }
    setSelectImageFile(imgFile);
    setValue("fileImg", imgFile);
  };

  //create img preview
  useEffect(() => {
    if (!selectImageFile) {
      setPreviewUrl(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectImageFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectImageFile]);
  //get category
  useEffect(() => {
    const resCategory = [];
    const getData = async () => {
      const cateRef = collection(db, "category");
      const q = query(cateRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        resCategory.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setDataCategory(resCategory);
    };
    getData();
  }, []);
  //valid err
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (errors) {
      toast.error(arrErrors[0]?.message);
    }
  }, [errors]);
  //delete img preview
  const handleDeleteImg = () => {
    setSelectImageFile(undefined);
    setPreviewUrl("");
    setValue("fileImg", "");
  };
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          console.log("upload: ~ file", file);
          const bodyFormData = new FormData();
          console.log("upload: ~ bodyFormData", bodyFormData);
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: "https://api.imgbb.com/1/upload?key=55707bd44a68a131b540327e9b99a0d8",
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );
  //get post
  useEffect(() => {
    if (!postId) return;
    async function getData() {
      const res = await fetchData("posts", postId);
      reset(res);
      setSelectCategory(res.category.name);
      setContentPost(res.detailPost);
      setPreviewUrl(res.imgUrl);
    }
    getData();
  }, [postId, reset]);

  return (
    <div className="p-3">
      <form onSubmit={handleSubmit(handleSaveValue)} action="">
        <div className="sm:flex sm:gap-5">
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
        <div className="sm:flex sm:gap-5 sm:items-center my-4">
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
            <Label>Feature Post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
        </div>
        <div></div>
        <div className="sm:flex gap-5">
          <Field>
            <Label htmlFor="">Image</Label>
            <ImageUpload
              previewUrl={previewUrl}
              onChange={handleSelectImg}
              handleDeleteImg={handleDeleteImg}
            ></ImageUpload>
          </Field>
          <Field>
            <Label htmlFor="">Category</Label>
            <DropDowHook
              control={control}
              name="category"
              setValue={setValue}
              data={dataCategory}
              setSelect={setSelectCategory}
            ></DropDowHook>
            {selectCategory && (
              <span className="mt-2 inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                {selectCategory}
              </span>
            )}
          </Field>
        </div>
        <div className="mt-6 entry-content">
          <ReactQuill
            theme="snow"
            modules={modules}
            value={contentPost}
            scrollingContainer="html"
            onChange={setContentPost}
          />
        </div>
        <Button
          type="submit"
          className="bg-blue-400 max-w-[200px] m-auto flex items-center mt-4"
          disabled={isLoading}
          loading={isLoading}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UpdatePost;
