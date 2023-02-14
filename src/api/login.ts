import superagent from "superagent";
import { LoginRequest, loginResponseSchema } from "./types";

export type LoginResponse = {
  success: boolean;
  jwt: string;
  failureString?: string;
};

export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const result = await superagent
    .post("/api/v1/login")
    .ok((res) => res.status === 200 || res.status === 401)
    .send(request);

  if (result.status === 200) {
    const response = loginResponseSchema.parse(result.body);
    return { success: true, jwt: response.jwtToken };
  } else {
    return { success: false, jwt: "", failureString: result.text };
  }
};
