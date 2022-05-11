import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { login, LoginData, LoginResponse } from "../api/login";
import { useAuth, FormTextField } from "../common";

type FormData = {
  username: string;
  password: string;
};

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
  } = useMutation<LoginResponse, Error, LoginData>(login);

  const form = useForm<FormData>({
    mode: "onSubmit",
    defaultValues,
  });
  const { formState, handleSubmit, control } = form;
  const { isSubmitting } = formState;

  if (isLoading) {
    return <div>Logging in...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isSuccess && loginResult.success) {
    console.log("setting jwt");
    auth.setState({ jwt: loginResult.jwt });
    navigate("/events");
    return <></>;
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
          type="submit"
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
