import { addToast, Button, Input, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { FaCalendarAlt, FaUser, FaUserFriends } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../../schemas/signUpSchema";
import { useState } from "react";
import type { RegisterData } from "../../../types/registerData";
import authServices from "../../../services/authService";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const emailCreated = useNavigate();
  const [passwordisVisible, setpasswordIsVisible] = useState(false);
  const passwordVisibility = () => setpasswordIsVisible(!passwordisVisible);
  const [rePasswordisVisible, setrePasswordIsVisible] = useState(false);
  const rePasswordVisibility = () =>
    setrePasswordIsVisible(!rePasswordisVisible);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  async function signUp(values: RegisterData) {
    setIsLoading(true);
    try {
      const data = await authServices.signUp(values);
      emailCreated("/login");
      addToast({
        title: "Account created",
        description: data.message,
        color: "success",
        timeout: 2000,
        shouldShowTimeoutProgress: true,
      });
    } catch (error: any) {
      addToast({
        title: "Sign up failed",
        description: error.response?.data?.message,
        color: "danger",
        timeout: 2000,
        shouldShowTimeoutProgress: true,
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit(signUp)}>
      <div className="grid gap-4">
        <div className="grid gap-3 text-center">
          <h1 className="text-[12px] sm:text-[14px] lg:text-[18px] font-bold mb-2.5">
            <span className="text-[25px] md:text-[30px] lg:text-[40px] text-[#00298d]">
              Create Account
            </span>
            <br /> & start your journey
          </h1>
        </div>

        <Input
          {...register("name")}
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name?.message}
          classNames={{
            input: "placeholder:text-gray-400/50 text-[12px] sm:text-[14px]",
          }}
          variant="bordered"
          type="text"
          color="primary"
          placeholder="Full Name"
          startContent={<FaUser className="text-slate-300 text-xl" />}
          size="lg"
          isClearable
        />

        <Input
          {...register("username")}
          errorMessage={errors.username?.message}
          isInvalid={!!errors.username?.message}
          classNames={{
            input: "placeholder:text-gray-400/50 text-[12px] sm:text-[14px]",
          }}
          variant="bordered"
          type="text"
          color="primary"
          placeholder="User Name [ optional ]"
          startContent={
            <MdOutlineAlternateEmail className="text-slate-300 text-2xl" />
          }
          size="lg"
          isClearable
        />

        <Input
          {...register("email")}
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email?.message}
          classNames={{
            input: "placeholder:text-gray-400/50 text-[12px] sm:text-[14px]",
          }}
          variant="bordered"
          type="email"
          color="primary"
          placeholder="email@example.com"
          startContent={
            <MdOutlineAlternateEmail className="text-slate-300 text-2xl" />
          }
          size="lg"
          isClearable
        />

        <Input
          {...register("dateOfBirth")}
          errorMessage={errors.dateOfBirth?.message}
          isInvalid={!!errors.dateOfBirth?.message}
          classNames={{
            input: "placeholder:text-gray-400/50 text-[12px] sm:text-[14px]",
          }}
          variant="bordered"
          type="date"
          color="primary"
          startContent={<FaCalendarAlt className="text-slate-300 text-xl" />}
          size="lg"
          isClearable
        />

        <Select
          {...register("gender")}
          errorMessage={errors.gender?.message}
          isInvalid={!!errors.gender?.message}
          aria-label="gender"
          classNames={{ value: "text-gray-400/50 text-[12px] sm:text-[14px]" }}
          variant="bordered"
          color="primary"
          placeholder="Select your gender"
          startContent={<FaUserFriends className="text-slate-300 text-2xl" />}
          size="lg"
          isClearable
        >
          <SelectItem key="male">Male</SelectItem>
          <SelectItem key="female">Female</SelectItem>
        </Select>

        <Input
          {...register("password")}
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password?.message}
          classNames={{
            input: "placeholder:text-gray-400/50 text-[12px] sm:text-[14px]",
          }}
          variant="bordered"
          type={passwordisVisible ? "text" : "password"}
          color="primary"
          placeholder="Enter your Password"
          startContent={<FaKey className="text-slate-300 text-xl" />}
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-solid outline-transparent"
              type="button"
              onClick={passwordVisibility}
            >
              {passwordisVisible ? (
                <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          size="lg"
          autoComplete="current-password"
        />

        <Input
          {...register("rePassword")}
          errorMessage={errors.rePassword?.message}
          isInvalid={!!errors.rePassword?.message}
          classNames={{
            input: "placeholder:text-gray-400/50 text-[12px] sm:text-[14px]",
          }}
          variant="bordered"
          type={rePasswordisVisible ? "text" : "password"}
          color="primary"
          placeholder="Confirm Password"
          startContent={<FaKey className="text-slate-300 text-xl" />}
          endContent={
            <button
              aria-label="toggle repassword visibility"
              className="focus:outline-solid outline-transparent"
              type="button"
              onClick={rePasswordVisibility}
            >
              {rePasswordisVisible ? (
                <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          size="lg"
        />

        <Button
          isDisabled={!isValid || isLoading}
          isLoading={isLoading}
          className="bg-linear-to-r to-[#00D2FF] via-[#0066FF] from-[#0033B5] text-white rounded-4xl"
          variant="solid"
          type="submit"
        >
          Sign Up
        </Button>
        <p className="font-bold text-center text-[12px] sm:text-[14px] lg:text-[16px]">
          Already have an account ?{" "}
          <Link to={"/login"} className="text-[#00298d] underline">
            Login now
          </Link>
        </p>
      </div>
    </form>
  );
}
