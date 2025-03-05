import { PropsWithChildren, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { sessionInfo } from "../api/session";
import { getSelf } from "../api/users";
import { AuthContext, AuthState } from "./auth";

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
