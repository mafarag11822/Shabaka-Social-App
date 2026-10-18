import { useContext, type ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/authContext";

export default function ProtectedAuthRoute({
  children,
}: {
  children: ReactElement;
}) {
  const { isLoggedIn } = useContext(authContext);
  return <>{isLoggedIn ? <Navigate to={"/"} /> : children}</>;
}
