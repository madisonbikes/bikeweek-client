import {
  authenticatedUserSchema,
  Session,
  AuthenticatedUser,
  LoginBody,
  loginBodySchema,
  FederatedLoginBody,
  federatedLoginBodySchema,
} from "./contract";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

const _authenticationResultSchema = z.object({
  authenticated: z.boolean(),
  failureString: z.string().optional(),
});
type AuthenticationResult = z.infer<typeof _authenticationResultSchema>;
export type LoginResponse = Partial<AuthenticatedUser> & AuthenticationResult;

export type SessionInfoResponse = LoginResponse;

export type LogoutResponse = { success: boolean };

export const sessionInfo = async (): Promise<SessionInfoResponse> => {
  const response = await Session.info()
    .ok(
      (res) =>
        res.status === StatusCodes.OK ||
        res.status === StatusCodes.UNAUTHORIZED,
    )
    .send();

  if (response.status === StatusCodes.OK) {
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
    .ok(
      (res) =>
        res.status === StatusCodes.OK ||
        res.status === StatusCodes.UNAUTHORIZED,
    );

  if (response.status === StatusCodes.OK) {
    const result = authenticatedUserSchema.parse(response.body);
    return { authenticated: true, ...result };
  } else {
    return { authenticated: false, failureString: response.text };
  }
};

export const federatedLogin = async (
  request: FederatedLoginBody,
): Promise<LoginResponse> => {
  // don't leak any extra data
  const parsed = federatedLoginBodySchema.parse(request);
  const response = await Session.federated_login()
    .send(parsed)
    .ok(
      (res) =>
        res.status === StatusCodes.OK ||
        res.status === StatusCodes.UNAUTHORIZED,
    );

  if (response.status === StatusCodes.OK) {
    const result = authenticatedUserSchema.parse(response.body);
    return { authenticated: true, ...result };
  } else {
    return { authenticated: false, failureString: response.text };
  }
};

export const logout = async (): Promise<LogoutResponse> => {
  const response = await Session.logout()
    .ok(
      (res) =>
        res.status === StatusCodes.OK ||
        res.status === StatusCodes.UNAUTHORIZED,
    )
    .send();

  if (response.status === StatusCodes.OK) {
    console.log(`logout response: ${response.text}`);
    return { success: true };
  } else {
    console.log(`logout response: ${response.text}`);
    return { success: false };
  }
};
