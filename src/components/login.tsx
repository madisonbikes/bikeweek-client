import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import superagent from "superagent";
import { useAuth } from "../authentication";

type FormData = {
  username: string;
  password: string;
};

export default function login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const result = await superagent
      .post("http://localhost:3001/api/v1/login")
      .ok((res) => res.status == 200 || res.status == 401)
      .send(data);
    if (result.status == 200) {
      auth.setState({ jwt: result.text });
      navigate("/");
      setError(undefined);
    } else {
      setError(result.text);
    }
  };

  return (
    <main>
      <h2>Login</h2>
      {error ? <div className="loginError">{error}</div> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            defaultValue="user1"
            {...register("username", { required: true })}
          />
          {errors.username && "Username is required"}
        </div>
        <div>
          <input
            defaultValue="password"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && "Password is required"}
        </div>
        <input type="submit" />
      </form>
    </main>
  );
}
