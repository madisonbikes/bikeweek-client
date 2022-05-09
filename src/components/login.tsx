import React from "react";
import { useForm } from "react-hook-form";
import superagent from "superagent";
import { useAuth } from "../AuthContext";

type FormData = {
  username: string;
  password: string;
};

export default function login() {
  const authContext = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    const result = await superagent
      .post("http://localhost:3001/api/v1/login")
      .send(data);
    authContext.setState({ jwt: result.text });
  };

  return (
    <main>
      <h2>Login</h2>
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
