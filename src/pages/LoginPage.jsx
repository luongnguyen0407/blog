import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
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
import { auth } from "../firebase-app/firebase-config";
const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  //validate
  const schema = yup.object({
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
      const { email, password } = value;
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Đăng Nhập thành công", {
        delay: 0,
        pauseOnHover: false,
      });
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.warn("Sever không phản hồi");
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
      <Heading center>Đăng Nhập</Heading>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-full flex flex-col items-center gap-3"
        action=""
      >
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
          Bạn chưa có tài khoản ?
          <Link className="text-blue-300 text-sm" to={"/register"}>
            đăng ký
          </Link>
        </p>
        <Button disabled={isLoading} className="max-w-sm mt-3" type="submit">
          {isLoading ? <Loading></Loading> : " Đăng nhập"}
        </Button>
      </form>
    </AuthMain>
  );
};

export default LoginPage;
