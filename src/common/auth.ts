import React, { useContext } from "react";
import { LoginResponse } from "../api/session";

export type AuthState = LoginResponse;

export type AuthContextType = {
  state: AuthState;
  setState: (newState: AuthState) => void;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = (): AuthContextType => {
  const retval = useContext(AuthContext);
  if (!retval) {
    throw new Error("useAuth outside of AuthProvider");
  }
  return retval;
};
