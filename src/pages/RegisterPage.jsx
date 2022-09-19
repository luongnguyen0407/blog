import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/Input";
import Loading from "../components/Loading";
import { auth, db } from "../firebase-app/firebase-config";
import { IconEyeHide, IconEyeShow } from "../icons";
import AuthMain from "../layouts/AuthMain";
import { roleUser, statusUser } from "../utils/Const";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  //validate
  const schema = yup.object({
    username: yup
      .string()
      .max(16, "username quá dài")
      .required("Bạn chưa nhập username"),
    email: yup
      .string()
      .email("Định dạng email không đúng")
      .required("Bạn chưa nhập email"),
    password: yup
      .string()
      .min(8, "Mật khẩu quá ngắn ( > 8)")
      .max(16, "Mật khẩu quá dài")
      .required("Bạn chưa nhập mật khẩu"),
  });
  //end validate
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  //submit
  const onSubmitHandler = async (value) => {
    setIsLoading(true);
    try {
      console.log(value);
      const { email, password, username } = value;
      await createUserWithEmailAndPassword(auth, email, password);
      // const colsRef = collection(db, "users");
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        username,
        email,
        password,
        avatar:
          "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
        status: statusUser.Active,
        role: roleUser.User,
        createAt: serverTimestamp(),
      });
      // await addDoc(colsRef, {
      //   username,
      //   email,
      //   password,
      // });
      await updateProfile(auth.currentUser, {
        displayName: username,
        photoURL:
          "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
      });
      toast.success("Đăng ký thành công", {
        delay: 0,
        pauseOnHover: false,
      });
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.warn("Email đã sử dụng");
    }
  };

  //
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (errors) {
      toast.error(arrErrors[0]?.message);
    }
  }, [errors]);

  return (
    <AuthMain>
      <Heading center>Đăng Ký</Heading>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-full flex flex-col items-center gap-3"
        action=""
      >
        <Input
          control={control}
          placeholder="User Name"
          name="username"
        ></Input>
        <Input control={control} placeholder="Email" name="email"></Input>
        <Input
          control={control}
          icon
          placeholder="Password"
          name="password"
          type={`${showPass ? "text" : "password"}`}
        >
          {showPass ? (
            <IconEyeHide onClick={() => setShowPass(false)}></IconEyeHide>
          ) : (
            <IconEyeShow onClick={() => setShowPass(true)}></IconEyeShow>
          )}
        </Input>
        <p>
          Bạn đã có tài khoản ?
          <Link className="text-blue-300 text-sm" to={"/login"}>
            đăng nhập
          </Link>
        </p>
        <Button disabled={isLoading} className="max-w-sm mt-3" type="submit">
          {isLoading ? <Loading></Loading> : " Đăng Ký"}
        </Button>
      </form>
    </AuthMain>
  );
};

export default RegisterPage;
