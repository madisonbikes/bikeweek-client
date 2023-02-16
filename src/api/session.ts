import {
  authenticatedUserSchema,
  Session,
  AuthenticatedUser,
  LoginBody,
  loginBodySchema,
} from "./contract";
import { z } from "zod";

const authenticationResultSchema = z.object({
  authenticated: z.boolean(),
  failureString: z.string().optional(),
});
type AuthenticationResult = z.infer<typeof authenticationResultSchema>;
export type LoginResponse = Partial<AuthenticatedUser> & AuthenticationResult;

export type SessionInfoResponse = LoginResponse;

export type LogoutResponse = {
  success: boolean;
};

export const sessionInfo = async (): Promise<SessionInfoResponse> => {
  const response = await Session.info()
    .ok((res) => res.status === 200 || res.status === 401)
    .send();

  if (response.status === 200) {
    const result = authenticatedUserSchema.parse(response.body);
    return { authenticated: true, ...result };
  } else {
    return { authenticated: false };
  }
};

export const login = async (request: LoginBody): Promise<LoginResponse> => {
  // don't leak any extra data
  const parsed = loginBodySchema.parse(request);
  const response = await Session.login()
    .send(parsed)
    .ok((res) => res.status === 200 || res.status === 401);

  if (response.status === 200) {
    const result = authenticatedUserSchema.parse(response.body);
    return { authenticated: true, ...result };
  } else {
    return {
      authenticated: false,
      failureString: response.text,
    };
  }
};

export const logout = async (): Promise<LogoutResponse> => {
  const response = await Session.logout()
    .ok((res) => res.status === 200 || res.status === 400)
    .send();

  if (response.status === 200) {
    console.log(`logout response: ${response.text}`);
    return { success: true };
  } else {
    console.log(`logout response: ${response.text}`);
    return { success: false };
  }
};
