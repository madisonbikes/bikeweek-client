import { Button, Grid } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/session";
import { LoginBody } from "../../api/contract/types";
import { useAuth } from "../../common";
import { FormTextField } from "../input/FormTextField";
import { GoogleLogin } from "../GoogleLogin";
import { googleLoginEnabled } from "../../common/config";

type LoginFormData = LoginBody;

const defaultValues: LoginFormData = { username: "", password: "" };

export const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const loginMutation = useMutation({ mutationFn: login });
  const { isSuccess: loginSuccess, data: loginData } = loginMutation;

  const form = useForm({
    defaultValues,
  });
  const { formState, handleSubmit, control } = form;
  const { isSubmitting } = formState;

  useEffect(() => {
    if (loginSuccess && loginData.authenticated) {
      console.log("set auth");
      auth.setState(loginData);
      void navigate("/events");
    }
  }, [loginSuccess, loginData, auth, navigate]);

  const onSubmit = (formData: LoginFormData) => {
    loginMutation.mutate(formData);
    form.reset(formData);
  };

  if (loginMutation.isPending) {
    return <div>Logging in...</div>;
  }

  return (
    <div>
      <h2>Login</h2>
      {loginData?.failureString !== null ? (
        <div className="loginError">{loginData?.failureString}</div>
      ) : null}
      <form
        onKeyDown={async (e) => {
          if (e.code === "Enter") {
            await handleSubmit(onSubmit)();
          }
        }}
      >
        <Grid
          direction="column"
          container
          rowSpacing={2}
          alignItems="flex-start"
        >
          <Grid item>
            <FormTextField
              control={control}
              name="username"
              label="Username"
              required
              autoComplete="username"
            />
          </Grid>
          <Grid item>
            <FormTextField
              control={control}
              name="password"
              label="Password"
              required
              type="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item>
            <Button
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              variant="contained"
            >
              Login
            </Button>
            {googleLoginEnabled ? <GoogleLogin /> : null}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
