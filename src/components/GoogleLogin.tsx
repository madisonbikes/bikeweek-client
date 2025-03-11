import { GoogleLogin as GL } from "@react-oauth/google";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { federatedLogin } from "../api/session";
import { useAuth } from "../common";

export const GoogleLogin = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const loginMutation = useMutation({ mutationFn: federatedLogin });
  const { isSuccess: loginSuccess, data: loginData } = loginMutation;

  useEffect(() => {
    if (loginSuccess && loginData.authenticated) {
      console.log("set auth");
      auth.setState(loginData);
      void navigate("/events");
    }
  }, [loginSuccess, loginData, auth, navigate]);

  let loginStatus = <></>;
  if (loginSuccess && !loginData.authenticated) {
    loginStatus = <div>{loginData.failureString}</div>;
  }

  return (
    <>
      {loginStatus}
      <GL
        theme="filled_black"
        width="200"
        onSuccess={(credentialResponse) => {
          loginMutation.mutate({
            provider: "google",
            token: credentialResponse.credential ?? "",
          });
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
};
