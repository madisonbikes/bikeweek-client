export * from "./config";
export * from "./theme";
export * from "./auth";

export const StatusCodes = {
  OK: 200,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
} as const;
