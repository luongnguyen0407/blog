import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import AuthMain from "../layouts/AuthMain";
import Heading from "../components/Heading";
import Input from "../components/Input";
import Button from "../components/Button";
import { IconEyeHide, IconEyeShow } from "../icons";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { auth, db } from "../firebase-app/firebase-config";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  //validate
  const schema = yup.object({
    username: yup
      .string()
      .max(10, "username quá dài")
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
    formState: { errors, isValid },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  //submit
  const onSubmitHandler = async (value) => {
    if (!isValid) return;
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
      });
      // await addDoc(colsRef, {
      //   username,
      //   email,
      //   password,
      // });
      await updateProfile(auth.currentUser, {
        displayName: username,
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
