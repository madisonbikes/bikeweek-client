import React from "react";
import { useContext } from "react";

type AuthState = { jwt: string | undefined };

type AuthContextType = {
  state: AuthState;
  setState: (newState: AuthState) => void;
};

export const useAuth = (): AuthContextType => {
  const retval = useContext(AuthContext);
  if (!retval) {
    throw new Error("useAuth outside of AuthProvider");
  }
  return retval;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

type Props = {
  children: JSX.Element;
};

export function AuthProvider(props: Props) {
  const [state, setState] = React.useState<AuthState>({ jwt: undefined });

  // temporary in case we want to track these changes
  const setStateInterceptor = (newState: AuthState): void => {
    setState(newState);
  };

  return (
    <AuthContext.Provider value={{ state, setState: setStateInterceptor }}>
      {props.children}
    </AuthContext.Provider>
  );
}
