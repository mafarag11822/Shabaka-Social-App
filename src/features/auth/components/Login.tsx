import { addToast, Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaKey } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { signInSchema } from "../../../schemas/signInSchema";
import type { LoginData } from "../../../types/loginData";
import authServices from "../../../services/authService";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { authContext } from "../../../context/authContext";
//=========================================================================>
export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordisVisible, setPasswordIsVisible] = useState(false);
  const PasswordVisibility = () => setPasswordIsVisible(!passwordisVisible);
  const { setIsLoggedIn } = useContext(authContext);
  //===== useForm =====//
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });
  //===== End useForm =====//
  async function signIn(values: LoginData) {
    setIsLoading(true);
    try {
      const data = await authServices.login(values);
      localStorage.setItem("token", data.data.token);
      setIsLoggedIn(true);
      addToast({
        description: data.message,
        color: "success",
        timeout: 2000,
        shouldShowTimeoutProgress: true,
      });
    } catch (error: any) {
      addToast({
        title: "Login failed",
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
    <form onSubmit={handleSubmit(signIn)}>
      <div className="grid gap-5 sm:gap-7">
        <div className="grid mb-2.5 text-center">
          <h1 className="font-bold text-[25px] md:text-[30px] lg:text-[40px] text-[#00298d]">
            Welcome Back
          </h1>
          <span className="text-[12px] md:text-[14px] lg:text-[18px] font-normal">
            sign in & continue your social journey
          </span>
        </div>
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
          placeholder="Email"
          startContent={
            <MdOutlineAlternateEmail className="text-slate-300 text-2xl" />
          }
          size="lg"
          isClearable
          autoComplete="email"
        />
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
              onClick={PasswordVisibility}
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

        <Button
          isLoading={isLoading}
          className="text-[12px] sm:text-[14px] bg-linear-to-r to-[#00D2FF] via-[#0066FF] from-[#0033B5] text-white rounded-4xl"
          variant="solid"
          type="submit"
        >
          Sign Up
        </Button>
        <p className="text-[10px] sm:text-[12px] text-center opacity-60 underline">
          <Link to={"#"}>Forget Password ?</Link>
        </p>
        <div className="h-px bg-slate-300"></div>
        <Link
          to={"/register"}
          className="w-full py-2 text-[12px] sm:text-[14px] border-[#00298d] text-[#00298d] bg-white border-2 rounded-4xl text-center"
        >
          Create New Account
        </Link>
      </div>
    </form>
  );
}
