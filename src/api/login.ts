import superagent from "superagent";

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  jwt?: string;
  failureString?: string;
};

export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const result = await superagent
    .post("/api/v1/login")
    .ok((res) => res.status == 200 || res.status == 401)
    .send(request);

  if (result.status == 200) {
    return { success: true, jwt: result.text };
  } else {
    return { success: false, failureString: result.text };
  }
};
