import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AuthMain from "../pageAuth/AuthMain";
import Heading from "../components/Heading";
import Input from "../components/Input";
import Button from "../components/Button";
import { IconEyeHide, IconEyeShow } from "../icons";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [showPass, setShowPass] = useState(false);
  const schema = yup.object({
    usename: yup
      .string()
      .required("Bạn chưa nhập username")
      .min(3, "username quá ngắn"),
    email: yup
      .string()
      .email("Định dạng email không đúng")
      .required("Bạn chưa nhập email"),
    password: yup
      .string()
      .required("Bạn chưa nhập mật khẩu")
      .min(8, "Mật khẩu quá ngắn ( > 8)")
      .max(16, "Mật khẩu quá dài"),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = (value) => {
    console.log(value);
  };
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
        <Input control={control} placeholder="User Name" name="usename"></Input>
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
        <Button className="max-w-sm mt-3" type="submit">
          Đăng Ký
        </Button>
      </form>
    </AuthMain>
  );
};

export default RegisterPage;
