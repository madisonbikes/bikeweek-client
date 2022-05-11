import { Button } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { login, LoginRequest, LoginResponse } from "../api/login";
import { useAuth, FormTextField } from "../common";

type FormData = LoginRequest;

const defaultValues: FormData = {
  username: "user1",
  password: "password",
};

export const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    isSuccess,
    error,
    mutate,
    data: loginResult,
  } = useMutation<LoginResponse, Error, FormData>(login);

  const form = useForm<FormData>({
    mode: "onSubmit",
    defaultValues,
  });
  const { formState, handleSubmit, control } = form;
  const { isSubmitting } = formState;

  useEffect(() => {
    if (isSuccess && loginResult.success) {
      console.log("setting jwt");
      auth.setState({ jwt: loginResult.jwt });
      navigate("/events");
    }
  }, [isSuccess]);

  if (isLoading) {
    return <div>Logging in...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main>
      <h2>Login</h2>
      {loginResult?.failureString ? (
        <div className="loginError">{loginResult?.failureString}</div>
      ) : null}
      <form>
        <div className="formItem">
          <FormTextField
            name="username"
            label="Username"
            required
            control={control}
          />
        </div>
        <div className="formItem">
          <FormTextField
            control={control}
            name="password"
            label="Password"
            required
            type="password"
          />
        </div>
        <Button
          disabled={isSubmitting}
          onClick={handleSubmit((formData) => {
            mutate(formData);
            form.reset(formData);
          })}
          variant="contained"
        >
          Login
        </Button>
      </form>
    </main>
  );
};

export default Login;
