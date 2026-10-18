import { Outlet } from "react-router-dom";
import NavbarComponent from "./Navbar";
import { useContext } from "react";
import { authContext } from "../../context/authContext";
import { Spinner } from "@heroui/react";

export default function MainLayout() {
  const { isLoading } = useContext(authContext);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-dvh">
          <Spinner size="lg" variant="wave" />
        </div>
      ) : (
        <>
          <NavbarComponent></NavbarComponent>
          <div className="container m-auto">
            <Outlet></Outlet>
          </div>
        </>
      )}
    </>
  );
}
