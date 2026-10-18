import { createContext, useEffect, useState, type ReactElement } from "react";
import authServices from "../services/authService";
//====================================================================>
export const authContext = createContext<any>({});

export default function AuthContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function getProfileData() {
    try {
      const { data } = await authServices.getProfileData();
      setUserData(data.user);
      setIsLoggedIn(true);
      setIsLoading(false);
    } catch (error) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getProfileData();
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);
  return (
    <authContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userData, isLoading }}
    >
      {children}
    </authContext.Provider>
  );
}
