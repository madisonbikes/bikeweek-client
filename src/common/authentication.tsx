import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { LoginResponse, sessionInfo } from "../api/session";

type AuthState = LoginResponse;

export type AuthContextType = {
  state: AuthState;
  setState: (newState: AuthState) => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const retval = useContext(AuthContext);
  if (!retval) {
    throw new Error("useAuth outside of AuthProvider");
  }
  return retval;
};

type Props = {
  children: JSX.Element;
};

export const AuthProvider = (props: Props) => {
  const [state, setState] = useState<AuthState>({ authenticated: false });
  const { data } = useQuery({
    queryKey: "sessionInfo",
    queryFn: () => sessionInfo(),
  });

  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  // temporary in case we want to track these changes
  const setStateInterceptor = (newState: AuthState): void => {
    setState(newState);
  };

  return (
    <AuthContext.Provider value={{ state, setState: setStateInterceptor }}>
      {props.children}
    </AuthContext.Provider>
  );
};
