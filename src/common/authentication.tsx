import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { LoginResponse, sessionInfo } from "../api/session";
import { getSelf } from "../api/users";

export type AuthState = LoginResponse;

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

export const AuthProvider = (props: PropsWithChildren) => {
  const [state, setState] = useState<AuthState>({ authenticated: false });
  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const [si, self] = await Promise.all([sessionInfo(), getSelf()]);
      const retval: AuthState = {
        authenticated: si.authenticated,
        id: si.id,
        username: si.username,
        roles: self?.roles,
        federated: self?.federated,
      };
      return retval;
    },
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
