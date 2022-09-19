import Toggle from "../../components/dashboard/Toggle";
import slugify from "slugify";
import React, { useEffect, useMemo, useState } from "react";
import Radio from "../../components/dashboard/Radio";
import Label from "../../components/dashboard/Label";
import InputBorder from "../../components/dashboard/InputBorder";
import ImageUpload from "../../components/dashboard/ImageUpload";
import Field from "../../components/dashboard/Field";
import DropDowHook from "../../components/dashboard/dropdow/DropDowHook";
import Button from "../../components/Button";
import * as yup from "yup";
import "react-quill/dist/quill.snow.css";
import "./Post.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/auth-context";
import { toast } from "react-toastify";
import { db } from "../../firebase-app/firebase-config";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";

const postStatus = {
  Approved: 1,
  Pending: 2,
  Reject: 3,
};
Quill.register("modules/imageUploader", ImageUploader);
const AddNewPost = () => {
  const [selectImageFile, setSelectImageFile] = useState();
  const [previewUrl, setPreviewUrl] = useState("");
  const [dataCategory, setDataCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userInfor } = useAuth();
  const [contentPost, setContentPost] = useState("");

  //validate
  const schema = yup.object({
    title: yup.string().required("Bạn phải nhập tiêu đề"),
    category: yup.string().required("Bạn phải chọn Category"),
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
  const watchfileImg = watch("fileImg");

  const handleSaveValue = async (value) => {
    if (watchfileImg === undefined) {
      toast.error("Bạn cần chọn ảnh");
      return;
    }
    if (!contentPost) {
      toast.error("Bạn cần điền nội dung bài viết");
      return;
    }
    setIsLoading(true);
    value.slug = slugify(value.slug || value.title, {
      lower: true,
      locale: "vi",
      remove: /[*+~.()'"!:@]/g,
    });
    await handleUploadImg(value.fileImg, value);
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
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            toast.info(`Đang tải ảnh lên ${Math.ceil(progress)}%`);
            break;
          default:
            console.log("Loi");
            break;
        }
      },
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
          addNewPostHandler(downloadURL, value);
        });
      }
    );
  };
  const addNewPostHandler = async (imgUrl, value) => {
    const { hot, slug, title } = value;
    const postRef = collection(db, "posts");
    await addDoc(postRef, {
      categoryId: value.category,
      useCreatePost: userInfor.uid,
      title,
      hot,
      slug,
      status: Number(value.status),
      imgUrl,
      detailPost: contentPost,
      createAt: serverTimestamp(),
    });
    toast.success("Tạo bài viết thành công");
    //reset field
    reset({
      title: "",
      slug: "",
      status: 2,
      category: "",
      hot: false,
    });
    handleDeleteImg();
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
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit(handleSaveValue)} action="">
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
          {/* <Field>
            <Label htmlFor="author">Author</Label>
            <InputBorder
              id="author"
              placeholder="Enter post author"
              control={control}
              name="author"
            ></InputBorder>
          </Field> */}
          <Field>
            <Label>Feature Post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
        </div>
        <div></div>
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
            <Label htmlFor="">Category</Label>
            <DropDowHook
              control={control}
              name="category"
              setValue={setValue}
              data={dataCategory}
            ></DropDowHook>
          </Field>
        </div>
        <div className="mt-6 entry-content">
          <ReactQuill
            theme="snow"
            modules={modules}
            value={contentPost}
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

export default AddNewPost;
