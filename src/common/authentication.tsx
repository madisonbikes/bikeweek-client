import React, { useContext, useState } from "react";

type AuthState = { jwt: string | undefined };

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
  const [state, setState] = useState<AuthState>({ jwt: undefined });

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
