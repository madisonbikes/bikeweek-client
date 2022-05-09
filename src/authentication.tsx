import React from "react";
import { useContext } from "react";

type AuthState = { jwt: string | undefined };

type ContextType = {
  state: AuthState;
  setState: React.Dispatch<React.SetStateAction<AuthState>>;
};

export const useAuth = (): ContextType => {
  const retval = useContext(AuthContext);
  if (!retval) {
    throw new Error("useAuth outside of AuthProvider");
  }
  return retval;
};

export const AuthContext = React.createContext<ContextType | undefined>(
  undefined
);

type Props = {
  children: JSX.Element;
};

export function AuthProvider(props: Props) {
  const [state, setState] = React.useState<AuthState>({ jwt: undefined });
  const value = { state, setState };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
