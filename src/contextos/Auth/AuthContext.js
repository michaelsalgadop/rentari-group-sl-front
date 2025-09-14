import { createContext } from "react";

export const AUTH_MODES = {
  LOGIN: "login",
  REGISTER: "register",
};

export const AuthContext = createContext();
AuthContext.displayName = "AuthContext";
