import { useContext } from "react";
import logo from "../assets/logo_vector.svg";
import { authContext } from "../context/authContext";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
export default function NotFoundPage() {
  const { isLoggedIn } = useContext(authContext);
  return (
    <div className="flex flex-col justify-center items-center gap-9 h-screen ">
      <h1 className="flex items-center text-7xl md:text-8xl  lg:text-[140px] font-bold font-days bg-linear-to-r to-[#0033B5] via-[#0066FF] from-[#0033B5] bg-clip-text text-transparent">
        4 <img src={logo} className="w-15 md:w-25 lg:w-40" alt="Shabaka logo" />{" "}
        4
      </h1>
      <div className="h-1.5 w-1/8 bg-linear-to-r to-[#0033B5] via-[#0066FF] from-[#0033B5] rounded"></div>
      <p className="text-2xl md:text-3xl lg:text-5xl font-bold font-days bg-linear-to-r to-[#0033B5] via-[#0066FF] from-[#0033B5]  bg-clip-text text-transparent">
        Not Found Page
      </p>
      <p className="font-medium font-days text-center">
        The page you are looking for might have been removed, had its name
        changed <br />
        or
        <br /> is temporarily unavailable.
      </p>
      {isLoggedIn?<Link to={"/"} className="flex items-center gap-2 text-[#45556c]/70 hover:text-[#45556c]"><FaLongArrowAltLeft /> Back to Home Page</Link>:""}
    </div>
  );
}
