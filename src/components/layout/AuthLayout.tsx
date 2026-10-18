import { Outlet } from "react-router-dom";
import Circle from "../../features/auth/components/CircleComponant";
import { useContext } from "react";
import { authContext } from "../../context/authContext";
import { Spinner } from "@heroui/react";

export default function AuthLayout() {
  const { isLoading } = useContext(authContext);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-dvh">
          <Spinner size="lg" variant="wave" />
        </div>
      ) : (
        <div className=" relative px-5 lg:px-50 py-5 lg-py-10 grid grid-cols-10 gap-5 lg:gap-30 items-center min-h-dvh font-days bg-[url('../assets/Gemini_Generated_Image_403k1z403k1z403k.jpeg')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[5px]" />
          <div className="col-span-10 lg:col-span-6 z-50">
            <Circle />
          </div>
          <div className="col-span-10 lg:col-span-4 border-slate-400 rounded-2xl p-8 min-w-l bg-white/95 backdrop-blur-md shadow-2xl">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}
