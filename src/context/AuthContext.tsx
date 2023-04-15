import { IAuthContext } from "@types";
import React, { PropsWithChildren, createContext, useState } from "react";

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  setLoggedIn: () => null,
});

export const AuthContextProvider = ({
  children,
}: PropsWithChildren<object>) => {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const setLoginValue = (loggedIn: boolean) => {
    setLoggedIn(loggedIn);
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn: setLoginValue }}>
      {children}
    </AuthContext.Provider>
  );
};
