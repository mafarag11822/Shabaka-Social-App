import { useContext, type ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/authContext";

export default function ProtectedRoute({
  children,
}: {
  children: ReactElement;
}) {
  const { isLoggedIn } = useContext(authContext);
  return <>{isLoggedIn ? children : <Navigate to={"/login"} />}</>;
}
