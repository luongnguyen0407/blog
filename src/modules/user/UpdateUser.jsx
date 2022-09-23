import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Field from "../../components/dashboard/Field";
import InputBorder from "../../components/dashboard/InputBorder";
import Label from "../../components/dashboard/Label";
import Radio from "../../components/dashboard/Radio";
import Heading from "../../components/Heading";
import { roleUser, statusUser } from "../../utils/Const";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ImageUpload from "../../components/dashboard/ImageUpload";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { useSearchParams } from "react-router-dom";
import fetchData from "../../utils/getDoc";

const UpdateUser = () => {
  const [param] = useSearchParams();
  const userId = param.get("id");
  const [selectAvatarFile, setSelectAvatarFile] = useState();
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const schema = yup.object({
    username: yup.string().required("Bạn cần nhập username"),
    email: yup
      .string()
      .email("Email không đúng định dạng")
      .required("Bạn cần nhập email"),
    password: yup
      .string()
      .min(8, "password quá ngắn")
      .max(16, "password quá dài"),
    address: yup.string().required("Bạn phải nhập địa chỉ user"),
    role: yup.number().required("Bạn cần chọn quyền của user"),
    status: yup.number().required("Bạn cần chọn trạng thái của user"),
  });
  const {
    handleSubmit,
    formState: { errors, isValid },
    watch,
    control,
    setValue,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = async (values) => {
    if (watchfileImg === undefined) {
      toast.error("Bạn cần chọn ảnh");
      return;
    }
    setIsLoading(true);
    if (typeof values.fileImg === "object") {
      await handleUploadImg(values.fileImg, values);
      const imageRegex = /%2F(\S+)\?/gm.exec(values.avatar);
      const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
      handleDeleteImgDatabase(imageName);
    } else if (typeof values.fileImg === "string") {
      updateUser(values.fileImg, values);
    }
  };
  const handleDeleteImgDatabase = async (nameImg) => {
    if (nameImg) {
      const storage = getStorage();
      const desertRef = ref(storage, "avatar/" + nameImg);
      deleteObject(desertRef)
        .then(() => console.log("delete done"))
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleUploadImg = async (file, value) => {
    const storage = getStorage();
    toast.info("Đang tải ảnh lên");
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, "avatar/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            setIsLoading(false);
            break;
          case "running":
            break;
          default:
            console.log("Loi");
            setIsLoading(false);
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            setIsLoading(false);
            break;
          case "storage/unknown":
            break;
          default:
            console.log("Loi");
            setIsLoading(false);
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateUser(downloadURL, value);
        });
      }
    );
  };
  const updateUser = async (avatarUrl, value) => {
    if (!isValid || !avatarUrl) return;
    const { email, password, role, status, username } = value;
    const imgName = value.fileImg.name;
    try {
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, {
        email,
        password,
        role,
        status,
        username,
        avatar: avatarUrl,
      });
      toast.success("Update user information successfully!");
    } catch (error) {
      console.log(error);
      const storage = getStorage();
      const desertRef = ref(storage, "avatar/" + imgName);
      deleteObject(desertRef)
        .then(() => console.log("delete done"))
        .catch((error) => {
          console.log(error);
        });
      toast.warn("Email đã sử dụng");
    } finally {
      setIsLoading(false);
    }
  };

  //get select image
  const handleSelectImg = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectAvatarFile(undefined);
      return;
    }
    //check img type
    const imgFile = e.target.files[0];
    if (imgFile.type.split("/")[0] !== "image") {
      toast.warning("Sai định dạng ảnh");
      return;
    }
    setSelectAvatarFile(imgFile);
    setValue("fileImg", imgFile);
  };

  useEffect(() => {
    if (!selectAvatarFile) {
      setPreviewUrl(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectAvatarFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectAvatarFile]);

  useEffect(() => {
    if (!errors) return;
    const toastErr = Object.values(errors);
    toast.error(toastErr[0]?.message);
  }, [errors]);

  useEffect(() => {
    if (!userId) return;
    async function getData() {
      const res = await fetchData("users", userId);
      console.log(res);
      reset(res);
      setValue("fileImg", res.avatar);
      setPreviewUrl(res.avatar);
    }
    getData();
  }, [userId]);

  //delete img preview
  const handleDeleteImg = () => {
    setSelectAvatarFile(undefined);
    setPreviewUrl(undefined);
  };
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const watchfileImg = watch("fileImg");
  return (
    <div className="p-6">
      <div className="mb-2">
        <Heading>Update User</Heading>
        <p className="text-gray-300 italic">Update user</p>
      </div>
      <form action="" onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="flex justify-center mb-5">
          <Field className="text-center">
            <Label htmlFor="">Avatar</Label>
            <ImageUpload
              className="w-[200px] rounded-full mx-auto"
              previewUrl={previewUrl}
              onChange={handleSelectImg}
              handleDeleteImg={handleDeleteImg}
              size="h-[200px]"
            ></ImageUpload>
          </Field>
        </div>
        <div className="sm:flex sm:gap-5">
          <Field>
            <Label htmlFor="username">User Name</Label>
            <InputBorder
              id="username"
              placeholder="Enter User Name"
              control={control}
              name="username"
            ></InputBorder>
          </Field>
          <Field>
            <Label htmlFor="email">Email</Label>
            <InputBorder
              id="email"
              placeholder="Enter user email address"
              control={control}
              name="email"
            ></InputBorder>
          </Field>
        </div>
        <div className="sm:flex sm:gap-5 my-5">
          <Field>
            <Label htmlFor="password">PassWord</Label>
            <InputBorder
              id="password"
              type="password"
              placeholder="Enter User Password"
              control={control}
              name="password"
            ></InputBorder>
          </Field>
          <Field>
            <Label htmlFor="address">Address</Label>
            <InputBorder
              id="address"
              placeholder="Enter user address"
              control={control}
              name="address"
            ></InputBorder>
          </Field>
        </div>
        <div className="sm:flex sm:gap-5">
          <Field>
            <Label htmlFor="status">Status</Label>
            <div className="flex gap-4">
              <Radio
                control={control}
                name="status"
                checked={Number(watchStatus) === statusUser.Active}
                value={statusUser.Active}
              >
                Active
              </Radio>
              <Radio
                control={control}
                name="status"
                checked={Number(watchStatus) === statusUser.Pending}
                value={statusUser.Pending}
              >
                Pending
              </Radio>
              <Radio
                control={control}
                name="status"
                checked={Number(watchStatus) === statusUser.Ban}
                value={statusUser.Ban}
              >
                Banned
              </Radio>
            </div>
          </Field>
          <Field>
            <Label htmlFor="role">Role</Label>
            <div className="flex gap-4">
              <Radio
                control={control}
                name="role"
                checked={Number(watchRole) === roleUser.Admin}
                value={roleUser.Admin}
              >
                Admin
              </Radio>
              <Radio
                control={control}
                name="role"
                checked={Number(watchRole) === roleUser.Mod}
                value={roleUser.Mod}
              >
                Mod
              </Radio>
              <Radio
                control={control}
                name="role"
                checked={Number(watchRole) === roleUser.User}
                value={roleUser.User}
              >
                User
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          type="submit"
          className="bg-blue-400 max-w-[200px] m-auto flex items-center mt-4"
          disabled={isLoading}
          loading={isLoading}
        >
          Add New User
        </Button>
      </form>
    </div>
  );
};

export default UpdateUser;
