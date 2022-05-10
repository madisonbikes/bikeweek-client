import { Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import superagent from "superagent";
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
  const [errorString, setErrorString] = useState<string | undefined>(undefined);

  const form = useForm<FormData>({
    mode: "onSubmit",
    defaultValues,
  });
  const { formState, handleSubmit, control } = form;
  const { isSubmitting } = formState;

  const onSubmit = async (data: FormData) => {
    const result = await superagent
      .post("/api/v1/login")
      .ok((res) => res.status == 200 || res.status == 401)
      .send(data);
    if (result.status == 200) {
      console.log("setting jwt");
      auth.setState({ jwt: result.text });
      navigate("/");
      setErrorString(undefined);
    } else {
      setErrorString(result.text);
    }
    form.reset(data);
  };

  return (
    <main>
      <h2>Login</h2>
      {errorString ? <div className="loginError">{errorString}</div> : null}
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
          onClick={handleSubmit(onSubmit)}
          variant="contained"
        >
          Login
        </Button>
      </form>
    </main>
  );
};
